import { writeFile, renameSync } from 'fs';
import path from 'path';
import { logMessage } from './logMessage';

/**
 * Writes JSON data to a file using Cypress.writeFile
 *
 * @export
 * @param {(Cypress.cy & CyEventEmitter)} cy - Cypress object
 * @param {*} data - JSON data to write to file
 * @param {string} filename - Name of the file to write
 * @param {string} [directory='/public']
 */
export async function cypressWriteToFile (cy: Cypress.cy & CyEventEmitter, data: any, filename: string, directory: string = '') {
  try {
    const filePath = path.join(directory, `${filename}.json`);
    const dataString = JSON.stringify(data);

    cy.writeFile(filePath, dataString);
  } catch (error) {
    logMessage(error, 'error');
  }
};