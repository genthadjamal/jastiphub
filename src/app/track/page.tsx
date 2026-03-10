'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getOrderById } from '@/app/actions/order';

// Mock Order Status Timeline
const STATUS_STEPS = ['Pending', 'Paid', 'Purchased', 'Shipping', 'Completed'];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setIsSearching(true);
    setError('');

    try {
      const result = await getOrderById(orderId);
      
      if (result.success && result.data) {
        setOrderData({
          id: result.data.id,
          date: new Date(result.data.createdAt).toLocaleDateString(),
          status: result.data.status,
          totalAmount: result.data.totalAmount,
          trackingResi: result.data.trackingResi,
          items: result.data.items.map((item: any) => ({
            name: item.product.name,
            qty: item.quantity,
            price: item.price
          }))
        });
      } else {
        setError(result.error || 'Order not found. Please check your tracking ID.');
        setOrderData(null);
      }
    } catch (err) {
      setError('An error occurred while tracking your order.');
      setOrderData(null);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Track Your Order</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Enter your order ID below to see the current status.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem', boxShadow: 'var(--shadow-glow)' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: orderData ? '3rem' : '1rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. ORD-123456" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}
          />
          <button type="submit" className="btn btn-primary" disabled={isSearching} style={{ padding: '0 2rem' }}>
            {isSearching ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: 'var(--radius-md)', color: '#fff', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {orderData && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Order {orderData.id}</h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Placed on {orderData.date}</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              position: 'relative', 
              marginBottom: '3rem',
              padding: '0 1rem'
            }}>
              {/* Connecting Line */}
              <div style={{ 
                position: 'absolute', 
                top: '12px', 
                left: '10%', 
                right: '10%', 
                height: '4px', 
                backgroundColor: 'var(--border-light)', 
                zIndex: 0 
              }}></div>
              
              {/* Progress Line */}
              <div style={{ 
                position: 'absolute', 
                top: '12px', 
                left: '10%', 
                width: `${(STATUS_STEPS.indexOf(orderData.status) / (STATUS_STEPS.length - 1)) * 80}%`, 
                height: '4px', 
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 0 10px var(--accent-primary)',
                zIndex: 1,
                transition: 'width 0.5s ease'
              }}></div>

              {STATUS_STEPS.map((step, index) => {
                const isCompleted = STATUS_STEPS.indexOf(orderData.status) >= index;
                const isCurrent = STATUS_STEPS.indexOf(orderData.status) === index;

                return (
                  <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      backgroundColor: isCompleted ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      border: `3px solid ${isCurrent ? 'var(--text-primary)' : isCompleted ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                      marginBottom: '0.5rem',
                      boxShadow: isCurrent || isCompleted ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none',
                      transition: 'all 0.3s ease'
                    }}></div>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Order Details */}
            {orderData.status === 'Shipping' && orderData.trackingResi && (
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                <p style={{ margin: 0, fontWeight: 500, color: 'var(--success)', marginBottom: '0.25rem' }}>Shipping Resi Number:</p>
                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '1px' }}>{orderData.trackingResi}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Use this number to track directly on the courier website.</p>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Items</h3>
              {orderData.items.map((item: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>{item.name}</p>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Qty: {item.qty}</p>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>Rp {item.price.toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Total Amount</span>
                <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rp {orderData.totalAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
