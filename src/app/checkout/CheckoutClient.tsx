'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createOrder } from '@/app/actions/order';

export default function CheckoutClient({ product }: { product: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  const shippingCost = 50000;
  const totalAmount = product.price + shippingCost;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    formData.append('productId', product.id);
    // Note: handling real file upload to cloud storage would happen here
    
    const result = await createOrder(formData);

    if (result.success) {
      setOrderData(result.data);
      setIsSuccess(true);
    } else {
      setError(result.error || 'Failed to complete checkout');
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess && orderData) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '2px solid var(--success)'
          }}>
            <span style={{ fontSize: '2rem' }}>🎉</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Placed!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            We&apos;ve received your order and payment receipt. Our Admin will verify it shortly.
          </p>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem' }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your Tracking ID</p>
            <p className="text-gradient" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
              {orderData.id.slice(-6).toUpperCase()}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/" className="btn btn-secondary">Track Order</Link>
            <Link href="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Checkout</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Secure your item by completing your shipping and payment details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Checkout Form */}
        <div className="glass-panel" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-glow)' }}>
          {error && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              1. Shipping Details
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="customerName" className="form-label">Full Name</label>
                <input type="text" id="customerName" name="customerName" required className="form-input" placeholder="John Doe" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="customerEmail" className="form-label">Email Address</label>
                <input type="email" id="customerEmail" name="customerEmail" required className="form-input" placeholder="john@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="customerAddress" className="form-label">Complete Delivery Address</label>
              <textarea 
                id="customerAddress" 
                name="customerAddress"
                required 
                className="form-input" 
                rows={3} 
                placeholder="Street, City, Province, Postal Code"
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              2. Payment Transfer
            </h2>

            <div style={{ padding: '1.5rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Bank Transfer Details:</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>BCA: 1234 5678 90 (JastipHub PT)</p>
            </div>

            <div className="form-group">
              <label htmlFor="paymentReceipt" className="form-label">Upload Transfer Receipt (Image/PDF)</label>
              <input 
                type="file" 
                id="paymentReceipt" 
                required 
                accept="image/*,.pdf"
                className="form-input" 
                style={{ cursor: 'pointer', padding: '1rem' }}
                onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              />
              {receiptFile && <p style={{ color: 'var(--success)', marginTop: '0.5rem', fontSize: '0.85rem' }}>Selected: {receiptFile.name}</p>}
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
                style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem' }}
              >
                {isSubmitting ? 'Processing Order...' : 'Confirm Payment & Order'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="glass-panel" style={{ padding: '2.5rem', position: 'sticky', top: '90px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', backgroundColor: '#111', overflow: 'hidden' }}>
              {product.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : null}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, margin: 0, fontSize: '0.9rem', lineHeight: 1.2 }}>{product.name}</p>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.85rem', marginTop: '0.2rem' }}>1x unit</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
            <span>Rp {product.price.toLocaleString('id-ID')}</span>
          </div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Shipping Estimate</span>
            <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total</span>
            <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
