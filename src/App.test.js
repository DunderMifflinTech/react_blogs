import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders App', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Articles you may like/i);
  expect(linkElement).toBeInTheDocument();
});
