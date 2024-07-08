const json = require('../JSON/results.json');
const createFile = require('./createFile');
const path = require('path');

const processTopic = async (topic) => {
  return {
    [topic.name]: topic.publicUrl
  };
};

const completedTopics = json.map(processTopic);

return createFile(
  path.join(process.env.PARSE_CSV_RESULT_FOLDER_PATCH, 'test.json'),
  completedTopics
);
