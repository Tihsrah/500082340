const axios = require('axios');

async function registerCompany() {
    const registerUrl = 'http://20.244.56.144/train/register';
    const requestData = {
        "companyName": "Train Central",
        "ownerName": "Harshit",
        "rollNo": "500082340",
        "ownerEmail": "harshlf4@gmail.com",
        "accessCode": "JnNPGs"
    };

    try {
        const response = await axios.post(registerUrl, requestData);
        if (response.status === 200) {
            const { clientID, clientSecret } = response.data;
            console.log(`Successfully registered. ClientID: ${clientID}, ClientSecret: ${clientSecret}`);
            // Save these credentials for future use
        } else {
            console.log('Registration failed', response.data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

registerCompany();
