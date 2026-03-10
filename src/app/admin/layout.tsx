import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000' }}>
      {/* Admin Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: '#111', 
        borderRight: '1px solid var(--border-light)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
          <h2 className="nav-brand text-gradient">JastipAdmin</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link href="/admin" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            Dashboard
          </Link>
          <Link href="/admin/orders" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            Orders
          </Link>
          <Link href="/admin/products" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            Products
          </Link>
          <Link href="/admin/requests" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            Custom Requests
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
          <Link href="/" className="nav-link" style={{ padding: '0.75rem 1rem', display: 'block', color: 'var(--text-secondary)' }}>
            &larr; Back to Store
          </Link>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', backgroundColor: '#0a0a0a' }}>
        {children}
      </main>
    </div>
  );
}
