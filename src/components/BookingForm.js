import React, { useState } from 'react';

function BookingForm() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: '',
    requests: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests || formData.guests < 1 || formData.guests > 10)
      newErrors.guests = 'Guests must be between 1 and 10';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      alert(`Reservation confirmed for ${formData.guests} guests on ${formData.date} at ${formData.time}`);
      setFormData({ date: '', time: '', guests: '', occasion: '', requests: '' });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="booking-form">
      {submitted && <p className="success">Reservation submitted successfully!</p>}
      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Book Your Table</legend>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              aria-describedby="date-error"
              aria-invalid={!!errors.date}
            />
            {errors.date && <span id="date-error" className="error">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              aria-describedby="time-error"
              aria-invalid={!!errors.time}
            />
            {errors.time && <span id="time-error" className="error">{errors.time}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="guests">Number of Guests:</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max="10"
              aria-describedby="guests-error"
              aria-invalid={!!errors.guests}
            />
            {errors.guests && <span id="guests-error" className="error">{errors.guests}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="occasion">Occasion:</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="requests">Special Requests:</label>
            <textarea
              id="requests"
              name="requests"
              value={formData.requests}
              onChange={handleChange}
              placeholder="e.g., dietary needs"
            />
          </div>
          <button type="submit">Make Reservation</button>
        </fieldset>
      </form>
    </div>
  );
}

export default BookingForm;