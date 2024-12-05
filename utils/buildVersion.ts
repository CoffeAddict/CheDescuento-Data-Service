import fs from 'fs'
import { readFileSync } from 'fs'
import { logMessage } from './logMessage'
import { writeToFile } from './fileUtils'

const directoryPath = './public'

/**
 * Gathers all jobs from the public directory and builds a version.
 *
 * @export
 * @param {string} version - The name of the version to build.
 */
export async function buildVersion(version: string) {
    logMessage(`Building version: ${version}`)

    const versionData: ScrapService = {
        version,
        timeCreated: new Date().toISOString(),
        jobs: [],
    }

    // Read all files in the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) throw err

        const regex: RegExp = new RegExp(/-.*?\./)

        files.forEach((file) => {
            // Check if the file matches the regex (only files with a job version)
            if (regex.test(file)) {
                try {
                    const data = readFileSync(`${directoryPath}/${file}`, 'utf-8')
                    const fileData: ScrapJob = JSON.parse(data)
                    versionData.jobs.push(fileData)
                } catch (error) {
                    logMessage(error, 'error')
                }
            }
        })

        writeToFile(versionData, versionData.version)
    })
}