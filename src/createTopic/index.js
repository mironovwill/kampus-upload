require('dotenv').config({ path: '../../.env' });

const axios = require('axios');
const https = require('https');

const completedTopics = require('../../JSON/topics-completed.json');
const createFile = require('../createFile');
const path = require('path');

const agent = new https.Agent({
  rejectUnauthorized: false
});

const result = [];

async function createTopic(url, token, body) {
  try {
    const response = await axios.post(url, body, {
      headers: {
        authorization: token
      },
      httpsAgent: agent
    });

    result.push({ [response.data.name]: response.data.publicUrl });
  } catch (error) {
    result.push({ error: error });
    console.error('Ошибка при отправке файла:', error);
  }
}

const createdTopics = completedTopics.map((topic) =>
  createTopic(process.env.TOPIC_CREATE_URL, process.env.TOKEN, topic)
);

Promise.all(createdTopics)
  .then(() => {
    return createFile(
      path.join(process.env.PARSE_CSV_RESULT_FOLDER_PATCH, process.env.DONE_TOPICS_JSON_NAME),
      result
    );
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = createTopic;
