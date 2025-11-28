import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import QuantityControl from '../components/QuantityControl';
import EmptyState from '../components/EmptyState';

/**
 * PUBLIC_INTERFACE
 * Cart
 * Shows cart items and totals.
 */
export default function Cart() {
  const { items, total, setQuantity, removeItem, clear } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return <EmptyState title="Your cart is empty" description="Browse our products and add items to your cart." to="/products" actionLabel="Shop Products" />;
  }

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: 'span 8', padding: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Cart Items</div>
        <div style={{ display: 'grid', gap: 12 }}>
          {items.map(it => (
            <div key={it.id} className="card" style={{ padding: 12, display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 700 }}>{it.name}</div>
                <div className="price">${(it.price * it.quantity).toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <QuantityControl value={it.quantity} onChange={(v) => setQuantity(it.id, v)} />
                <button className="btn" onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ gridColumn: 'span 4', padding: 16, height: 'fit-content' }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Summary</div>
        <div className="space" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Subtotal</span>
          <span className="price">${total.toFixed(2)}</span>
        </div>
        <div className="space" />
        <div style={{ display: 'grid', gap: 8 }}>
          <button className="btn primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          <button className="btn" onClick={() => clear()}>Clear Cart</button>
          <Link className="btn" to="/products">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
