import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createApiClient } from '../api/client';
import QuantityControl from '../components/QuantityControl';
import { useCart } from '../state/CartContext';
import Loader from '../components/Loader';

/**
 * PUBLIC_INTERFACE
 * ProductDetail
 * Shows details for a selected product.
 */
export default function ProductDetail() {
  const { id } = useParams();
  const api = useMemo(() => createApiClient(), []);
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api.getProductById(id).then(p => {
      if (!ignore) {
        setProduct(p);
        setLoading(false);
      }
    }).catch(() => setLoading(false));
    return () => { ignore = true; };
  }, [api, id]);

  if (loading) return <Loader />;
  if (!product) return <div className="card" style={{ padding: 24 }}>Product not found.</div>;

  const onAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price }, qty);
  };

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: 'span 6', padding: 16, minHeight: 300 }}>
        <div style={{ width: '100%', height: 300, background: 'linear-gradient(135deg, rgba(37,99,235,.08), rgba(245,158,11,.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
          <div style={{ fontWeight: 800, color: 'var(--muted)' }}>{product.name}</div>
        </div>
      </div>
      <div className="card" style={{ gridColumn: 'span 6', padding: 16, display: 'grid', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 22 }}>{product.name}</div>
        <div className="muted">{product.brand}</div>
        <div className="price" style={{ fontSize: 20 }}>${product.price.toFixed(2)}</div>
        <div className="muted">Compatibility: {product.compatibility?.join(', ')}</div>
        <div className="muted">Colors: {product.colors?.join(', ')}</div>
        <div className="muted">{product.description}</div>
        <div className="space" />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <QuantityControl value={qty} onChange={setQty} />
          <button className="btn primary" onClick={onAdd}>Add to Cart</button>
          <Link className="btn" to="/cart">Go to Cart</Link>
        </div>
      </div>
    </div>
  );
}
