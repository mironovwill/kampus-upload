const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

const uploadPresFile = async (url, token, id) => {
  try {
    const response = await axios.post(
      url,
      {
        id
      },
      {
        headers: {
          authorization: token
        },
        httpsAgent: agent
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadPresFile;
