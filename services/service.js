import logMessage from '../utils/logHandler';

require('dotenv').config();

const useMocks = process.env.API_USE_MOCKS === 'true';
const mocksUrl = process.env.API_MOCKS_URL || 'http://localhost:3000/mocks';

class APIService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.defaultConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    /**
     * Fetches data from the specified endpoint.
     *
     * @param {string} endpoint - The endpoint to fetch data from.
     * @param {string} mockFile - Optional configuration object for fetch data from json file.
     * @return {Object} The fetched data in JSON format.
     * @memberof ApiService
     */
    async fetchData(endpoint, mockFile = null) {
        const config = { ...this.defaultConfig };
        const url = useMocks ? `${mocksUrl}/${mockFile}` : `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, config);

            if (!response.ok) logMessage(`${response.statusText}`, 'error');
            const data = await response.json();

            return data;
        } catch (error) {
            logMessage('Fetch error', 'error');
            throw error;
        }
    }

    async get(endpoint, mockFile = null) {
        return this.fetchData(endpoint, mockFile);
    }
}

export default APIService;