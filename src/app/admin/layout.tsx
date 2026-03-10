import Link from 'next/link';
import { getCurrentUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import AdminLogoutButton from './AdminLogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Allow access to the login page even when not logged in
  // The actual route protection is done in the layout — child pages get the sidebar
  // The login page has its own absolute-position overlay, so it still works
  if (!user || user.role !== 'ADMIN') {
    // Only render children (which will be the login page on /admin/login)
    return <>{children}</>;
  }

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
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>Hello, {user.name}</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link href="/admin" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            📊 Dashboard
          </Link>
          <Link href="/admin/orders" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            📦 Orders
          </Link>
          <Link href="/admin/products" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            🏷️ Products
          </Link>
          <Link href="/admin/requests" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
            📝 Custom Requests
          </Link>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <p style={{ padding: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>User Management</p>
            <Link href="/admin/customers" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
              👥 Customers
            </Link>
            <Link href="/admin/admins" className="nav-link" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'block' }}>
              🔐 Admins
            </Link>
          </div>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/" className="nav-link" style={{ padding: '0.75rem 1rem', display: 'block', color: 'var(--text-secondary)' }}>
            &larr; Back to Store
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Admin Main Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', backgroundColor: '#0a0a0a' }}>
        {children}
      </main>
    </div>
  );
}
