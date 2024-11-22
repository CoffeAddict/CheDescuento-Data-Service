/**
 *
 * Formats JSON data to prevent errors
 * @param {*} json - JSON data to format
 * @return {*} JSON data formatted
 */
function formatJSON(json) {

    const mappedDiscounts = json.message?.discounts?.map((discount) => {
        return {
            shopName: discount.shop_name || null,
            discountAmount: discount.discount_amount || null,
            days: discount.days || [],
            bankTags: filterBankTags(discount.bank_tags || []),
            tags: filterTags(discount.tags || []),
            details: discount.details.toLowerCase() || null,
        }
    }) || [];

    const mappedJson = {
        version: json.message.version || null,
        discounts: mappedDiscounts,
    }

    return mappedJson;
}

function filterBankTags(bankTags) {
    return bankTags.filter((tag) => ![].includes(tag));
}

function filterTags(tags) {
    return tags.filter((tag) => ![].includes(tag));
}

export default formatJSON;