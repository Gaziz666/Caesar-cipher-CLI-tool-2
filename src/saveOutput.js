import fs from 'fs';
// import { pipeline } from 'stream';
import readline from 'readline';
import { caesarEncode } from './caesarDecoder.js';

const saveToFileWithoutInput = (shift, actionType, outputFileName) => {
  if (!fs.existsSync(outputFileName)) {
    console.error(
      `The output file is given but doesn't exist, error code: ${process.stderr.fd}`,
    );
    return;
  }
  const ws = fs.createWriteStream(`decoderResult/${outputFileName}`, {
    flags: 'a',
    defaultEncoding: 'utf8',
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: ws,
  });

  process.stdout.write('input text: ');

  rl.on('line', (line) => {
    const result = caesarEncode(line, shift, actionType);

    ws.write(`${actionType} text: ${result}\n`);
    process.stdout.write('see result in output file\n');
    process.stdout.write('input text: ');
  }).on('close', () => {
    console.log('close');
    ws.close();
  });
};

const showToConsoleFromInput = (shift, actionType, inputFileName) => {
  if (!fs.existsSync(`decoderResult/${inputFileName}`)) {
    console.error(
      `The input file is given but doesn't exist, error code: ${process.stderr.fd}`,
    );
    return;
  }
  const ws = fs.createReadStream(`decoderResult/${inputFileName}`, {
    flags: 'r',
    defaultEncoding: 'utf8',
  });

  ws.on('data', (chunk) => {
    console.log('input text: ', chunk.toString());
    const result = caesarEncode(chunk.toString(), shift, actionType);

    process.stdout.write(`${actionType} text: ${result}\n`);
  }).on('close', () => {
    console.log('close');
  });
};

export { saveToFileWithoutInput, showToConsoleFromInput };
