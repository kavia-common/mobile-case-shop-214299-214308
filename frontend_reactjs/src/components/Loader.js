import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader
 * Skeleton-based loading indicator to improve perceived performance.
 */
export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row" aria-hidden>
        <div className="skeleton" style={{ height: 16, width: 120 }} />
        <div className="skeleton" style={{ height: 16, width: 80 }} />
      </div>
      <div className="space" />
      <div className="skeleton" style={{ height: 12, width: '100%' }} />
      <div className="skeleton" style={{ height: 12, width: '90%', marginTop: 8 }} />
      <div className="skeleton" style={{ height: 12, width: '95%', marginTop: 8 }} />
      <div className="space" />
      <div className="muted" role="status" aria-live="polite">{label}</div>
    </div>
  );
}
