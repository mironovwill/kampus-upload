const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

const uploadVideoFile = async (url, token, body) => {
  try {
    const response = await axios.post(
      url,
      {
        id: body.id,
        coverImage: null
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

module.exports = uploadVideoFile;
