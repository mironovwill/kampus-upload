require('dotenv').config({ path: '../../.env' });

const axios = require('axios');
const https = require('https');

const createFile = require('../createFile');
const path = require('path');

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function fetchData(page, token) {
  try {
    const response = await axios.get(`${process.env.GET_TOPICS}${page}`, {
      headers: {
        authorization: token
      },
      httpsAgent: agent
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error);
    return null;
  }
}

async function main() {
  const results = [];
  let page = 1;
  const totalPages = 110;

  while (page <= totalPages) {
    console.log(`Fetching page ${page}`);
    const data = await fetchData(page, process.env.TOKEN);
    if (data) {
      results.push(
        data.map((topic) => {
          console.log({
            [topic.name]: topic.publicUrl
          });
          return {
            [topic.name]: {
              link: topic.publicUrl
            }
          };
        })
      );
    }
    page++;
  }

  createFile(path.join(process.env.PARSE_CSV_RESULT_FOLDER_PATCH, 'results.json'), results);
}

main();
