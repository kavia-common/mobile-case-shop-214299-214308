import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound
 * 404 page for unmatched routes.
 */
export default function NotFound() {
  return (
    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
      <div style={{ fontWeight: 800, fontSize: 20 }}>Page not found</div>
      <div className="space" />
      <Link className="btn primary" to="/">Go Home</Link>
    </div>
  );
}
