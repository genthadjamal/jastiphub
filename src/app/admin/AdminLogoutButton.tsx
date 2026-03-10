'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: '0.75rem 1rem',
                background: 'none',
                border: 'none',
                color: 'var(--error)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: 500,
                borderRadius: 'var(--radius-md)',
            }}
        >
            🚪 Logout
        </button>
    );
}
