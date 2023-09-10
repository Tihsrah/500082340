import React, { useState, useEffect } from 'react';
import './App.css';
import { useParams, Link } from 'react-router-dom';

function TrainDetail() {
  const { trainNumber } = useParams();
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    // Normally, you'd fetch data here based on trainNumber
    setSelectedTrain({ trainName: "Example Train", trainNumber });
  }, [trainNumber]);

  return (
    <div>
      {selectedTrain && (
        <div>
          <h2>Train Details</h2>
          <p>Train Name: {selectedTrain.trainName}</p>
          <p>Train Number: {selectedTrain.trainNumber}</p>
          {/* Add other details here */}
          <Link to={`/booking/${selectedTrain.trainNumber}`}>Book this train</Link>
        </div>
      )}
    </div>
  );
}

export default TrainDetail;
