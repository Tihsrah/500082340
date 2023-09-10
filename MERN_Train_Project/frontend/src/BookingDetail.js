import React, { useState, useEffect } from 'react';
import './App.css';
import { useParams, Link } from 'react-router-dom';

function BookingDetail() {
  const { trainNumber } = useParams();
  const [booking, setBooking] = useState(true);
  const [bookedTrain, setBookedTrain] = useState({ trainName: 'Example Train', trainNumber });

  return (
    <div>
      {booking && (
        <div>
          <h2>Booking Details</h2>
          <p>You have successfully booked {bookedTrain.trainName} - {bookedTrain.trainNumber}</p>
          <Link to="/" onClick={() => setBooking(false)}>Cancel Booking</Link>
        </div>
      )}
    </div>
  );
}

export default BookingDetail;
