import fs from 'fs';
import { pipeline, Transform } from 'stream';
import { promisify } from 'util';
import readline from 'readline';
import { caesarEncode } from './caesarDecoder.js';

const fileType = {
  OUTPUT: 0,
  INPUT: 1,
};

const checkFilIsExist = (file, type) => {
  if (!fs.existsSync(`decoderResult/${file}`)) {
    if (type === fileType.OUTPUT)
      console.error(
        `The output file is given but doesn't exist, error code: ${process.stderr.fd}`,
      );
    if (type === fileType.INPUT) {
      console.error(
        `The input file is given but doesn't exist, error code: ${process.stderr.fd}`,
      );
    }
  } else return true;
};

const saveToFileWithoutInput = (shift, actionType, outputFileName) => {
  if (!checkFilIsExist(outputFileName, fileType.OUTPUT)) {
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
  if (!checkFilIsExist(inputFileName, fileType.INPUT)) {
    return;
  }

  const rs = fs.createReadStream(`decoderResult/${inputFileName}`, {
    flags: 'r',
    defaultEncoding: 'utf8',
  });

  rs.on('data', (chunk) => {
    console.log('input text: ', chunk.toString());
    const result = caesarEncode(chunk.toString(), shift, actionType);

    process.stdout.write(`${actionType} text: ${result}\n`);
  }).on('close', () => {
    console.log('close');
  });
};

const saveToInputFromOutput = (
  shift,
  actionType,
  inputFileName,
  outputFileName,
) => {
  if (!checkFilIsExist(inputFileName, fileType.INPUT)) {
    return;
  }
  if (!checkFilIsExist(outputFileName, fileType.OUTPUT)) {
    return;
  }

  const ws = fs.createWriteStream(`decoderResult/${outputFileName}`, {
    flags: 'a',
    defaultEncoding: 'utf8',
  });

  const rs = fs.createReadStream(`decoderResult/${inputFileName}`, {
    flags: 'r',
    defaultEncoding: 'utf8',
  });

  const pipelineAsync = promisify(pipeline);

  const transform = () => {
    return new Transform({
      transform(chunk, encoding, cb) {
        let result = caesarEncode(chunk.toString(), shift, actionType);
        this.push(result + '\n');
        cb();
      },
    });
  };

  const run = async () => {
    try {
      await pipelineAsync(rs, transform(), ws);
      console.log('pipeline accomplished.');
    } catch (err) {
      console.error('pipeline failed with error:', err);
    }
  };
  run();
};

export {
  saveToFileWithoutInput,
  showToConsoleFromInput,
  saveToInputFromOutput,
};
