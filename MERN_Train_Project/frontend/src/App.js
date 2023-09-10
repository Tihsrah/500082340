import React, { useState, useEffect } from 'react';
import './App.css';
// import { fetchTrains } from './apiService';

// function App() {
//   const [trainData, setTrainData] = useState([]);
//   const [selectedTrain, setSelectedTrain] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortKey, setSortKey] = useState('');
//   const [booking, setBooking] = useState(false);
//   const [bookedTrain, setBookedTrain] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/trains')
//       .then((response) => response.json())
//       .then((data) => setTrainData(data));
//   }, []);

//   // useEffect(() => {
//   //   // Fetch train data using the API service
//   //   fetchTrains()
//   //     .then((response) => {
//   //       setTrainData(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching train data:', error);
//   //     });
//   // }, []);
//   // useEffect(() => {
//   //   fetch('http://localhost:3000/api/trains')
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       console.log(data); // Log the data to the console
//   //       setTrainData(data);
//   //     });
//   // }, []);
//   useEffect(() => {
//     fetch('http://localhost:3000/api/trains')
//       .then((response) => response.json())
//       .then((data) => {
//         const currentTime = { Hours: 12, Minutes: 0, Seconds: 0 }; // Assuming current time is 12:00:00
//         const filteredData = data.filter(train => {
//           const trainTime = train.departureTime;
//           const timeDifference = (trainTime.Hours - currentTime.Hours) * 60 + (trainTime.Minutes - currentTime.Minutes);
//           return timeDifference > 30; // Ignore trains departing in the next 30 minutes
//         });
//         setTrainData(filteredData);
//       });
//   }, []);

//   const filteredTrains = trainData
//     .filter(train => train.trainName.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => {
//       switch (sortKey) {
//         case 'departureTime':
//           return a.departureTime.Hours - b.departureTime.Hours;
//         case 'seatsAvailable':
//           return a.seatsAvailable.sleeper - b.seatsAvailable.sleeper;
//         case 'price':
//           return a.price.sleeper - b.price.sleeper;
//         default:
//           return 0;
//       }
//     });

//   const bookTrain = (train) => {
//     setBooking(true);
//     setBookedTrain(train);
//   };

//   const cancelBooking = () => {
//     setBooking(false);
//     setBookedTrain(null);
//   };

//   return (
//     <div className="App">
//       <h1>Train Information</h1>
//     <input
//       type="text"
//       placeholder="Search for trains..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//     <select onChange={(e) => setSortKey(e.target.value)}>
//       <option value="">Sort by</option>
//       <option value="departureTime">Departure Time</option>
//       <option value="seatsAvailable">Seats Available</option>
//       <option value="price">Price</option>
//     </select>
//     <ul>
//       {filteredTrains.map((train, index) => (
//         <li 
//           key={index} 
//           onClick={() => setSelectedTrain(train)}
//           className={train.delayedBy > 10 ? 'delayed' : ''}
//           style={{
//             backgroundColor: train.delayedBy > 10 ? 'red' : 'white', // Highlight delayed trains
//           }}
//         >
//           {train.trainName} - {train.trainNumber}
//           <span style={{ fontWeight: 'bold', color: 'blue' }}> | Price: {train.price.sleeper} (Sleeper), {train.price.AC} (AC)</span>
//           <span style={{ fontWeight: 'bold', color: train.seatsAvailable.sleeper < 5 ? 'red' : 'green' }}> | Seats Available: {train.seatsAvailable.sleeper} (Sleeper), {train.seatsAvailable.AC} (AC)</span>
//         </li>
//       ))}
//     </ul>
//       {selectedTrain && (
//         <div>
//           <h2>Train Details</h2>
//           <p>Departure Time: {`${selectedTrain.departureTime.Hours}:${selectedTrain.departureTime.Minutes}:${selectedTrain.departureTime.Seconds}`}</p>
//           <p>Seats Available: Sleeper - {selectedTrain.seatsAvailable.sleeper}, AC - {selectedTrain.seatsAvailable.AC}</p>
//           <p>Price: Sleeper - {selectedTrain.price.sleeper}, AC - {selectedTrain.price.AC}</p>
//           <p className={selectedTrain.delayedBy > 10 ? 'delayed' : ''}>Delayed By: {selectedTrain.delayedBy} minutes</p>
//           <button onClick={() => bookTrain(selectedTrain)}>Book this train</button>
//         </div>
//       )}
//       {booking && (
//         <div>
//           <h2>Booking Details</h2>
//           <p>You have successfully booked {bookedTrain.trainName} - {bookedTrain.trainNumber}</p>
//           <button onClick={cancelBooking}>Cancel Booking</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


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
            {/* Additional Information */}
            <span> | Price: {train.price.sleeper} (Sleeper), {train.price.AC} (AC)</span>
            <span> | Seats Available: {train.seatsAvailable.sleeper} (Sleeper), {train.seatsAvailable.AC} (AC)</span>
          </li>
        ))}
      </ul>
      {selectedTrain && (
        <div>
          <h2>Train Details</h2>
          <p>Departure Time: {`${selectedTrain.departureTime.Hours}:${selectedTrain.departureTime.Minutes}:${selectedTrain.departureTime.Seconds}`}</p>
          <p>Seats Available: Sleeper - {selectedTrain.seatsAvailable.sleeper}, AC - {selectedTrain.seatsAvailable.AC}</p>
          <p>Price: Sleeper - {selectedTrain.price.sleeper}, AC - {selectedTrain.price.AC}</p>
          <p className={selectedTrain.delayedBy > 10 ? 'delayed' : ''}>Delayed By: {selectedTrain.delayedBy} minutes</p>
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