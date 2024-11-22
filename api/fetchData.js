import handleResponse from '../utils/responseHandler.js';
import logMessage from '../utils/logHandler.js';
import APIService from '../services/service.js';
import writeToFile from '../utils/fileUtils.js';
import formatJSON from '../utils/formatJson.js';

export default async function handler(req, res) {
    try {
        if (!process.env.API_URL) {
            logMessage('API_URL is not set in .env file', 'error');
            handleResponse(res, 'API_URL is not set in .env file', 500);
            return;
        }

        const service = new APIService(process.env.API_URL);

        const COTOJsonVersion = '0.1.0-coto.json'
        const COTOJson = await service.get(`/${process.env.API_LOOP_COTO_ID}/run`, COTOJsonVersion);

        console.error(COTOJson);

        await writeToFile(formatJSON(COTOJson), COTOJsonVersion);

        handleResponse(res, 'Data fetched and saved successfully.');
    } catch (error) {
        console.error('Error:', error);
        handleResponse(res, 'An error occurred', 500);
    }
}

handler();