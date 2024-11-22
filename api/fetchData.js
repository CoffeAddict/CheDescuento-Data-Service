import handleResponse from '../utils/responseHandler';
import logMessage from '../utils/logHandler';
import APIService from '../services/service';

export default async function handler(req, res) {
    try {
        if (!process.env.API_URL) {
            logMessage('API_URL is not set in .env file', 'error');
            handleResponse(res, 'API_URL is not set in .env file', 500);
            return;
        }

        const service = new APIService(process.env.API_URL);

        const COTOJson = await service.get(`/${process.env.API_LOOP_COTO_ID}/run`, '0.1.0-coto.json');
        handleResponse(res, COTOJson);

        // TODO: format data to prevent errors
        // TODO: save data to file

        // handleResponse(res, 'Data fetched and saved successfully.');
    } catch (error) {
        console.error('Error:', error);
        handleResponse(res, 'An error occurred', 500);
    }
}