import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Home
 * Landing page with hero and CTA.
 */
export default function Home() {
  return (
    <div className="card" style={{ padding: 32, overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
        <div style={{ fontWeight: 900, fontSize: 28 }}>Protect in Style</div>
        <div className="muted">Premium mobile cases with ocean-blue finesse and amber accents. Durable. Sleek. Made for your device.</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Link className="btn primary" to="/products" aria-label="Shop mobile cases">Shop Cases</Link>
          <a className="btn" href="#learn" aria-label="Learn more about CaseWave">Learn More</a>
        </div>
      </div>
      <div className="space" />
      <div id="learn" className="muted">Free shipping on orders over $50. 30-day returns guaranteed.</div>
    </div>
  );
}
