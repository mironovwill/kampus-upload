require('dotenv').config({ path: '../../../.env' });
const path = require('path');
const doneTopics = require('../../../JSON/doneTopics.json');
const uploadFileToServer = require('../../uploadFileToServer/index');
const createBlockPlan = require('../createBlockPlan/index');
const uploadScormFile = require('../uploadScorm/index');
const uploadVideoFile = require('../uploadVideo/index');
const uploadPresFile = require('../uploadPresentation/index');

const API = 'https://admin.lms-russia.ru/api/v1/block/';
const FOLDER = '';

const createBlocks = async (block) => {
  const topicId = doneTopics[el.topicTitle]?.slice(-4);

  try {
    const blockPlan = await createBlockPlan(
      process.env.CREATE_BLOCK_PLAN_URL,
      process.env.TOKEN,
      block,
      topicId
    );

    console.log('Создан блок план', blockPlan.id);

    if (el.blockType.toLowerCase() === 'scorm') {
      const body = await uploadFileToServer(
        path.join(FOLDER, `${el.fileName}`),
        process.env.UPLOAD_SCORM_FILE_URL,
        process.env.TOKEN
      );

      await uploadScormFile(`${API}${blockPlan.id}/scorm/detail`, process.env.TOKEN, body.id);

      console.log('Блок план с скормом создался');
    }

    if (el.blockType.toLowerCase() === 'видео') {
      const body = await uploadFileToServer(
        path.join(FOLDER, `${el.fileName}`),
        process.env.UPLOAD_VIDEO_URL,
        process.env.TOKEN
      );

      console.log('Файл загрузился на сервер');

      await uploadVideoFile(`${API}${blockPlan.id}/video/detail`, process.env.TOKEN, body);

      console.log('Блок план с видео создался');
    }

    if (el.blockType.toLowerCase() === 'презентация') {
      const body = await uploadFileToServer(
        path.join(FOLDER, `${el.fileName}`),
        process.env.UPLOAD_PRES_URL,
        process.env.TOKEN
      );
      console.log('Файл загрузился на сервер');

      await uploadPresFile(`${API}${blockPlan.id}/presentation/detail`, TOKEN, body.id);

      console.log('Блок план с презой создался');
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  for (const el of blockPlans) {
    try {
      await createBlocks(el);
    } catch (error) {
      console.error('Ошибка при создании блоков:', error);
    }
  }
})();
