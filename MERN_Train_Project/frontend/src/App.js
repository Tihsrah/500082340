import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [trainData, setTrainData] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [booking, setBooking] = useState(false);
  const [bookedTrain, setBookedTrain] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/trains')
      .then((response) => response.json())
      .then((data) => setTrainData(data));
  }, []);

  const filteredTrains = trainData
    .filter(train => train.trainName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortKey) {
        case 'departureTime':
          return a.departureTime.Hours - b.departureTime.Hours;
        case 'seatsAvailable':
          return a.seatsAvailable.sleeper - b.seatsAvailable.sleeper;
        case 'price':
          return a.price.sleeper - b.price.sleeper;
        default:
          return 0;
      }
    });

  const bookTrain = (train) => {
    setBooking(true);
    setBookedTrain(train);
  };

  const cancelBooking = () => {
    setBooking(false);
    setBookedTrain(null);
  };

  return (
    <div className="App">
      <h1>Train Information</h1>
      <input
        type="text"
        placeholder="Search for trains..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortKey(e.target.value)}>
        <option value="">Sort by</option>
        <option value="departureTime">Departure Time</option>
        <option value="seatsAvailable">Seats Available</option>
        <option value="price">Price</option>
      </select>
      <ul>
        {filteredTrains.map((train, index) => (
          <li 
            key={index} 
            onClick={() => setSelectedTrain(train)}
            className={train.delayedBy > 10 ? 'delayed' : ''}
          >
            {train.trainName} - {train.trainNumber}
          </li>
        ))}
      </ul>
      {selectedTrain && (
        <div>
          <h2>Train Details</h2>
          <p>Departure Time: {`${selectedTrain.departureTime.Hours}:${selectedTrain.departureTime.Minutes}:${selectedTrain.departureTime.Seconds}`}</p>
          <p>Seats Available: Sleeper - {selectedTrain.seatsAvailable.sleeper}, AC - {selectedTrain.seatsAvailable.AC}</p>
          <p>Price: Sleeper - {selectedTrain.price.sleeper}, AC - {selectedTrain.price.AC}</p>
          <p>Delayed By: {selectedTrain.delayedBy} minutes</p>
          <button onClick={() => bookTrain(selectedTrain)}>Book this train</button>
        </div>
      )}
      {booking && (
        <div>
          <h2>Booking Details</h2>
          <p>You have successfully booked {bookedTrain.trainName} - {bookedTrain.trainNumber}</p>
          <button onClick={cancelBooking}>Cancel Booking</button>
        </div>
      )}
    </div>
  );
}

export default App;
