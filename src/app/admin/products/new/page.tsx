'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProduct } from '@/app/actions/product';

export default function AddProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await createProduct(formData);

    if (result.success) {
      router.push('/admin/products');
      router.refresh();
    } else {
      setError(result.error || 'Failed to create product');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <Link href="/admin/products" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
          &larr; Back
        </Link>
        <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Add New Product</h1>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="name" className="form-label">Product Name</label>
              <input type="text" id="name" name="name" required className="form-input" placeholder="e.g. Nike Air Max" />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="price" className="form-label">Price (IDR)</label>
              <input type="number" id="price" name="price" required min="0" className="form-input" placeholder="e.g. 1500000" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="stock" className="form-label">Initial Stock</label>
              <input type="number" id="stock" name="stock" required min="0" defaultValue="1" className="form-input" />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="imageUrl" className="form-label">Image URL (Optional)</label>
              <input type="url" id="imageUrl" name="imageUrl" className="form-input" placeholder="https://..." />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea id="description" name="description" required className="form-input" rows={4} style={{ resize: 'vertical' }}></textarea>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <input type="checkbox" id="isTrending" name="isTrending" style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }} />
            <label htmlFor="isTrending" style={{ cursor: 'pointer', margin: 0 }}>Mark as Trending Item 🔥</label>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'right', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
              style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
