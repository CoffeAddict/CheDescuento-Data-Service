/// <reference types="cypress" />

import { cypressWriteToFile } from '../../../utils/cypressFileUtils'
import { matchDictionaryWords } from '../../../utils/tags'

const scrapperVersion = '0.0.2-coto'
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
                    detail: getDetail($el),
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

    return tags.filter((tag) => !skipTags.some(skipTag => tag.includes(skipTag)))
}

function getDetail (el: JQuery<HTMLElement>): scrapItem['detail'] {
    const detailsEl = el.find('.alt-font.text-medium-gray.text-extra-small')

    const detailHTML = detailsEl.html()

    // Remove HTML tags using a regular expression
    const cleanText = detailHTML.replace(/<[^>]*>/g, '');

    // Add a space between sentences
    let updatedString = cleanText.replace(/(\.)(?=[a-zA-Z])/g, '$1 ').trim().toLowerCase();

    const skipPhrases: string[] = [
        'ver legal.',
    ]

    // Filter phrases from the string
    skipPhrases.forEach((phrase) => {
        if (updatedString.includes(phrase)) updatedString = updatedString.replace(phrase, '')
    })

    const detailArray = updatedString
        // Split the string by sentences
        .split(/(?<=\.)\s/)
        // Filter out empty sentences
        .filter(phrase => phrase.length)
        // Remove the last character of each sentence
        .map(phrase => phrase.slice(0, -1));

    return detailArray
}

enum weekDays {
    'day_1' = 'monday',
    'day_2' = 'tuesday',
    'day_3' = 'wednesday',
    'day_4' = 'thursday',
    'day_5' = 'friday',
    'day_6' = 'sunday',
}
