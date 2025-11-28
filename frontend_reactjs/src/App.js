import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import { CartProvider } from './state/CartContext';
import { UIProvider, useUI } from './state/UIContext';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

// Shell with header/footer so we can access UI context for theme toggle
function Shell() {
  const { theme, toggleTheme } = useUI();
  const navigate = useNavigate();

  // simple header search that routes to products with q=...
  const onHeaderSearch = (e) => {
    if (e.key === 'Enter') {
      const val = e.target.value.trim();
      const to = val ? `/products?q=${encodeURIComponent(val)}` : '/products';
      navigate(to);
    }
  };

  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <div className="app-shell">
      <header className="header" role="banner">
        <div className="container navbar">
          <div className="brand" aria-label="CaseWave">
            <div className="logo" aria-hidden />
            <span>CaseWave</span>
          </div>
          <div className="header-search" role="search">
            <input
              className="input"
              type="search"
              placeholder="Search products... (press Enter)"
              aria-label="Search products"
              onKeyDown={onHeaderSearch}
            />
            <kbd aria-hidden>Enter</kbd>
          </div>
          <nav className="nav-links" aria-label="Primary">
            <NavLink className={navClass} to="/">Home</NavLink>
            <NavLink className={navClass} to="/products">Products</NavLink>
            <NavLink className={navClass} to="/cart">Cart</NavLink>
          </nav>
          <div className="actions">
            <button className="btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <NavLink to="/cart" className="btn primary" aria-label="Go to cart">
              🛒 Cart
            </NavLink>
          </div>
        </div>
      </header>
      <main role="main">
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="muted">© {new Date().getFullYear()} CaseWave. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

/* Renamed to avoid any potential redeclaration issues in build pipelines */
// PUBLIC_INTERFACE
function RootApp() {
  /** App entry renders router with providers */
  return (
    <UIProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <Shell />
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </UIProvider>
  );
}

export default RootApp;
