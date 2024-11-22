import dotenv from 'dotenv';
import { logMessage } from '../utils/logMessage';

dotenv.config();

const useMocks = process.env.API_USE_MOCKS === 'true';
const mocksUrl = process.env.API_MOCKS_URL || 'http://localhost:3000/mocks';

export class APIService {
    baseUrl: string;
    defaultConfig: RequestInit;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.defaultConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    /**
     *
     * Fetches data from the specified endpoint.
     * @param {string} endpoint - The endpoint to fetch data from.
     * @param {(string | null)} [mockFile=null] mockFile - Optional configuration object for fetch data from json file.
     * @return {*}  {Promise<Object>} The fetched data in JSON format.
     * @memberof APIService
     */
    async fetchData(endpoint: string, mockFile: string | null = null) {
        const config = { ...this.defaultConfig };
        const url = useMocks ? `${mocksUrl}/${mockFile}` : `${this.baseUrl}${endpoint}`;

        logMessage(`Fetching data from ${url}`);

        try {
            const response = await fetch(url, config);

            response.ok || logMessage(`${response.statusText}`, 'error')

            const data = await response.json();

            return data as MagicLoopDataRaw;
        } catch (error) {
            logMessage(error, 'error');
            throw error;
        }
    }

    async get(endpoint: string, mockFile: string | null = null) {
        return this.fetchData(endpoint, mockFile);
    }
}