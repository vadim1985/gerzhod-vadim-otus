const FS = require('fs');
const quicksort = require('./sort');
const DIR_NAME = './sort/';

const writeFile = (fileName, data) => {
  if (!FS.existsSync(DIR_NAME)) {
    FS.mkdirSync(DIR_NAME);
  }
  return new Promise((resolve, reject) => {
    try {
      const sortArray = quicksort(data)
      const fh = FS.openSync(`${DIR_NAME}${fileName}.txt`, 'w');
      FS.writeSync(fh, sortArray.join('\n'));
      FS.closeSync(fh);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = writeFile