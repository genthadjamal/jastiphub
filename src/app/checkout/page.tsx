import CheckoutClient from './CheckoutClient';
import { getProductById } from '@/app/actions/product';
import Link from 'next/link';

export default async function Checkout({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const params = await searchParams;
  const productId = params.productId;
  
  if (!productId) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>No item selected for checkout</h1>
        <Link href="/" className="btn btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const result = await getProductById(productId);
  const product = result.success ? result.data : null;

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Product not found</h1>
        <Link href="/" className="btn btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  if (product.stock < 1) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Item is out of stock</h1>
        <Link href={`/product/${product.id}`} className="btn btn-primary">Back to Product</Link>
      </div>
    );
  }

  return <CheckoutClient product={product} />;
}
