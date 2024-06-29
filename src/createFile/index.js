const fs = require('fs');

function createFile(filename, data) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      return console.error('Ошибка при записи JSON файла', error);
    }
    console.log('JSON файл успешно создан');
  });
}

module.exports = createFile;
