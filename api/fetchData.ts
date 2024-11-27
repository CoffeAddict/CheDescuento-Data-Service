import { logMessage } from '../utils/logMessage'
import { scrapData } from '../services/cypressService'
import { moveToDirectory } from '../utils/fileUtils'

export default async function fetchData() {
    try {
        scrapData('0.0.1-coto')
            .then(() => moveToDirectory('0.0.1-coto.json'))
    } catch (error) {
        console.log(error)
        logMessage(error, 'error')
    }
}

fetchData()