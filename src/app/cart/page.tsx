'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

    const shippingCost = items.length > 0 ? 50000 : 0;
    const grandTotal = totalPrice + shippingCost;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Your Cart</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {items.length === 0 ? 'Your cart is empty' : `${items.length} item(s) in your cart`}
                </p>
            </div>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Nothing here yet. Start browsing our catalog!
                    </p>
                    <Link href="/" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
                        Browse Catalog
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>

                    {/* Cart Items */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Items</h2>
                            <button
                                onClick={clearCart}
                                style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}
                            >
                                Clear All
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>

                                    {/* Image */}
                                    <div style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: '#111', flexShrink: 0 }}>
                                        {item.imageUrl ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>No Image</div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <Link href={`/product/${item.id}`} style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff', textDecoration: 'none' }}>
                                                {item.name}
                                            </Link>
                                            <p className="text-gradient" style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '0.25rem 0 0' }}>
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
                                            {/* Quantity Controls */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid var(--border-light)',
                                                borderRadius: 'var(--radius-sm)',
                                                overflow: 'hidden'
                                            }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    −
                                                </button>
                                                <span style={{ width: '40px', textAlign: 'center', fontWeight: 600, fontSize: '0.95rem' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', border: 'none', color: '#fff', cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer', fontSize: '1rem', opacity: item.quantity >= item.stock ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Line Total */}
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
                                                {item.quantity}x @ Rp {item.price.toLocaleString('id-ID')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '90px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Shipping Estimate</span>
                            <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total</span>
                            <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                Rp {grandTotal.toLocaleString('id-ID')}
                            </span>
                        </div>

                        <Link
                            href="/checkout?fromCart=true"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', textAlign: 'center', display: 'block' }}
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            href="/"
                            style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}
                        >
                            ← Continue Shopping
                        </Link>
                    </div>

                </div>
            )}
        </div>
    );
}
