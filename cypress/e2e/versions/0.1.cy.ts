/// <reference types="cypress" />

import { cypressWriteToFile } from '../../../utils/cypressFileUtils'

const scrapperVersion = '0.1'

// TODO remove cypress task and read data from json files created on public folder
// TODO also delete the public folder jsons on process init

describe(`Build Version - v${scrapperVersion}`, () => {
    it('Scrapes discounts from source URL', () => {
        cy.task('getServiceData')
            .then(scrapService => {
                cypressWriteToFile(cy, (scrapService as ScrapService), scrapperVersion)
            })
    })
})
