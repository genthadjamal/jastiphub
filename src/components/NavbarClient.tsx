'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function NavbarClient() {
    const { totalItems } = useCart();

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
                    <Link href="/cart" className="nav-link" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        🛒 Cart
                        {totalItems > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-12px',
                                background: 'var(--accent-primary)',
                                color: '#fff',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 8px var(--accent-primary)'
                            }}>
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <Link href="/admin/login" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}
