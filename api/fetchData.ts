import { APIService } from '../services/service';
import { writeToFile } from '../utils/fileUtils';
import { formatJSON } from '../utils/formatJson';
import { logMessage } from '../utils/logMessage';
import { scrapData } from '../services/cypressService';

export default async function fetchData() {
    try {
        if (!process.env.API_URL) { logMessage('API_URL is not set in .env file', 'error'); return }

        const service = new APIService(process.env.API_URL);

        //  TODO remove magicloops workflow, replace with cypress

        // const COTOJsonVersion = '0.0.1-coto.json'
        // const COTOJson = await service.get(`/${process.env.API_LOOP_COTO_ID}/run`, COTOJsonVersion);
        // await writeToFile(formatJSON(COTOJson), COTOJsonVersion);

        await scrapData('0.0.1-coto')

    } catch (error) {
        logMessage(error, 'error')
    }
}

fetchData()