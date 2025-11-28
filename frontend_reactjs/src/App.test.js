import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation and CTA', () => {
  render(<App />);
  const cta = screen.getByRole('link', { name: /Shop mobile cases|Shop Cases/i });
  expect(cta).toBeInTheDocument();
});
