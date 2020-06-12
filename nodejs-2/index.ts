import { program } from 'commander';
import { VisualDirectory } from './VisualDirectory';

program.option('-d, --depth <number>', 'input depth');
program.parse(process.argv);

const visualDirectory = new VisualDirectory(program.args[0], program.depth);
visualDirectory.directoryTree();