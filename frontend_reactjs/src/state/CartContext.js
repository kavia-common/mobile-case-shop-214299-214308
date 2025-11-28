import React, { createContext, useContext, useReducer, useMemo } from 'react';

/** Cart item shape: { id, name, price, quantity } */
const CartContext = createContext();

/** Reducer to manage cart items */
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item, quantity = 1 } = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      const items = existing
        ? state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)
        : [...state.items, { ...item, quantity }];
      return { items };
    }
    case 'REMOVE': {
      const id = action.payload.id;
      return { items: state.items.filter(i => i.id !== id) };
    }
    case 'SET_QTY': {
      const { id, quantity } = action.payload;
      const items = state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i);
      return { items };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * CartProvider
 * Provides cart state and actions to children.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const total = useMemo(() => state.items.reduce((s, i) => s + i.price * i.quantity, 0), [state.items]);
  const count = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items]);

  const value = useMemo(() => ({
    items: state.items,
    total,
    count,
    addItem: (item, quantity = 1) => dispatch({ type: 'ADD', payload: { item, quantity } }),
    removeItem: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
    setQuantity: (id, quantity) => dispatch({ type: 'SET_QTY', payload: { id, quantity } }),
    clear: () => dispatch({ type: 'CLEAR' })
  }), [state.items, total, count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useCart
 * Hook to access cart state.
 */
export function useCart() {
  return useContext(CartContext);
}
