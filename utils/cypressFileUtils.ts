import path from 'path'
import { logMessage } from './logMessage'

/**
 * Writes JSON data to a file using Cypress.writeFile
 *
 * @export
 * @param {(Cypress.cy & CyEventEmitter)} cy - Cypress object
 * @param {*} data - JSON data to write to file
 * @param {string} version - Name of the file to write
 * @param {string} [directory='']
 */
export async function cypressWriteToFile (cy: Cypress.cy & CyEventEmitter, data: ScrapItem[], version: string, client: string,  directory: string = '') {
    try {
        const fileData = {
            version,
            timeCreated: new Date().toISOString(),
            data,
            client,
        } as ScrapJob

        const filePath = path.join(directory, `${version}.json`)
        const dataString = JSON.stringify(fileData)

        cy.writeFile(filePath, dataString)

        logMessage(`File written successfully on ${filePath}`)
    } catch (error) {
        logMessage(error, 'error')
    }
}