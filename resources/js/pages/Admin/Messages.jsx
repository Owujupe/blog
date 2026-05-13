import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { MessageSquare, Mail, Phone, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../Layouts/AdminLayout';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminMessages({ messages: initialMessages = [] }) {
  const { props: { auth } } = usePage();
  const [messages, setMessages] = useState(initialMessages);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await axios.delete(`/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${auth.admin.token}` }
      });
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div data-testid="admin-messages-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-white/60">Messages from the contact form</p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <MessageSquare className="w-12 h-12 text-[#cdac69] mx-auto mb-4" />
          <p className="text-white/60">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-6 bg-[#121212] border border-white/5"
              data-testid={`message-${message.id}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold">{message.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm mt-1">
                    <span className="flex items-center gap-2">
                      <Mail size={14} className="text-[#cdac69]" />
                      <a href={`mailto:${message.email}`} className="hover:text-[#cdac69]">{message.email}</a>
                    </span>
                    {message.phone && (
                      <span className="flex items-center gap-2">
                        <Phone size={14} className="text-[#cdac69]" />
                        <a href={`tel:${message.phone}`} className="hover:text-[#cdac69]">{message.phone}</a>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/40 text-sm">
                    {formatDate(message.created_at)}
                  </span>
                  <button 
                    onClick={() => handleDelete(message.id)}
                    className="p-2 hover:bg-white/5 rounded text-red-400" 
                    data-testid={`delete-message-${message.id}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#0a0a0a] border border-white/5">
                <p className="text-white/80 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

AdminMessages.layout = page => <AdminLayout>{page}</AdminLayout>;
