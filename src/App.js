import React from 'react';
import BookingForm from './components/BookingForm';
import './styles/BookingForm.css';
import './styles/tailwind.css';

function App() {
  return (
    <div className="app">
      <h1>Little Lemon Restaurant</h1>
      <h2>Table Reservation</h2>
      <BookingForm />
    </div>
  );
}

export default App;