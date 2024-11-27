import fs from 'fs'
import path from 'path'

/**
 * Moves a file to a specified directory.
 *
 * @export
 * @param {string} [filePath=''] - The file path to move.
 * @param {string} [directory='/public'] - The directory to move the file to.
 */
export async function moveToDirectory (fileName: string, oldPath: string = '', newPath: string = 'public') {
    // Join the file name with the old directory path
    const oldFilePath = path.join(oldPath, fileName)

    // Join the file name with the new directory path
    const newFilePath = path.join(newPath, fileName)

    // Create the new directory if it doesn't exist
    if (!fs.existsSync(newPath)) fs.mkdirSync(newPath, { recursive: true })

    await fs.promises.rename(oldFilePath, newFilePath)
}
