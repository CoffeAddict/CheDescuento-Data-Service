import { writeFile } from 'fs';
import path from 'path';
import { logMessage } from './logMessage';

/**
 *
 * Writes JSON data to a file
 * @param {*} data - JSON data to write to file
 * @param {*} filename - Name of the file to write
 * @param {string} [directory='/public'] - Directory to write the file to
 */
export async function writeToFile (data: MagicLoopData, filename: string, directory: string = '/public') {
  try {
    const filePath = path.join(process.cwd(), directory, filename);
    const dataString = JSON.stringify(data, null, 2);

    writeFile(filePath, dataString, (err: Error | null) => {
      err ? logMessage(err, 'error') : logMessage(`File written successfully on ${filePath}`);
    });
  } catch (error) {
    logMessage(error, 'error');
  }
};
