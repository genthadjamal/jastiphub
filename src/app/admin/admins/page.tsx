import { getCurrentUser } from '@/app/actions/auth';
import { getUsers } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import AdminAdminsClient from './AdminAdminsClient';

export default async function AdminAdminsPage() {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') redirect('/admin/login');

    const result = await getUsers('ADMIN');
    const admins = result.success ? result.data : [];

    return <AdminAdminsClient admins={admins || []} />;
}
