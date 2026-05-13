<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Giving;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GivingController extends Controller
{
    public function initialize(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'amount' => 'required|numeric|min:1',
            'givingType' => 'required|in:tithe,offering,benevolent',
            'callbackUrl' => 'required|url',
        ]);

        $secretKey = config('services.paystack.secret_key');
        if (!$secretKey) {
            return response()->json(['detail' => 'Payment gateway not configured'], 500);
        }

        $reference = 'gla_' . $request->givingType . '_' . substr(Str::uuid()->getHex()->toString(), 0, 12);
        $amountKobo = (int) ($request->amount * 100);

        $giving = Giving::create([
            'reference' => $reference,
            'email' => $request->email,
            'amount' => $request->amount,
            'givingType' => $request->givingType,
            'name' => $request->name,
            'phone' => $request->phone,
            'status' => 'pending',
        ]);

        $response = Http::withToken($secretKey)->post('https://api.paystack.co/transaction/initialize', [
            'email' => $request->email,
            'amount' => $amountKobo,
            'reference' => $reference,
            'callback_url' => $request->callbackUrl,
            'metadata' => [
                'giving_type' => $request->givingType,
                'name' => $request->name,
                'phone' => $request->phone,
                'custom_fields' => [
                    ['display_name' => 'Giving Type', 'variable_name' => 'giving_type', 'value' => ucfirst($request->givingType)],
                    ['display_name' => 'Donor Name', 'variable_name' => 'donor_name', 'value' => $request->name ?? 'Anonymous'],
                ],
            ],
        ]);

        $result = $response->json();

        if ($result['status'] ?? false) {
            return response()->json([
                'authorization_url' => $result['data']['authorization_url'],
                'reference' => $result['data']['reference'],
                'access_code' => $result['data']['access_code'],
            ]);
        }

        $giving->update(['status' => 'failed']);

        return response()->json(['detail' => $result['message'] ?? 'Payment initialization failed'], 400);
    }

    public function verify(string $reference)
    {
        $secretKey = config('services.paystack.secret_key');
        if (!$secretKey) {
            return response()->json(['detail' => 'Payment gateway not configured'], 500);
        }

        $response = Http::withToken($secretKey)->get("https://api.paystack.co/transaction/verify/{$reference}");
        $result = $response->json();

        if (($result['status'] ?? false) && ($result['data']['status'] ?? '') === 'success') {
            Giving::where('reference', $reference)->update([
                'status' => 'success',
                'paidAt' => now(),
            ]);

            return response()->json([
                'status' => 'success',
                'reference' => $reference,
                'amount' => $result['data']['amount'] / 100,
                'message' => 'Thank you for your generous giving!',
            ]);
        }

        return response()->json([
            'status' => 'failed',
            'reference' => $reference,
            'message' => 'Payment verification failed',
        ]);
    }

    public function webhook(Request $request)
    {
        $secretKey = config('services.paystack.secret_key');
        $signature = $request->header('x-paystack-signature', '');
        $body = $request->getContent();

        if ($secretKey) {
            $computed = hash_hmac('sha512', $body, $secretKey);
            if (!hash_equals($computed, $signature)) {
                return response()->json(['detail' => 'Invalid signature'], 401);
            }
        }

        $event = $request->json()->all();

        if (($event['event'] ?? '') === 'charge.success') {
            $reference = $event['data']['reference'] ?? null;
            if ($reference) {
                Giving::where('reference', $reference)->update([
                    'status' => 'success',
                    'paidAt' => now(),
                ]);
            }
        }

        return response()->json(['status' => 'ok']);
    }

    public function publicKey()
    {
        return response()->json(['public_key' => config('services.paystack.public_key', '')]);
    }

    public function history()
    {
        return response()->json(
            Giving::where('status', 'success')
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }

    public function stats()
    {
        $rows = Giving::where('status', 'success')
            ->selectRaw('givingType, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('givingType')
            ->get()
            ->keyBy('givingType');

        $tithe = $rows->get('tithe')?->total ?? 0;
        $offering = $rows->get('offering')?->total ?? 0;
        $benevolent = $rows->get('benevolent')?->total ?? 0;

        return response()->json([
            'tithe' => (float) $tithe,
            'offering' => (float) $offering,
            'benevolent' => (float) $benevolent,
            'total' => (float) ($tithe + $offering + $benevolent),
            'total_transactions' => Giving::where('status', 'success')->count(),
        ]);
    }
}
