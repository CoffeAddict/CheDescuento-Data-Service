import { logMessage } from '../utils/logMessage'
import { buildVersion, scrapData } from '../services/cypressService'
import { moveToDirectory } from '../utils/fileUtils'

const scrapperVersion = '0.1'

const jobsList = [
    '0.0.2-coto',
    // TODO Add uala scrap job
]

export default async function fetchData() {
    try {
        Promise.all(
            jobsList.map(async (job) =>
                scrapData(job).then(() => moveToDirectory(`${job}.json`)),
            ),
        ).then(() => buildVersion(scrapperVersion).then(() => moveToDirectory(`${scrapperVersion}.json`)))
    } catch (error) {
        console.log(error)
        logMessage(error, 'error')
    }
}

fetchData()