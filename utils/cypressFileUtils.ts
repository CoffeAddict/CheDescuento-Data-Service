import path from 'path'
import { logMessage } from './logMessage'

/**
 * Writes JSON data to a file using Cypress.writeFile
 *
 * @export
 * @param {(Cypress.cy & CyEventEmitter)} cy - Cypress object
 * @param {*} data - JSON data to write to file
 * @param {string} version - Name of the file to write
 * @param {string} [directory='/public']
 */
export async function cypressWriteToFile (cy: Cypress.cy & CyEventEmitter, data: scrapItem[], version: string, directory: string = '') {
    try {
        const fileData = {
            version,
            timeCreated: new Date().toISOString(),
            data,
        }

        const filePath = path.join(directory, `${version}.json`)
        const dataString = JSON.stringify(fileData)

        cy.writeFile(filePath, dataString)
    } catch (error) {
        logMessage(error, 'error')
    }
};