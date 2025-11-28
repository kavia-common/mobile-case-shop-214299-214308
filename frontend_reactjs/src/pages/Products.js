import React, { useEffect, useMemo, useState } from 'react';
import { createApiClient } from '../api/client';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

/**
 * PUBLIC_INTERFACE
 * Products
 * Displays product catalog with search/filter support.
 */
export default function Products() {
  const api = useMemo(() => createApiClient(), []);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [compatibility, setCompatibility] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api.getProducts({ q, compatibility }).then(res => {
      if (!ignore) {
        setData(res);
        setLoading(false);
      }
    }).catch(() => setLoading(false));
    return () => { ignore = true; };
  }, [api, q, compatibility]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input className="input" placeholder="Search by name or brand..." value={q} onChange={e => setQ(e.target.value)} />
          <input className="input" placeholder="Filter by compatibility (e.g., iPhone 15)" value={compatibility} onChange={e => setCompatibility(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid">
          {data.items.map(p => <ProductCard key={p.id} product={p} />)}
          {data.items.length === 0 && (
            <div className="card" style={{ gridColumn: '1 / -1', padding: 24, textAlign: 'center' }}>
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
