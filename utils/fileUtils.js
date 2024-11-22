import { writeFile } from 'fs/promises';
import path from 'path';
import logMessage from './logHandler.js';

/**
 *
 * Writes JSON data to a file
 * @param {*} data - JSON data to write to file
 * @param {*} filename - Name of the file to write
 * @param {string} [directory='/public'] - Directory to write the file to
 */
async function writeToFile (data, filename, directory = '/public') {
  try {
    const filePath = path.join(process.cwd(), directory, filename);
    const dataString = JSON.stringify(data, null, 2);
    const encodingFormat = 'utf-8';

    await writeFile(filePath, dataString, encodingFormat);

    logMessage(`File written successfully on ${filePath}`);

  } catch (error) {
    logMessage(`Error writing file: ${error.message}`, 'error');
  }
};

export default writeToFile;
