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
    await new Promise((resolve) => setTimeout(resolve, 1000)); // задержка 1 секунда

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        authorization: token
      },
      httpsAgent: agent
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке файла:', error);
  }
}

module.exports = uploadFileToServer;
