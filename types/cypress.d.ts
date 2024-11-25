interface CypressRunResult {
    browserName: string
    browserPath: string
    browserVersion: string
    config: PublicConfig
    cypressVersion: string
    endedTestsAt: dateTimeISO
    osName: string
    osVersion: string
    runs: RunResult[]
    runUrl?: string
    startedTestsAt: dateTimeISO
    totalDuration: number
    totalFailed: number
    totalPassed: number
    totalPending: number
    totalSkipped: number
    totalSuites: number
    totalTests: number
}

interface CypressFailedRunResult {
    status: 'failed'
    failures: number
    message: string
}