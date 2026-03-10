'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NavbarClient() {
    const { totalItems } = useCart();
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);

    useEffect(() => {
        // Read session from cookie via fetch to a lightweight endpoint
        // For simplicity, we read the cookie on the client side
        const getCookie = (name: string) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? decodeURIComponent(match[2]) : null;
        };
        const raw = getCookie('session-user');
        if (raw) {
            try { setUser(JSON.parse(raw)); } catch { setUser(null); }
        }
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        router.push('/login');
        router.refresh();
    };

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

                    {user ? (
                        <>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                👤 {user.name}
                            </span>
                            {user.role === 'ADMIN' && (
                                <Link href="/admin" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                                    Admin
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                style={{ background: 'none', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
