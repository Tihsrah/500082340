import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function TrainList() {
  const [trainData, setTrainData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/trains')
      .then((response) => response.json())
      .then((data) => setTrainData(data));
  }, []);


  useEffect(() => {
    fetch('http://localhost:3000/api/trains')
      .then((response) => response.json())
      .then((data) => {
        const currentTime = { Hours: 12, Minutes: 0, Seconds: 0 }; // Assuming current time is 12:00:00
        const filteredData = data.filter(train => {
          const trainTime = train.departureTime;
          const timeDifference = (trainTime.Hours - currentTime.Hours) * 60 + (trainTime.Minutes - currentTime.Minutes);
          return timeDifference > 30; // Ignore trains departing in the next 30 minutes
        });
        setTrainData(filteredData);
      });
  }, []);

  const filteredTrains = trainData
    .filter((train) => train.trainName.toLowerCase().includes(searchTerm.toLowerCase()))
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

  return (
    <div>
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
          <li key={index}>
            <Link to={`/train/${train.trainNumber}`}>
              {train.trainName} - {train.trainNumber}
            </Link>
            <span className={train.delayedBy > 10 ? 'delayed' : ''}>
              | Delayed By: {train.delayedBy} minutes
            </span>
            <span>
              | Price: {train.price.sleeper} (Sleeper), {train.price.AC} (AC)
            </span>
            <span>
              | Seats Available: {train.seatsAvailable.sleeper} (Sleeper), {train.seatsAvailable.AC} (AC)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainList;
