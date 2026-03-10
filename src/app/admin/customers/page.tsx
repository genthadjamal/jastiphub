import { getCurrentUser } from '@/app/actions/auth';
import { getUsers } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import AdminCustomersClient from './AdminCustomersClient';

export default async function AdminCustomersPage() {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') redirect('/admin/login');

    const result = await getUsers('CUSTOMER');
    const customers = result.success ? result.data : [];

    return <AdminCustomersClient customers={customers || []} />;
}
