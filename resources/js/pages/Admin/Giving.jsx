import { Heart, Gift, Users, TrendingUp, DollarSign } from 'lucide-react';
import AdminLayout from '../Layouts/AdminLayout';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatAmount(amount) {
  return `₦${Number(amount || 0).toLocaleString()}`;
}

export default function AdminGiving({ givings = [], stats = null }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'tithe': return <Heart size={16} className="text-red-400" />;
      case 'offering': return <Gift size={16} className="text-[#cdac69]" />;
      case 'benevolent': return <Users size={16} className="text-green-400" />;
      default: return <DollarSign size={16} className="text-white/40" />;
    }
  };

  return (
    <div data-testid="admin-giving-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Giving & Donations</h1>
        <p className="text-white/60">View and track all online giving transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="p-6 bg-[#121212] border border-white/5">
          <TrendingUp className="w-8 h-8 text-[#cdac69] mb-4" />
          <p className="text-2xl font-bold text-white">{formatAmount(stats?.total)}</p>
          <p className="text-white/60 text-sm">Total Received</p>
        </div>
        <div className="p-6 bg-[#121212] border border-white/5">
          <Heart className="w-8 h-8 text-red-400 mb-4" />
          <p className="text-2xl font-bold text-white">{formatAmount(stats?.tithe)}</p>
          <p className="text-white/60 text-sm">Tithes</p>
        </div>
        <div className="p-6 bg-[#121212] border border-white/5">
          <Gift className="w-8 h-8 text-[#cdac69] mb-4" />
          <p className="text-2xl font-bold text-white">{formatAmount(stats?.offering)}</p>
          <p className="text-white/60 text-sm">Offerings</p>
        </div>
        <div className="p-6 bg-[#121212] border border-white/5">
          <Users className="w-8 h-8 text-green-400 mb-4" />
          <p className="text-2xl font-bold text-white">{formatAmount(stats?.benevolent)}</p>
          <p className="text-white/60 text-sm">Benevolent</p>
        </div>
        <div className="p-6 bg-[#121212] border border-white/5">
          <DollarSign className="w-8 h-8 text-blue-400 mb-4" />
          <p className="text-2xl font-bold text-white">{stats?.total_transactions || 0}</p>
          <p className="text-white/60 text-sm">Transactions</p>
        </div>
      </div>

      {/* Transactions Table */}
      {givings.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <DollarSign className="w-12 h-12 text-[#cdac69] mx-auto mb-4" />
          <p className="text-white/60">No giving transactions yet</p>
        </div>
      ) : (
        <div className="bg-[#121212] border border-white/5 overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Donor</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {givings.map((giving) => (
                <tr key={giving.id} data-testid={`giving-row-${giving.id}`}>
                  <td>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(giving.givingType)}
                      <span className="capitalize text-white">{giving.givingType}</span>
                    </div>
                  </td>
                  <td className="text-white/80">
                    {giving.name || 'Anonymous'}
                  </td>
                  <td className="text-white/60">{giving.email}</td>
                  <td className="text-[#cdac69] font-semibold">
                    {formatAmount(giving.amount)}
                  </td>
                  <td className="text-white/40 text-sm font-mono">
                    {giving.reference}
                  </td>
                  <td className="text-white/60">
                    {formatDate(giving.paidAt || giving.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

AdminGiving.layout = page => <AdminLayout>{page}</AdminLayout>;
