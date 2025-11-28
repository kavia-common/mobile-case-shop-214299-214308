import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader
 * Simple loading indicator.
 */
export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="card" style={{ padding: 20, textAlign: 'center' }}>
      {label}
    </div>
  );
}
