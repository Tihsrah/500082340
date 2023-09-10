const axios = require('axios');

async function getAuthToken() {
  const config = {
    method: 'post',
    url: 'http://20.244.56.144/train/auth',
    headers: { 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      companyName: "Train Central",
      clientID: "e0759e1d-5f25-467f-be6e-2822aadb43bb",
      ownerName: "Harshit",
      ownerEmail: "harshlf4@gmail.com",
      rollNo: "500082340",
      clientSecret: "fHRhEbbvlLkCbvOl"
    })
  };

  try {
    const response = await axios(config);
    console.log("Auth Token:", response.data.access_token);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

getAuthToken();
