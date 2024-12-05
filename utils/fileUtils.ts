import fs, { writeFile } from 'fs'
import path from 'path'
import { logMessage } from './logMessage'

/**
 * Moves a file to a specified directory.
 *
 * @export
 * @param {string} fileName - The file name to move.
 * @param {string} [oldPath=''] - The old directory path.
 * @param {string} [newPath='public'] - The new directory path.
 */
export async function moveToDirectory (fileName: string, oldPath: string = '', newPath: string = 'public') {
    // Join the file name with the old directory path
    const oldFilePath = path.join(oldPath, fileName)

    // Join the file name with the new directory path
    const newFilePath = path.join(newPath, fileName)

    // Check if the old file exists before attempting to move
    if (!fs.existsSync(oldFilePath)) throw new Error(`The file at ${oldFilePath} does not exist.`)

    // Create the new directory if it doesn't exist
    if (!fs.existsSync(newPath)) fs.mkdirSync(newPath, { recursive: true })

    await fs.promises.rename(oldFilePath, newFilePath)
}

/**
 *
 * Writes JSON data to a file
 * @param {*} data - JSON data to write to file
 * @param {*} filename - Name of the file to write
 * @param {string} [directory='/public'] - Directory to write the file to
 */
export async function writeToFile (data: unknown, filename: string, directory: string = '/public') {
    try {
        const filePath = path.join(process.cwd(), directory, `${filename}.json`)
        const dataString = JSON.stringify(data)

        writeFile(filePath, dataString, (err: Error | null) => {
            if (err) logMessage(err, 'error')
            if (!err) logMessage(`File written successfully on ${filePath}`)
        })
    } catch (error) {
        logMessage(error, 'error')
    }
};
