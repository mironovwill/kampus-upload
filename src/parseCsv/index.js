require('dotenv').config({ path: '../../.env' });
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const createFile = require('../createFile');

const results = [];

fs.createReadStream(process.env.PARSE_CSV_FILE_PATCH)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    createFile(
      path.join(process.env.PARSE_CSV_RESULT_FOLDER_PATCH, process.env.PARSE_CSV_DRAFT_JSON_NAME),
      results
    );
  });
