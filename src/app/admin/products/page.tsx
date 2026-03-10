import Link from 'next/link';
import { getProducts, deleteProduct } from '@/app/actions/product';

export default async function AdminProducts() {
  const result = await getProducts();
  const products = result.success ? result.data : [];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Product Catalog</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Product Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Price</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Stock</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Trending</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!products || products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No products found. Add a new product to get started!
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{product.name}</td>
                  <td style={{ padding: '1rem' }}>Rp {product.price.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: 'var(--radius-sm)', 
                      backgroundColor: product.stock <= 2 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: product.stock <= 2 ? 'var(--error)' : 'var(--success)'
                    }}>
                      {product.stock}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{product.isTrending ? '🔥 Yes' : 'No'}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <form action={async () => {
                      'use server';
                      await deleteProduct(product.id);
                    }}>
                      <button type="submit" className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem', borderColor: 'var(--error)', color: 'var(--error)' }}>
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
