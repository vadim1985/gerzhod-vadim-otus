const stream = require('stream');
const writeFile = require('./sortAndWriteWorker');
const countFileLines = require('./countFileLines');

let numArray = [];
let fileNum = 0;

const writable = async (count, fileName) => {
  const lineCount = await countFileLines(fileName);
  const lineOnFile = Math.floor(lineCount / count - 1);
  return new stream.Writable({
    write: async (chunk, encoding, next) => {
      numArray.push(...chunk.toString().split('\n').map(v => +v));
      if (numArray.length >= lineOnFile) {
        const otherУlements = numArray.splice(lineOnFile, numArray.length - lineOnFile)
        await writeFile(fileNum++, numArray);
        numArray = [...otherУlements];
      }
      next();
    }
  });
};

module.exports = writable;