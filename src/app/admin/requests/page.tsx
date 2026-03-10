import { getItemRequests, updateRequestStatus } from '@/app/actions/request';

export default async function AdminRequests() {
  const result = await getItemRequests();
  const requests = result.success ? result.data : [];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Custom Item Requests</h1>
      </div>

      {!requests || requests.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No item requests at the moment.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {requests.map((req: any) => (
            <div key={req.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(req.createdAt).toLocaleDateString()}</span>
                <span style={{ 
                  color: req.status === 'Pending' ? 'var(--warning)' : 
                         req.status === 'Approved' ? 'var(--success)' : 
                         req.status === 'Rejected' ? 'var(--error)' : 'var(--text-secondary)',
                  fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.5rem', 
                  backgroundColor: req.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 
                                   req.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 
                                   req.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '10px' 
                }}>
                  {req.status}
                </span>
              </div>
              
              {req.itemUrl ? (
                <a href={req.itemUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textDecoration: 'underline' }} className="text-gradient">
                  View Reference URL
                </a>
              ) : (
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>No Reference URL</h3>
              )}
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Requested by {req.customerName} ({req.customerEmail})</p>
              
              <p style={{ fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem', flex: 1, whiteSpace: 'pre-wrap' }}>&quot;{req.description}&quot;</p>
              
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <form action={async () => {
                  'use server';
                  await updateRequestStatus(req.id, 'Approved');
                }} style={{ flex: 1 }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem' }} disabled={req.status === 'Approved'}>
                    Approve
                  </button>
                </form>
                <form action={async () => {
                  'use server';
                  await updateRequestStatus(req.id, 'Rejected');
                }} style={{ flex: 1 }}>
                  <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem', borderColor: 'var(--error)', color: req.status === 'Rejected' ? 'var(--text-secondary)' : 'var(--error)' }} disabled={req.status === 'Rejected'}>
                    Reject
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
