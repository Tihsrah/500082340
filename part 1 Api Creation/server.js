const express = require('express');
const cors = require('cors');
const moment = require('moment'); // Make sure to install this package

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

const trainData = [
    // Your train data goes here. You can copy-paste the array of train data you provided earlier.
        {
          trainName: 'Chennai Exp',
          trainNumber: '2344',
          departureTime: { Hours: 21, Minutes: 35, Seconds: 0 },
          seatsAvailable: { sleeper: 3, AC: 1 },
          price: { sleeper: 516, AC: 620 },
          delayedBy: 15
        },
        {
          trainName: 'Hyderabad Exp',
          trainNumber: '2341',
          departureTime: { Hours: 23, Minutes: 55, Seconds: 0 },
          seatsAvailable: { sleeper: 6, AC: 7 },
          price: { sleeper: 554, AC: 1854 },
          delayedBy: 5
        },
        {
          trainName: 'Aizawl Exp',
          trainNumber: '2342',
          departureTime: { Hours: 8, Minutes: 30, Seconds: 0 },
          seatsAvailable: { sleeper: 18, AC: 7 },
          price: { sleeper: 1152, AC: 1783 },
          delayedBy: 2
        },
        {
          trainName: 'Jodhpur Exp',
          trainNumber: '2344',
          departureTime: { Hours: 11, Minutes: 0, Seconds: 0 },
          seatsAvailable: { sleeper: 33, AC: 13 },
          price: { sleeper: 573, AC: 684 },
          delayedBy: 4
        },
        {
          trainName: 'Cuttack Exp',
          trainNumber: '2346',
          departureTime: { Hours: 12, Minutes: 3, Seconds: 0 },
          seatsAvailable: { sleeper: 10, AC: 1 },
          price: { sleeper: 432, AC: 573 },
          delayedBy: 6
        },
        {
          trainName: 'Srinagar Exp',
          trainNumber: '2349',
          departureTime: { Hours: 14, Minutes: 55, Seconds: 0 },
          seatsAvailable: { sleeper: 1, AC: 0 },
          price: { sleeper: 917, AC: 1004 },
          delayedBy: 10
        },
        {
          trainName: 'Cochin Exp',
          trainNumber: '2348',
          departureTime: { Hours: 15, Minutes: 55, Seconds: 0 },
          seatsAvailable: { sleeper: 1, AC: 0 },
          price: { sleeper: 677, AC: 964 },
          delayedBy: 11
        },
        {
          trainName: 'Gandhinagar Exp',
          trainNumber: '2341',
          departureTime: { Hours: 7, Minutes: 15, Seconds: 0 },
          seatsAvailable: { sleeper: 15, AC: 5 },
          price: { sleeper: 472, AC: 705 },
          delayedBy: 1
        },
        {
          trainName: 'Amritsar Exp',
          trainNumber: '2346',
          departureTime: { Hours: 19, Minutes: 0, Seconds: 0 },
          seatsAvailable: { sleeper: 15, AC: 10 },
          price: { sleeper: 540, AC: 740 },
          delayedBy: 13
        },
        {
          trainName: 'Pune Exp',
          trainNumber: '2342',
          departureTime: { Hours: 23, Minutes: 0, Seconds: 0 },
          seatsAvailable: { sleeper: 6, AC: 7 },
          price: { sleeper: 854, AC: 1854 },
          delayedBy: 5
        },
        {
          trainName: 'Delhi Exp',
          trainNumber: '2343',
          departureTime: { Hours: 9, Minutes: 45, Seconds: 0 },
          seatsAvailable: { sleeper: 32, AC: 1 },
          price: { sleeper: 453, AC: 1443 },
          delayedBy: 3
        },
        {
          trainName: 'Mysore Exp',
          trainNumber: '2347',
          departureTime: { Hours: 13, Minutes: 32, Seconds: 0 },
          seatsAvailable: { sleeper: 2, AC: 2 },
          price: { sleeper: 460, AC: 593 },
          delayedBy: 8
        },
        {
          trainName: 'Panjim Exp',
          trainNumber: '2349',
          departureTime: { Hours: 13, Minutes: 32, Seconds: 0 },
          seatsAvailable: { sleeper: 2, AC: 1 },
          price: { sleeper: 304, AC: 467 },
          delayedBy: 9
        },
        {
          trainName: 'Lucknow Exp',
          trainNumber: '2347',
          departureTime: { Hours: 17, Minutes: 33, Seconds: 0 },
          seatsAvailable: { sleeper: 5, AC: 1 },
          price: { sleeper: 262, AC: 383 },
          delayedBy: 12
        },
        {
          trainName: 'Sikkim Exp',
          trainNumber: '2345',
          departureTime: { Hours: 11, Minutes: 23, Seconds: 0 },
          seatsAvailable: { sleeper: 4, AC: 4 },
          price: { sleeper: 696, AC: 1472 },
          delayedBy: 5
        },
        {
          trainName: 'Bokaro Exp',
          trainNumber: '2347',
          departureTime: { Hours: 13, Minutes: 32, Seconds: 0 },
          seatsAvailable: { sleeper: 55, AC: 0 },
          price: { sleeper: 238, AC: 428 },
          delayedBy: 7
        },
        {
          trainName: 'Kolkata Exp',
          trainNumber: '2345',
          departureTime: { Hours: 20, Minutes: 15, Seconds: 0 },
          seatsAvailable: { sleeper: 16, AC: 70 },
          price: { sleeper: 540, AC: 640 },
          delayedBy: 14
        },
        {
          trainName: 'Mumbai Exp',
          trainNumber: '2343',
          departureTime: { Hours: 22, Minutes: 37, Seconds: 0 },
          seatsAvailable: { sleeper: 8, AC: 15 },
          price: { sleeper: 520, AC: 620 },
          delayedBy: 16
        }
];


const getFilteredAndSortedTrains = () => {
    const currentTime = moment();
    const twelveHoursLater = moment().add(12, 'hours');
    const halfHourLater = moment().add(30, 'minutes');
  
    return trainData
      .filter(train => {
        const trainTime = moment().set({
          hour: train.departureTime.Hours,
          minute: train.departureTime.Minutes,
          second: train.departureTime.Seconds,
        }).add(train.delayedBy, 'minutes');
  
        return trainTime.isBetween(currentTime, twelveHoursLater) && !trainTime.isBetween(currentTime, halfHourLater);
      })
      .sort((a, b) => {
        // Sorting logic here: Ascending order of price, descending order of seats, descending order of departure time
        if (a.price.sleeper !== b.price.sleeper) {
          return a.price.sleeper - b.price.sleeper;
        }
        if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
          return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
        }
        return b.departureTime.Hours - a.departureTime.Hours;
      });
  };
  
  app.get('/api/trains', (req, res) => {
    const filteredAndSortedTrains = getFilteredAndSortedTrains();
    res.json(filteredAndSortedTrains);
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });