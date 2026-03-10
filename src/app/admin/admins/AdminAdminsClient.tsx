'use client';

import { useState } from 'react';
import { deleteUser, registerUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function AdminAdminsClient({ admins }: { admins: any[] }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this admin?')) return;
        setDeleting(id);
        await deleteUser(id);
        router.refresh();
        setDeleting(null);
    };

    const handleAddAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreating(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        formData.set('role', 'ADMIN');

        const result = await registerUser(formData);
        if (result.success) {
            setShowForm(false);
            router.refresh();
        } else {
            setError(result.error || 'Failed to create admin');
        }
        setIsCreating(false);
    };

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Manage Admins</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ padding: '0.6rem 1.5rem' }}>
                    {showForm ? 'Cancel' : '+ Add Admin'}
                </button>
            </div>

            {showForm && (
                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Create New Admin Account</h3>
                    {error && (
                        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleAddAdmin} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label">Name</label>
                            <input type="text" name="name" required className="form-input" placeholder="Admin Name" />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label">Email</label>
                            <input type="email" name="email" required className="form-input" placeholder="admin@email.com" />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label">Password</label>
                            <input type="password" name="password" required className="form-input" placeholder="Min 6 chars" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isCreating} style={{ padding: '0.7rem 1.5rem' }}>
                            {isCreating ? 'Creating...' : 'Create'}
                        </button>
                    </form>
                </div>
            )}

            <div className="glass-panel" style={{ padding: '2rem' }}>
                {admins.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No admin accounts yet.</p>
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
                            {admins.map((a: any) => (
                                <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{a.name}</td>
                                    <td style={{ padding: '1rem' }}>{a.email}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{new Date(a.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDelete(a.id)}
                                            disabled={deleting === a.id}
                                            style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}
                                        >
                                            {deleting === a.id ? 'Deleting...' : 'Delete'}
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
