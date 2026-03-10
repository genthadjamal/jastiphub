import { getOrders, updateOrderStatus } from '@/app/actions/order';
import AdminOrdersClient from './AdminOrdersClient';

export default async function AdminOrders() {
  const result = await getOrders();
  const orders = result.success ? result.data : [];

  return <AdminOrdersClient initialOrders={orders as any[]} />;
}
