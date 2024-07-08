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
const { getPropertyObject, stringToArray, mapTagsOrSkills } = require('../utils/index');
const createFile = require('../createFile');

const processTopic = async (topic) => {
  return {
    ...topic,
    description: topic.description || topic.name,
    topicMandatory: topic.topicMandatory || null,
    cost: Number(topic.cost) || 0,
    duration: Number(topic.duration) || null,
    tags: mapTagsOrSkills(topic.tags),
    skills: mapTagsOrSkills(topic.skills),
    languageId: languages[topic.languageId.toLowerCase()] || null,
    jobFamilies: getPropertyObject(topic.jobFamilies, functions) || null,
    jobLevels: getPropertyObject(topic.jobLevels, jobLevel) || null,
    levelId: levels[topic.levelId.toLowerCase()] || null,
    authorNames: stringToArray(topic.authorNames),
    typeId: topicTypes[topic.typeLabelId.toLowerCase()]?.topicTypeId || null,
    typeLabelId: topicTypes[topic.typeLabelId.toLowerCase()]?.id || null,
    publisher: topic.publisher
  };
};

const completedTopics = topicsData.map(processTopic);

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
