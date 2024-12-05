import { logMessage } from '../utils/logMessage'
import { scrapData } from '../services/cypressService'
import { moveToDirectory } from '../utils/fileUtils'
import { buildVersion } from '../utils/buildVersion'

const scrapperVersion = '0.1'

const jobsList = [
    '0.0.2-coto',
    // TODO Add uala scrap job
]

export default async function fetchData() {
    try {
        Promise.all(
            jobsList.map(async (job) => scrapData(job)
                .then(() => moveToDirectory(`${job}.json`))),
        ).then(() => buildVersion(scrapperVersion))
    } catch (error) {
        console.log(error)
        logMessage(error, 'error')
    }
}

fetchData()