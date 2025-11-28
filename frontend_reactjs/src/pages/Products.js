import React, { useEffect, useMemo, useState } from 'react';
import { createApiClient } from '../api/client';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

/**
 * PUBLIC_INTERFACE
 * Products
 * Displays product catalog with search/filter support and responsive sidebar.
 */
export default function Products() {
  const api = useMemo(() => createApiClient(), []);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const [compatibility, setCompatibility] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');
    api.getProducts({ q, compatibility }).then(res => {
      if (!ignore) {
        setData(res);
        setLoading(false);
      }
    }).catch((err) => {
      if (!ignore) {
        setError(String(err?.message || err));
        setLoading(false);
      }
    });
    return () => { ignore = true; };
  }, [api, q, compatibility]);

  const onToggleSection = (id) => {
    if (id === 'filters') setFiltersOpen(v => !v);
  };

  return (
    <div className="grid" role="region" aria-label="Catalog">
      {/* Sidebar filters */}
      <aside className="filters" aria-label="Filters">
        <div className={`section ${filtersOpen ? 'open' : ''}`}>
          <header onClick={() => onToggleSection('filters')} aria-expanded={filtersOpen} aria-controls="filters-content" role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggleSection('filters')}>
            <span>Filters</span>
            <span aria-hidden>{filtersOpen ? '▾' : '▸'}</span>
          </header>
          <div id="filters-content" className="content">
            <label htmlFor="q" className="muted">Search</label>
            <input id="q" className="input" placeholder="Search by name or brand..." value={q} onChange={e => setQ(e.target.value)} />
            <div className="space" />
            <label htmlFor="compat" className="muted">Compatibility</label>
            <input id="compat" className="input" placeholder="e.g., iPhone 15" value={compatibility} onChange={e => setCompatibility(e.target.value)} />
          </div>
        </div>
      </aside>

      {/* Content */}
      <section className="card" style={{ gridColumn: 'span 9', padding: 16 }}>
        {loading && <Loader label="Loading products..." />}

        {!loading && error && (
          <div role="alert" className="card" style={{ padding: 16, borderColor: 'var(--color-error)' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Unable to load products</div>
            <div className="muted">{error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid" aria-live="polite">
              {data.items.map(p => <ProductCard key={p.id} product={p} />)}
              {data.items.length === 0 && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <EmptyState
                    title="No products found"
                    description="Try adjusting your search or filter to find what you're looking for."
                    to="/products"
                    actionLabel="Clear Filters"
                  />
                </div>
              )}
            </div>
            <div className="space" />
            {/* simple pagination controls for UX parity (non-functional placeholder) */}
            <nav className="pagination" role="navigation" aria-label="Pagination">
              <button className="page-btn" type="button" aria-label="Previous page" disabled>Prev</button>
              <button className="page-btn" type="button" aria-current="page">1</button>
              <button className="page-btn" type="button" disabled>Next</button>
            </nav>
          </>
        )}
      </section>
    </div>
  );
}
