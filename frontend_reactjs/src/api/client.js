import { parseFeatureFlags } from '../utils/featureFlags';
import { mockApi } from './mock';

/**
 * PUBLIC_INTERFACE
 * createApiClient
 * Creates an API client for the backend with mock fallback.
 */
export function createApiClient() {
  /** This is a public function. It returns an object with API methods. */
  const flags = parseFeatureFlags(process.env.REACT_APP_FEATURE_FLAGS);
  const useMock = Boolean(flags.mockApi);

  const BASE =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    '';

  const baseUrl = BASE?.replace(/\/+$/, '');

  async function http(path, options = {}) {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API error ${res.status}: ${text || res.statusText}`);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  if (useMock || !baseUrl) {
    // PUBLIC_INTERFACE
    return mockApi();
  }

  // PUBLIC_INTERFACE
  return {
    /** Get all products */
    async getProducts(params = {}) {
      const qs = new URLSearchParams(params).toString();
      const path = `/products${qs ? `?${qs}` : ''}`;
      return http(path);
    },
    /** Get one product by id */
    async getProductById(id) {
      return http(`/products/${encodeURIComponent(id)}`);
    },
    /** Create checkout from cart */
    async createCheckout(payload) {
      return http(`/checkout`, { method: 'POST', body: JSON.stringify(payload) });
    }
  };
}
