import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { CartProvider } from './state/CartContext';
import { UIProvider, useUI } from './state/UIContext';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

// Shell with header/footer so we can access UI context for theme toggle
function Shell() {
  const { theme, toggleTheme } = useUI();
  return (
    <div className="app-shell">
      <header className="header">
        <div className="container navbar">
          <div className="brand">
            <div className="logo" aria-hidden />
            <span>CaseWave</span>
          </div>
          <nav className="nav-links" aria-label="Primary">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/products">Products</NavLink>
            <NavLink className="nav-link" to="/cart">Cart</NavLink>
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
      <main>
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
      <footer className="footer">
        <div className="container">
          <div className="muted">© {new Date().getFullYear()} CaseWave. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** App entry renders router with providers */
  return (
    <UIProvider>
      <CartProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </CartProvider>
    </UIProvider>
  );
}

export default App;
