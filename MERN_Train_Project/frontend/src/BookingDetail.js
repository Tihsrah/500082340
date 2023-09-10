import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

function BookingDetail() {
  const { trainNumber } = useParams();
  const [booking, setBooking] = useState(true);
  const [bookedTrain, setBookedTrain] = useState({ trainName: 'Example Train', trainNumber });

  return (
    <Container>
      {booking && (
        <div>
          <Typography variant="h4">Booking Details</Typography>
          <Typography variant="h6">
            You have successfully booked {bookedTrain.trainName} - {bookedTrain.trainNumber}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/"
            onClick={() => setBooking(false)}
          >
            Cancel Booking
          </Button>
        </div>
      )}
    </Container>
  );
}

export default BookingDetail;
