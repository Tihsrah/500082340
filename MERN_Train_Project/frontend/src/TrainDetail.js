import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

function TrainDetail() {
  const { trainNumber } = useParams();
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    // Normally, you'd fetch data here based on trainNumber
    setSelectedTrain({ trainName: "Example Train", trainNumber });
  }, [trainNumber]);

  return (
    <Container>
      {selectedTrain && (
        <div>
          <Typography variant="h4">Train Details</Typography>
          <Typography variant="h6">Train Name: {selectedTrain.trainName}</Typography>
          <Typography variant="h6">Train Number: {selectedTrain.trainNumber}</Typography>
          {/* Add other details here */}
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/booking/${selectedTrain.trainNumber}`}
          >
            Book this train
          </Button>
        </div>
      )}
    </Container>
  );
}

export default TrainDetail;
