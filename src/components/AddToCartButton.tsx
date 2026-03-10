'use client';

import { useCart, CartItem } from '@/context/CartContext';

export default function AddToCartButton({ product, style }: { product: { id: string; name: string; price: number; imageUrl: string | null; stock: number }; style?: React.CSSProperties }) {
    const { addToCart, items } = useCart();
    const cartItem = items.find(i => i.id === product.id);
    const isMaxed = cartItem ? cartItem.quantity >= product.stock : false;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock < 1 || isMaxed) return;
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
            stock: product.stock
        });
    };

    if (product.stock < 1) {
        return (
            <button disabled className="btn" style={{ ...style, backgroundColor: 'var(--border-light)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}>
                Out of Stock
            </button>
        );
    }

    return (
        <button
            className="btn btn-secondary"
            onClick={handleClick}
            disabled={isMaxed}
            style={{
                ...style,
                cursor: isMaxed ? 'not-allowed' : 'pointer',
                opacity: isMaxed ? 0.6 : 1,
                transition: 'all 0.2s ease'
            }}
        >
            {isMaxed ? '✓ Max in Cart' : '🛒 Add to Cart'}
        </button>
    );
}
