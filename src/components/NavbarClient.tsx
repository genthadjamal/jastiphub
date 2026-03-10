'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { logoutUser } from '@/app/actions/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NavbarClient() {
    const { totalItems } = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);

    // Hide entire navbar on admin pages (admin has its own sidebar)
    const isAdminPage = pathname.startsWith('/admin');

    useEffect(() => {
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

    // Don't render navbar on admin pages at all
    if (isAdminPage) return null;

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
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.4rem 0.8rem',
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: 'var(--radius-md)',
                            }}>
                                <span style={{ fontSize: '1rem' }}>👤</span>
                                <div style={{ lineHeight: 1.2 }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff', display: 'block' }}>{user.name}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)' }}>
                                        {user.role === 'ADMIN' ? '🔐 Admin' : '🛍️ Customer'}
                                    </span>
                                </div>
                            </div>
                            {user.role === 'ADMIN' && (
                                <Link href="/admin" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: 'var(--error)',
                                    cursor: 'pointer',
                                    padding: '0.4rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                }}
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

