import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * ToastProvider
 * Wrap your app to enable toast notifications for user feedback.
 */
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type: opts.type || 'info', duration: opts.duration ?? 2500, role: opts.role || 'status' };
    setItems((prev) => [...prev, toast]);
    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration);
    }
    return id;
  }, [remove]);

  const value = useMemo(() => ({ show, remove }), [show, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" aria-live="polite" role="region" aria-label="Notifications">
        {items.map(t => (
          <div key={t.id} className="toast" role={t.role} aria-atomic="true">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '⚠️' : 'ℹ️'} {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useToast
 * Hook to trigger toast notifications.
 */
export function useToast() {
  return useContext(ToastContext);
}
