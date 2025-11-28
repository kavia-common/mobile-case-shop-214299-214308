import React, { useMemo, useState } from 'react';
import { useCart } from '../state/CartContext';
import { createApiClient } from '../api/client';
import Loader from '../components/Loader';

/**
 * PUBLIC_INTERFACE
 * Checkout
 * Simulated checkout form that posts to API.
 */
export default function Checkout() {
  const { items, total, clear } = useCart();
  const api = useMemo(() => createApiClient(), []);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const disabled = !items.length || !email || !address;

  const submit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    setStatus('loading');
    try {
      const payload = { customer: { email, address }, items };
      const res = await api.createCheckout(payload);
      setResult(res);
      setStatus('success');
      clear();
    } catch (err) {
      setResult({ error: String(err?.message || err) });
      setStatus('error');
    }
  };

  if (status === 'loading') return <Loader label="Processing checkout..." />;

  if (status === 'success') {
    return (
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 800 }}>Thank you!</div>
        <div className="space" />
        <div className="muted">Your order has been created.</div>
        <div className="space" />
        <div>Checkout ID: <strong>{result?.checkoutId}</strong></div>
        <div>Total Paid: <strong>${(result?.total || 0).toFixed(2)}</strong></div>
      </div>
    );
  }

  return (
    <form className="grid" onSubmit={submit}>
      <div className="card" style={{ gridColumn: 'span 8', padding: 16, display: 'grid', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Contact</div>
        <input className="input" placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <div style={{ fontWeight: 800, fontSize: 18 }}>Shipping Address</div>
        <textarea className="input" placeholder="Address" rows={4} value={address} onChange={e => setAddress(e.target.value)} required />
      </div>
      <div className="card" style={{ gridColumn: 'span 4', padding: 16, height: 'fit-content', display: 'grid', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Order Summary</div>
        <div className="muted">Items: {items.length}</div>
        <div className="price">Total: ${total.toFixed(2)}</div>
        <button className="btn primary" type="submit" disabled={disabled}>Pay Now</button>
        {status === 'error' && <div style={{ color: 'var(--color-error)' }}>An error occurred: {result?.error}</div>}
      </div>
    </form>
  );
}
