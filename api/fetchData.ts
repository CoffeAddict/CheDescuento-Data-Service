import { logMessage } from '../utils/logMessage';
import { scrapData } from '../services/cypressService';
import { moveToDirectory } from '../utils/fileUtils';
// import { exec } from 'child_process';

export default async function fetchData() {
    try {
        // exec('ls', (error, stdout, stderr) => {
        //     console.log(`Files: \n${stdout}`);
        // })
        await scrapData('0.0.1-coto')
        moveToDirectory('0.0.1-coto.json')
    } catch (error) {
        logMessage(error, 'error')
    }
}

fetchData()