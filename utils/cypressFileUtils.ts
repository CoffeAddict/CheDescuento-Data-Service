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
export async function cypressWriteToFile (cy: Cypress.cy & CyEventEmitter, data: ScrapItem[] | ScrapService, version: string, directory: string = '') {
    try {
        const fileData = isScrapService(data)
            ? data
            : {
                version,
                timeCreated: new Date().toISOString(),
                data,
            } as ScrapJob

        const filePath = path.join(directory, `${version}.json`)
        const dataString = JSON.stringify(fileData)

        cy.writeFile(filePath, dataString)

        if (!isScrapService(data)) cy.task('saveJobData', fileData)
    } catch (error) {
        logMessage(error, 'error')
    }
};

// TypeGuard for ScrapService
function isScrapService(data: unknown): data is ScrapService {
    return (data as ScrapService).jobs !== undefined
}