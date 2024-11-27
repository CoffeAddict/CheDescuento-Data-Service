import { logMessage } from '../utils/logMessage'
import { scrapData } from '../services/cypressService'
import { moveToDirectory } from '../utils/fileUtils'

const jobsList = [
    '0.0.2-coto',
]

export default async function fetchData() {
    try {
        jobsList.forEach((job) => {
            scrapData(job)
                .then(() => moveToDirectory(`${job}.json`))
        })
    } catch (error) {
        console.log(error)
        logMessage(error, 'error')
    }
}

fetchData()