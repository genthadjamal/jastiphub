import Link from 'next/link';
import { getDashboardStats } from '@/app/actions/dashboard';

export default async function AdminDashboard() {
  const result = await getDashboardStats();
  
  if (!result.success || !result.data) {
    return (
      <div className="animate-fade-in text-center p-8">
        <h2>Failed to load dashboard data</h2>
      </div>
    );
  }

  const { totalProducts, totalRevenue, pendingCount, readyToShipCount, recentOrders, lowStockItems } = result.data;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'var(--warning)';
      case 'Paid': return 'var(--accent-secondary)';
      case 'Purchased': return 'var(--accent-primary)';
      case 'Shipping': return '#3b82f6';
      case 'Completed': return 'var(--success)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Dashboard Overview</h1>
      </div>
      
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-primary)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</p>
          <p className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
            Rp {(totalRevenue || 0).toLocaleString('id-ID')}
          </p>
          <p style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Successfully paid items</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--warning)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Pending Verification</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>{pendingCount}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Orders waiting for payment check</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--success)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Ready to Ship</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>{readyToShipCount}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Labels need printing / Delivery</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-primary)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Products</p>
          <p className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
            {totalProducts}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Active catalog items</p>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Recent Orders */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Recent Orders</h2>
            <Link href="/admin/orders" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
              View All
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No orders yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Order ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Customer</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{order.id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: '1rem' }}>{order.customerName}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: 'var(--radius-full)', 
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 500 }}>Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Stock Alerts */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Low Stock Alerts</h2>
          {lowStockItems.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>All products have sufficient stock.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {lowStockItems.map((item: any) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid var(--error)', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ margin: 0, fontWeight: 500 }}>{item.name}</p>
                  <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>{item.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
