import React from 'react';

/**
 * PUBLIC_INTERFACE
 * QuantityControl
 * Small control to adjust quantities.
 */
export default function QuantityControl({ value, onChange, min = 1 }) {
  const dec = () => onChange(Math.max(min, (value || 1) - 1));
  const inc = () => onChange((value || 1) + 1);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <button type="button" className="btn" onClick={dec} aria-label="Decrease quantity">-</button>
      <input className="input" style={{ width: 64, textAlign: 'center' }} type="number" value={value} min={min} onChange={e => onChange(Number(e.target.value) || min)} />
      <button type="button" className="btn" onClick={inc} aria-label="Increase quantity">+</button>
    </div>
  );
}
