
/**
 *
 * Formats JSON data to prevent errors
 * @param {MagicLoopData} json
 * @return {*}  {MagicLoopData} JSON data formatted
 */
export function formatJSON(json: MagicLoopDataRaw) {
    const mappedDiscounts = json?.discounts?.map((discount) => {
        return {
            shopName: discount.shop_name || null,
            discountAmount: discount.discount_amount || null,
            days: discount.days || [],
            bankTags: filterBankTags(discount.bank_tags || []),
            tags: filterTags(discount.tags || []),
            details: discount.details?.toLowerCase() || null,
        }
    }) || [];

    const mappedJson = {
        version: json?.version || null,
        discounts: mappedDiscounts,
    }

    return mappedJson;
}

function filterBankTags(bankTags: string[]) {
    const filterList: string[] = []
    return bankTags.filter((tag) => !filterList.includes(tag));
}

function filterTags(tags: string[]) {
    const filterList: string[] = []
    return tags.filter((tag) => !filterList.includes(tag));
}