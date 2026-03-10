'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/app/actions/order';

export default function AdminOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [trackingResi, setTrackingResi] = useState('');

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

  const handleUpdateStatus = async (status: string, additionalData?: { trackingResi: string }) => {
    if (!selectedOrder) return;
    
    setIsUpdating(true);
    const result = await updateOrderStatus(selectedOrder.id, status, additionalData?.trackingResi);
    
    if (result.success) {
      // Optimitistic update for local UI feeling
      setSelectedOrder({ ...selectedOrder, status, ...additionalData });
    } else {
      alert('Failed to update order status');
    }
    
    setIsUpdating(false);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Order Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Search orders..." className="form-input" style={{ width: '250px' }} />
          <select className="form-input" style={{ width: '150px' }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
      
      {!initialOrders || initialOrders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No orders found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '1fr 400px' : '1fr', gap: '2rem', transition: 'all 0.3s ease' }}>
          
          {/* Order List */}
          <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Order ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Customer</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '1rem' }}></th>
                </tr>
              </thead>
              <tbody>
                {initialOrders.map((order, i) => (
                  <tr 
                    key={order.id} 
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.05)', 
                      transition: 'all 0.2s', 
                      cursor: 'pointer',
                      backgroundColor: selectedOrder?.id === order.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                      borderLeft: selectedOrder?.id === order.id ? '3px solid var(--accent-primary)' : '3px solid transparent'
                    }} 
                    onClick={() => setSelectedOrder(order)}
                    onMouseEnter={e => {
                      if (selectedOrder?.id !== order.id) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    }} 
                    onMouseLeave={e => {
                      if (selectedOrder?.id !== order.id) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '1.2rem 1rem', fontWeight: 500 }}>
                      <span title={order.id}>{order.id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1.2rem 1rem' }}>{order.customerName}</td>
                    <td style={{ padding: '1.2rem 1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: 'var(--radius-full)', 
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1rem', textAlign: 'right', fontWeight: 500 }}>Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                    <td style={{ padding: '1.2rem 1rem', textAlign: 'right' }}>
                       <button style={{ color: 'var(--text-secondary)' }} onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}>
                         Manage &rarr;
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Details Panel */}
          {selectedOrder && (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', height: 'fit-content', position: 'sticky', top: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }} title={selectedOrder.id}>Order {selectedOrder.id.slice(-6).toUpperCase()}</h2>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', color: '#fff' }}
                >✕</button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Customer</p>
                <p style={{ fontWeight: 500, margin: 0 }}>{selectedOrder.customerName}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{selectedOrder.customerEmail}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem', whiteSpace: 'pre-wrap' }}>{selectedOrder.customerAddress}</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Purchased Item</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ flex: 1 }}>
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <p key={idx} style={{ margin: 0, fontWeight: 500 }}>{item.quantity}x {item.product.name}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Action Required</p>
                
                {selectedOrder.status === 'Pending' && selectedOrder.paymentReceiptUrl && (
                  <div style={{ padding: '1.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--warning)', margin: '0 0 1rem 0' }}>Verify Payment Receipt</p>
                    <div style={{ width: '100%', height: '150px', backgroundColor: '#111', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                      <a href={selectedOrder.paymentReceiptUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>View Receipt Upload</a>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }} disabled={isUpdating} onClick={() => handleUpdateStatus('Paid')}>Approve</button>
                    </div>
                  </div>
                )}

                {selectedOrder.status === 'Paid' && (
                  <div style={{ padding: '1.5rem', backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--accent-primary)', margin: '0 0 1rem 0' }}>Item Purchasing</p>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Payment verified. Time to buy the requested items for the customer.</p>
                    <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem' }} disabled={isUpdating} onClick={() => handleUpdateStatus('Purchased')}>Mark as Purchased</button>
                  </div>
                )}

                {selectedOrder.status === 'Purchased' && (
                  <div style={{ padding: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontWeight: 600, color: '#3b82f6', margin: '0 0 1rem 0' }}>Shipping Fulfillment</p>
                    <input type="text" placeholder="Input Tracking Resi" value={trackingResi} onChange={(e) => setTrackingResi(e.target.value)} className="form-input" style={{ marginBottom: '1rem', backgroundColor: 'var(--bg-primary)' }} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }} disabled={isUpdating} onClick={() => handleUpdateStatus('Shipping', { trackingResi })}>Update Resi</button>
                    </div>
                  </div>
                )}
                
                {selectedOrder.status === 'Shipping' && (
                  <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--success)', margin: '0 0 1rem 0' }}>On Delivery</p>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Tracking Resi: <strong>{selectedOrder.trackingResi || 'N/A'}</strong></p>
                     <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem' }} disabled={isUpdating} onClick={() => handleUpdateStatus('Completed')}>Mark as Delivered/Completed</button>
                  </div>
                )}
                
                {selectedOrder.status === 'Completed' && (
                  <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontWeight: 600, color: 'var(--success)', margin: '0' }}>Order Completed 🎉</p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
