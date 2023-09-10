const axios = require('axios');

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMjgxMTQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZTA3NTllMWQtNWYyNS00NjdmLWJlNmUtMjgyMmFhZGI0M2JiIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjUwMDA4MjM0MCJ9.ft0Up4JKSz4v8QUXxvpY95vAcbFE3IgtkovNya3j9ss';

async function fetchTrains() {
  const config = {
    method: 'get',
    url: 'http://20.244.56.144/train/trains',
    headers: { 
      'Authorization': `Bearer ${AUTH_TOKEN}`
    }
  };

  try {
    const response = await axios(config);
    console.log("List of Trains:", response.data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchTrains();
