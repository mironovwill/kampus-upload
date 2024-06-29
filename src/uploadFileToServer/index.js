require('dotenv').config({ path: '../../.env' });

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function uploadFileToServer(filePath, url, token) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        authorization: token
      },
      httpsAgent: agent
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке файла:', error);
  }
}

module.exports = uploadFileToServer;
