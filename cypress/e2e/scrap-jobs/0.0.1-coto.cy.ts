/// <reference types="cypress" />

import { cypressWriteToFile } from '../../../utils/cypressFileUtils'
import { matchDictionaryWords } from '../../../utils/tags'

// TODO: add linter to project

const scrapperVersion = '0.0.1-coto'
const sourceURL = 'https://www.coto.com.ar/descuentos/index.asp'

describe('Web Scrapping with Cypress', () => {
    it('Scrapes discounts from source URL', () => {
        cy.visit(sourceURL)

        const scrapData: scrapItem[] = []

        cy.get('#discounts .grid-item')
            .should('be.visible')
            .each((el) => {
                const $el = Cypress.$(el) // Wrap with jQuery

                const scrapItem:scrapItem  = {
                    discountAmount: getDiscountAmount($el),
                    weekDays: getWeekDays($el),
                    tags: getTags($el),
                }

                let skipItem: boolean = false

                const skipDiscounts: scrapItem['discountAmount'][] = [
                    'consultá aquí periódicamente los próximos descuentos del fin de semana.',
                ]

                skipItem = skipDiscounts.includes(scrapItem.discountAmount)

                if (!skipItem) scrapData.push(scrapItem)
            }).then(() => {
                cypressWriteToFile(cy, scrapData, scrapperVersion)
            })
    })
})

/**
 * Get discount amount from element HTML
 *
 * @param {JQuery<HTMLElement>} el
 * @return {*}  {scrapItem['discountAmount']}
 */
function getDiscountAmount (el: JQuery<HTMLElement>): scrapItem['discountAmount'] {
    let discountAmount = el.find('p:nth-child(2)').text() || null

    if (discountAmount) discountAmount = discountAmount.trim().toLowerCase()

    return discountAmount
}

/**
 * Get days of the week that the discount applies
 *
 * @param {JQuery<HTMLElement>} el
 * @return {*}  {scrapItem['weekDays']}
 */
function getWeekDays(el: JQuery<HTMLElement>): scrapItem['weekDays'] {
    const classListString = el.attr('class') || ''
    const classList = classListString.split(' ')

    const weekDaysList: weekDays[] = []

    // Add days that correspond to the classes and match with weekDays
    classList.forEach((className) => {
        if (className.includes('day')) weekDaysList.push(weekDays[className as keyof typeof weekDays])
    })

    return weekDaysList
}

/**
 * Get tags that match with the tag dictionary
 *
 * @param {JQuery<HTMLElement>} el
 * @return {*}  {scrapItem['tags']}
 */
function getTags (el: JQuery<HTMLElement>): scrapItem['tags'] {
    const elText = el.html()

    const skipTags: scrapItem['tags'] = []

    const tags = matchDictionaryWords(elText)

    return tags.filter((tag) => !skipTags.includes(tag))
}

enum weekDays {
    'day_1' = 'monday',
    'day_2' = 'tuesday',
    'day_3' = 'wednesday',
    'day_4' = 'thursday',
    'day_5' = 'friday',
    'day_6' = 'sunday',
}

// TODO generate a global scrapitem interface
export interface scrapItem {
    discountAmount: string | null
    weekDays: weekDays[],
    tags: string[],
}
