import { writeFile, renameSync } from 'fs';
import path from 'path';
import { moveFile } from 'move-file';
import { logMessage } from './logMessage';

/**
 *
 * Writes JSON data to a file
 * @param {*} data - JSON data to write to file
 * @param {*} filename - Name of the file to write
 * @param {string} [directory='/public'] - Directory to write the file to
 */
export async function writeToFile (data: any, filename: string, directory: string = '/public') {
  try {
    const filePath = path.join(process.cwd(), directory, `${filename}.json`);
    const dataString = JSON.stringify(data);

    writeFile(filePath, dataString, (err: Error | null) => {
      err ? logMessage(err, 'error') : logMessage(`File written successfully on ${filePath}`);
    });
  } catch (error) {
    logMessage(error, 'error');
  }
};

/**
 * Moves a file to a specified directory.
 *
 * @export
 * @param {string} [filePath=''] - The file path to move.
 * @param {string} [directory='/public'] - The directory to move the file to.
 */
export async function moveToDirectory (filePath: string = '', directory: string = 'public') {
  // Get the file name from the file path
  const fileName = filePath.replace(/.*\//, '');

  // Join the file name with the directory path
  const newFilePath = path.join(directory, fileName);

  await moveFile(filePath, newFilePath);
}
