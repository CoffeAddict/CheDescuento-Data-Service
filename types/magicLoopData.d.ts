type MagicLoopData = {
    version: string | null;
    discounts: {
        shopName: string | null;
        discountAmount: string | null;
        days: string[];
        bankTags: string[];
        tags: string[];
        details: string | null;
    }[];
};

type MagicLoopDataRaw = {
    version: string | null;
    discounts: {
        shop_name: string | null;
        discount_amount: string | null;
        days: string[];
        bank_tags: string[];
        tags: string[];
        details: string | null;
    }[];
};