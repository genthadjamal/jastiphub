import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="nav-brand text-gradient">
          JastipHub
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">Catalog</Link>
          <Link href="/request" className="nav-link">Request Item</Link>
          <Link href="/track" className="nav-link">Track Order</Link>
          <Link href="/admin/login" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
