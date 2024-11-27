import { defineConfig } from 'cypress'

const scrapService: { version: string, timeCreated: string, jobs: unknown[] } = {
    version: '0.1',
    timeCreated: new Date().toISOString(),
    jobs: [],
}

export default defineConfig({
    screenshotOnRunFailure: false,
    video: false,
    defaultBrowser: 'chrome',
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                saveJobData(data) {
                    scrapService.jobs.push(data)
                    return data
                },
                getServiceData() {
                    return scrapService
                },
            })

            return config
        },
    },
})