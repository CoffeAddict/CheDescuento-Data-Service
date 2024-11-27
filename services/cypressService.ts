import cypress from 'cypress';
import { logMessage } from '../utils/logMessage';

const config = {
    headless: true,
}

/**
 * Scrap data from a specified job version.
 *
 * @export
 * @param {string} jobVersion - The job version to scrap data from (example: '0.0.1-coto').
 */
export async function scrapData (jobVersion: string) {
    await cypress.run({
        ...config,
        spec: `cypress/e2e/scrap-jobs/${jobVersion}.cy.ts`,
    }).then((result) => {
        const isSuccess = !isCypressFailedRunResult(result);

        if (isSuccess) logMessage(`Scrap data successfully - ${jobVersion}`, 'log');
        if (!isSuccess) logMessage(result.message, 'error');

        return isSuccess
    });
}

// TypeGuard for CypressFailedRunResult
function isCypressFailedRunResult(result: unknown): result is CypressFailedRunResult {
    return (result as CypressFailedRunResult).failures !== undefined;
}