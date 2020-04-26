const FS = require('fs');

const createFile = (fileName, size) => {
  return new Promise((resolve, reject) => {
    FS.openSync(fileName, 'w');
    while (FS.statSync(fileName).size < size * 1024 * 1024) {
      FS.appendFileSync(fileName, `${randomInteger(-1000000, 1000000)}\n`, { encoding: 'utf-8' });
    }
    FS.closeSync(fh);
    resolve(true);
  });
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

module.exports = createFile;