'use client';

import { useState } from 'react';
import { deleteUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function AdminCustomersClient({ customers }: { customers: any[] }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this customer?')) return;
        setDeleting(id);
        await deleteUser(id);
        router.refresh();
        setDeleting(null);
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Manage Customers</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                {customers.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No customers registered yet.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Joined</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c: any) => (
                                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{c.name}</td>
                                    <td style={{ padding: '1rem' }}>{c.email}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            disabled={deleting === c.id}
                                            style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}
                                        >
                                            {deleting === c.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
