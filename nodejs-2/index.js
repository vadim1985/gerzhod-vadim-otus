const { program } = require('commander');
const VisualDirectory = require('./VisualDirectory');

program.option('-d, --depth <number>', 'input depth');
program.parse(process.argv);

const visualDirectory = new VisualDirectory(program.args[0], program.depth);
visualDirectory.directoryTree();