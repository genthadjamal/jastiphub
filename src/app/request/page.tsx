'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createItemRequest } from '@/app/actions/request';

export default function RequestItem() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const result = await createItemRequest(formData);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || 'Failed to submit request');
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '2px solid var(--success)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Request Submitted!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            We&apos;ve received your request. Our team will review the item availability and pricing, and get back to you via email shortly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setIsSuccess(false)}>Request Another Item</button>
            <Link href="/" className="btn btn-primary">Back to Catalog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Can&apos;t find an item?</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Let us know what you want to buy, and we&apos;ll get it for you.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem', boxShadow: 'var(--shadow-glow)' }}>
        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
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
            <label htmlFor="itemUrl" className="form-label">Product URL (Optional, but highly recommended)</label>
            <input type="url" id="itemUrl" name="itemUrl" className="form-input" placeholder="https://example.com/product/123" />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Item Description & Details</label>
            <textarea 
              id="description" 
              name="description"
              required 
              className="form-input" 
              rows={5} 
              placeholder="Please describe the item you want. Include details like brand, specific model, size, color, expected price, etc."
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
            </button>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
              By submitting this form, you agree to our terms of service regarding custom procurement.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
