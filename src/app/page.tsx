import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/app/actions/product';

export default async function Home() {
  const result = await getProducts();
  const products = result.success ? result.data : [];

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
          Your Gateway to <span className="text-gradient">Global Goods</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Discover trending items from around the world. We buy it, pack it, and ship it directly to your doorstep.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#catalog" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            Shop Catalog
          </a>
          <Link href="/request" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            Custom Request
          </Link>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Trending Items</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Updated Daily</span>
        </div>

        {!products || products.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No products available yet. Stay tuned!</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {products.map((product: any) => (
              <Link href={`/product/${product.id}`} key={product.id} style={{ display: 'block' }}>
                <div 
                  className="glass-panel product-card" 
                  style={{ 
                    overflow: 'hidden', 
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '250px', backgroundColor: '#111' }}>
                    {product.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                        No Image
                      </div>
                    )}
                    {product.isTrending && (
                      <span style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        background: 'rgba(0,0,0,0.7)', 
                        backdropFilter: 'blur(4px)',
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: 'var(--accent-secondary)'
                      }}>
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>{product.name}</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <p className="text-gradient" style={{ fontWeight: 'bold', fontSize: '1.25rem', margin: 0 }}>
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      
    </div>
  );
}
