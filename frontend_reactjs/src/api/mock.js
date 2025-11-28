const seed = [
  { id: 'cw-001', name: 'Ocean Blue Shield', price: 24.99, brand: 'CaseWave', colors: ['Blue', 'Navy'], compatibility: ['iPhone 14', 'iPhone 15'], rating: 4.6, image: null, description: 'Matte-finish case with shock absorption.' },
  { id: 'cw-002', name: 'Amber Edge Guard', price: 19.99, brand: 'CaseWave', colors: ['Amber', 'Black'], compatibility: ['Samsung S23', 'Pixel 8'], rating: 4.3, image: null, description: 'Slim case with raised edges for screen protection.' },
  { id: 'cw-003', name: 'Midnight Armor', price: 29.99, brand: 'CaseWave Pro', colors: ['Black'], compatibility: ['iPhone 15 Pro'], rating: 4.8, image: null, description: 'Rugged protection with military-grade certification.' },
  { id: 'cw-004', name: 'Clear Breeze', price: 14.99, brand: 'CaseWave', colors: ['Clear'], compatibility: ['iPhone 13', 'Samsung S22'], rating: 4.1, image: null, description: 'Crystal clear design to showcase your phone.' },
  { id: 'cw-005', name: 'Marine Grip', price: 22.50, brand: 'CaseWave', colors: ['Teal', 'Blue'], compatibility: ['Pixel 7', 'Samsung S21'], rating: 4.5, image: null, description: 'Textured grip with anti-slip surface.' },
];

function timeout(ms) { return new Promise(r => setTimeout(r, ms)); }

/**
 * PUBLIC_INTERFACE
 * mockApi
 * Returns a mock API that simulates latency and backend behavior.
 */
export function mockApi() {
  return {
    async getProducts(params = {}) {
      await timeout(200);
      let results = [...seed];
      if (params.q) {
        const q = String(params.q).toLowerCase();
        results = results.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        );
      }
      if (params.compatibility) {
        const comp = String(params.compatibility);
        results = results.filter(p => p.compatibility.includes(comp));
      }
      return { items: results, total: results.length };
    },
    async getProductById(id) {
      await timeout(150);
      const item = seed.find(p => p.id === String(id));
      if (!item) { throw new Error('Not found'); }
      return item;
    },
    async createCheckout(payload) {
      await timeout(300);
      const total = (payload.items || []).reduce((s, it) => s + (it.price * it.quantity), 0);
      return { checkoutId: String(Date.now()), status: 'created', total };
    }
  };
}
