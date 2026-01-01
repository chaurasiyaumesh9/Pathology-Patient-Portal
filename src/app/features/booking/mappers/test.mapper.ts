import { Test } from "../models/test.model";

export function mapBackendTestToUI(raw: any): Test {
    return {
        id: +raw.id,
        name: raw.name,
        code: raw.code,
        category: raw.category,
        description: raw.description,
        instructions: raw.instructions,
        original_price: +raw.original_price,
        discounted_price: +raw.discounted_price,
        keywords: raw.keywords
    };
}