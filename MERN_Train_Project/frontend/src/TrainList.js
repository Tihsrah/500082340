import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Select, MenuItem } from '@mui/material';
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
        const currentTime = { Hours: 12, Minutes: 0, Seconds: 0 };
        const filteredData = data.filter(train => {
          const trainTime = train.departureTime;
          const timeDifference = (trainTime.Hours - currentTime.Hours) * 60 + (trainTime.Minutes - currentTime.Minutes);
          return timeDifference > 30;
        });
        setTrainData(filteredData);
      });
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

  return (
    <Container>
      {/* <Typography 
        variant="h4" 
        align="center" 
        component={RouterLink} 
        to="/" 
        sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
      >
        Train Information
      </Typography> */}
      {/* <RouterLink to="/">
      <h1>Train Information</h1>
    </RouterLink> */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for trains..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        fullWidth
        variant="outlined"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        <MenuItem value="">
          <em>Sort by</em>
        </MenuItem>
        <MenuItem value="departureTime">Departure Time</MenuItem>
        <MenuItem value="seatsAvailable">Seats Available</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>
      <ul>
        {filteredTrains.map((train, index) => (
          <li key={index}>
            <RouterLink to={`/train/${train.trainNumber}`}>
              {train.trainName} - {train.trainNumber}
            </RouterLink>
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
    </Container>
  );
}

export default TrainList;
