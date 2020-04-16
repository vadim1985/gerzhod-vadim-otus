const FS = require('fs');

const countFileLines = (filePath) => {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    FS.createReadStream(filePath)
      .on("data", (buffer) => {
        let idx = -1;
        lineCount--;
        do {
          idx = buffer.indexOf(10, idx + 1);
          lineCount++;
        } while (idx !== -1);
      }).on("end", () => {
        resolve(lineCount);
      }).on("error", reject);
  });
};

module.exports = countFileLines;
