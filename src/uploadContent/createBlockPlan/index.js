const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

const blocksId = {
  scorm: 2,
  презентация: 4,
  видео: 3,
  video: 3
};

const createBlockPlan = async (url, token, body, topicId) => {
  try {
    const topicTypeId = blocksId[body.blockType.toLowerCase()];

    const response = await axios.post(
      url,
      {
        name: body.blockName || body.topicTitle,
        typeId: topicTypeId,
        topicId,
        position: 1
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

module.exports = createBlockPlan;
