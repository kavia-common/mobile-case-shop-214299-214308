import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * EmptyState
 * Reusable empty state block.
 */
export default function EmptyState({ title, description, actionLabel, to }) {
  return (
    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
      {description && <div className="muted" style={{ marginTop: 8 }}>{description}</div>}
      {to && <div style={{ marginTop: 16 }}>
        <Link to={to} className="btn primary">{actionLabel || 'Continue'}</Link>
      </div>}
    </div>
  );
}
