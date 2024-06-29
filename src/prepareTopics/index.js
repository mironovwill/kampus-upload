require('dotenv').config({ path: '../../.env' });
const path = require('path');
const fs = require('fs');
const topicsData = require('../../JSON/topics-draft.json');
const languages = require('../data/languageID.json');
const categories = require('../data/categoryID.json');
const levels = require('../data/levelID.json');
const topicTypes = require('../data/topicTypes.json');
const jobLevel = require('../data/jobLevel.json');
const functions = require('../data/functions.json');
const createFile = require('../createFile');
const uploadFileToServer = require('../uploadFileToServer/index');

const getPropertyObject = (str, json) => {
  if (str.length === 0) return [];
  return str.split(',').map((name) => json[name.trim()].id);
};

const stringToArray = (str) => {
  if (str.length === 0) return [];
  return str.split(',').map((name) => name.trim());
};

const completedTopics = topicsData.map(async (topic) => {
  let topicImageUuid = null;
  let coverFileUuid = null;
  const filePath = path.resolve(__dirname, `../../assets/${topic.thumbFileUuid}`);

  if (topic.thumbFileUuid.length > 0 && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const topicImage = await uploadFileToServer(
      filePath,
      process.env.FILE_UPLOAD_URL,
      process.env.TOKEN
    );

    topicImageUuid = topicImage.thumbUuid ?? topicImage.uuid ?? null;
    coverFileUuid = topicImage.uuid ?? topicImage.thumbUuid ?? null;
  }

  return {
    ...topic,
    thumbFileUuid: topicImageUuid,
    coverFileUuid: coverFileUuid,
    description: topic.description || topic.name,
    topicMandatory: topic.topicMandatory || null,
    cost: Number(topic.cost) || 0,
    duration: Number(topic.duration) || null,
    tags:
      topic.tags.length > 0
        ? topic.tags
            .split(',')
            .map((name) => name.trim())
            .map((tag) => {
              return {
                name: tag
              };
            })
        : [],
    skills:
      topic.skills.length > 0
        ? topic.skills
            .split(',')
            .map((name) => name.trim())
            .map((skill) => {
              return {
                name: skill
              };
            })
        : [],
    languageId: languages[topic.languageId.toLowerCase()] || null,
    jobFamilies: getPropertyObject(topic.jobFamilies, functions) || null,
    jobLevels: getPropertyObject(topic.jobLevels, jobLevel) || null,
    levelId: levels[topic.levelId.toLowerCase()] || null,
    authorNames: stringToArray(topic.authorNames),
    typeId: topicTypes[topic.typeLabelId.toLowerCase()].topicTypeId || null,
    typeLabelId: topicTypes[topic.typeLabelId.toLowerCase()]
      ? topicTypes[topic.typeLabelId.toLowerCase()].id
      : null,
    publisher: topic.publisher
  };
});

Promise.all(completedTopics)
  .then((topics) => {
    return createFile(
      path.join(
        process.env.PARSE_CSV_RESULT_FOLDER_PATCH,
        process.env.PARSE_CSV_COMPLETED_JSON_NAME
      ),
      topics
    );
  })
  .catch((err) => {
    console.log(err);
  });
