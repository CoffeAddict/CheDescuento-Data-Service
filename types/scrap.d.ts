interface ScrapService {
    version: string
    timeCreated: string
    jobs: ScrapJob[]
}

interface ScrapJob {
    version: string
    timeCreated: string
    data: ScrapItem[]
}

interface ScrapItem {
    discountAmount: string | null
    weekDays: weekDays[]
    tags: string[]
    detail: string[]
}