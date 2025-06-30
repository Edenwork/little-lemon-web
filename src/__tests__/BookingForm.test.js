import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

test('renders booking form elements', () => {
  render(<BookingForm />);
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /make reservation/i })).toBeInTheDocument();
});

test('submits form with valid data', () => {
  render(<BookingForm />);
  fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-07-01' } });
  fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });
  fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
  fireEvent.click(screen.getByRole('button', { name: /make reservation/i }));

  expect(screen.getByText(/reservation submitted successfully/i)).toBeInTheDocument();
});

test('shows error for invalid guests', () => {
  render(<BookingForm />);
  fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '0' } });
  fireEvent.click(screen.getByRole('button', { name: /make reservation/i }));

  expect(screen.getByText(/guests must be between 1 and 10/i)).toBeInTheDocument();
});