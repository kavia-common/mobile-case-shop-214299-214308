import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation and CTA', () => {
  render(<App />);
  const cta = screen.getByText(/Shop Cases/i);
  expect(cta).toBeInTheDocument();
});
