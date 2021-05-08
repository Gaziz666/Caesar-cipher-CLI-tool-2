import commander, { Command } from 'commander';
import { lineCoder } from './lineCoder.js';
import { actions } from './constants.js';
import {
  saveToFileWithoutInput,
  showToConsoleFromInput,
  saveToInputFromOutput,
} from './saveOutput.js';

const checkNumber = (value) => {
  if (Number(value) === NaN) {
    throw new commander.InvalidOptionArgumentError('shift not a number');
  }
  if (Math.round(+value) !== +value) {
    throw new commander.InvalidOptionArgumentError('shift must be digit');
  }
  return value;
};

const program = new Command();

program
  .version('0.0.1')
  .requiredOption('-s, --shift <shift>', 'a shift', checkNumber)
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .requiredOption('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

const options = program.opts();

if (options.action === actions.encode || options.action === actions.decode) {
} else {
  console.error(
    `wrong parameter of action, must be "encode" or "decode", error code: ${process.stderr.fd}`,
  );
  process.exit();
}

if (!options.input && !options.output) {
  lineCoder(options.shift, options.action);
} else if (!options.input) {
  saveToFileWithoutInput(options.shift, options.action, options.output);
} else if (!options.output) {
  showToConsoleFromInput(options.shift, options.action, options.input);
} else {
  saveToInputFromOutput(
    options.shift,
    options.action,
    options.input,
    options.output,
  );
}
