import logMessage from '../utils/logHandler.js';
import APIService from '../services/service.js';
import writeToFile from '../utils/fileUtils.js';
import formatJSON from '../utils/formatJson.js';

// TODO: change from serverless funciton to normal function, remove response handler, it does not have to respond anything

export default async function fetchData() {
    try {
        !process.env.API_URL ?? logMessage('API_URL is not set in .env file', 'error');

        const service = new APIService(process.env.API_URL);

        const COTOJsonVersion = '0.1.0-coto.json'
        const COTOJson = await service.get(`/${process.env.API_LOOP_COTO_ID}/run`, COTOJsonVersion);

        await writeToFile(formatJSON(COTOJson), COTOJsonVersion);
    } catch (error) {
        logMessage(`Error fetching data from API: ${error.message}`, 'error');
    }
}

fetchData()