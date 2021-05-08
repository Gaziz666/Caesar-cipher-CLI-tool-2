import readLine from 'readline';
import { caesarEncode } from './caesarDecoder.js';

export const lineCoder = (shift, actionType, failParams) => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  process.stdout.write('input text: ');

  rl.on('line', (line) => {
    const result = caesarEncode(line, shift, actionType);

    process.stdout.write(`${actionType} text: ${result}\n`);

    process.stdout.write('input text: ');
  }).on('close', () => {
    console.log('\nexit');
    process.exit(0);
  });
};
