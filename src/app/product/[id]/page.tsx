import Link from 'next/link';
import { getProductById } from '@/app/actions/product';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getProductById(id);
  const product = result.success ? result.data : null;

  if (!product) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Product not found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The product you are looking for might have been removed or is temporarily unavailable.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.8rem 2rem' }}>Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <Link href="/" style={{ color: 'var(--text-secondary)', display: 'inline-block', marginBottom: '2rem', transition: 'color 0.2s' }}>
        &larr; Back to Catalog
      </Link>
      
      <div className="glass-panel" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(300px, 1fr) 1fr', 
        gap: '3rem', 
        padding: '3rem',
        alignItems: 'start'
      }}>
        
        {/* Product Image */}
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: '#111', boxShadow: 'var(--shadow-glow)', position: 'relative', height: '100%', minHeight: '400px' }}>
          {product.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
          ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', position: 'absolute', top: 0, left: 0 }}>
               No Image
             </div>
          )}
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {product.isTrending && (
             <span style={{ 
               display: 'inline-block',
               background: 'rgba(239, 68, 68, 0.1)', 
               color: 'var(--error)',
               padding: '4px 12px', 
               borderRadius: 'var(--radius-full)',
               fontSize: '0.8rem',
               fontWeight: 'bold',
               marginBottom: '1rem',
               width: 'fit-content',
               border: '1px solid rgba(239, 68, 68, 0.2)'
             }}>
               🔥 TRENDING
             </span>
          )}
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>{product.name}</h1>
          <p className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</h3>
            <p style={{ lineHeight: 1.7, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
              {product.description || 'No description provided.'}
            </p>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ 
              display: 'inline-block',
              padding: '0.25rem 0.75rem', 
              borderRadius: 'var(--radius-full)', 
              backgroundColor: product.stock > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: product.stock > 0 ? 'var(--success)' : 'var(--error)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
            {product.stock > 0 ? (
               <Link 
                 href={`/checkout?productId=${product.id}`} 
                 className="btn btn-primary" 
                 style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', textAlign: 'center', display: 'block' }}
               >
                 Buy Now
               </Link>
            ) : (
               <button 
                 className="btn" 
                 disabled
                 style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', backgroundColor: 'var(--border-light)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
               >
                 Out of Stock
               </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
