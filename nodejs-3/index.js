const FS = require('fs');
const readline = require('readline');
const writable = require('./handlers/writable')
const createFile = require('./handlers/createFile')

const SIZE = 100;
const FILE_NAME = 'start.txt';
const OUTPUT_FILE_NAME = 'end.txt';
const DIR_NAME = './sort/';
const SPLIT_FILE_COUNT = 50;

const splitFile = async (count = SPLIT_FILE_COUNT) => {
  const writeStream = await writable(count, FILE_NAME)
  return new Promise(resolve => {
    FS.createReadStream(FILE_NAME)
      .pipe(writeStream)
      .on('finish', () => {
        resolve(true);
      });
  });
};

const getStreamArray = () => new Promise((resolve, reject) => {
  let streamArray = [];
  FS.readdir(DIR_NAME, (err, files) => {
    if (err) reject(err);
    files.forEach(fileName => streamArray.push(FS.createReadStream(`${DIR_NAME}${fileName}`).pause()));
    resolve(streamArray);
  });
});

const getNumFromStream = (stream) => {
  return new Promise((resolve, reject) => {
    readline.createInterface({
      input: stream.resume()
    }).on('line', line => {
      resolve(line);
      stream.close();
    });
  });
};

const minFromFile = async () => {
  await createFile(FILE_NAME, SIZE);
  await splitFile();
  const streamArray = await getStreamArray();
  var fh = FS.openSync(OUTPUT_FILE_NAME, 'w');
  for (const stream of streamArray) {
    const smallestNumber = await getNumFromStream(stream);
    FS.writeSync(fh, `${smallestNumber}\n`);
  }
};

minFromFile();