import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useToast } from './Toast';

/**
 * PUBLIC_INTERFACE
 * ProductCard
 * Displays a product with image, title, price and link with quick-add action.
 */
export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const toast = useToast();

  const onQuickAdd = (e) => {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price }, 1);
    toast?.show(`Added ${product.name} to cart`, { type: 'success', role: 'status' });
  };

  return (
    <div className="card product-card" role="article" aria-label={product.name}>
      <Link to={`/products/${product.id}`} className="media" aria-label={`View ${product.name}`}>
        <div className="img">
          {product.image ? <img alt={product.name} src={product.image} /> : product.name.split(' ')[0]}
        </div>
        <button type="button" className="btn primary quick-add" onClick={onQuickAdd} aria-label={`Quick add ${product.name} to cart`}>
          + Add
        </button>
      </Link>
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontWeight: 700 }}>{product.name}</div>
          <div className="price" aria-label={`Price ${product.price.toFixed(2)} dollars`}>${product.price.toFixed(2)}</div>
        </div>
        <div className="note" aria-label={`Rating ${product.rating ?? 'N/A'}`}>Rating: {product.rating ?? 'N/A'}</div>
        <Link className="btn" to={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>View</Link>
      </div>
    </div>
  );
}
