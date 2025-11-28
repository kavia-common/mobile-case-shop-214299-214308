import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ProductCard
 * Displays a product with image, title, price and link.
 */
export default function ProductCard({ product }) {
  return (
    <div className="card product-card">
      <Link to={`/products/${product.id}`} className="media" aria-label={`View ${product.name}`}>
        <div className="img">{product.image ? <img alt={product.name} src={product.image} /> : product.name.split(' ')[0]}</div>
      </Link>
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontWeight: 700 }}>{product.name}</div>
          <div className="price">${product.price.toFixed(2)}</div>
        </div>
        <div className="note">Rating: {product.rating ?? 'N/A'}</div>
        <Link className="btn" to={`/products/${product.id}`}>View</Link>
      </div>
    </div>
  );
}
