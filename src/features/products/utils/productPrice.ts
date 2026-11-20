import type { Product, ProductVariant } from "../product.types";

const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
});

export function formatPrice(value: number) {
    return priceFormatter.format(Number.isFinite(value) ? value : 0);
}

export function getProductPriceRange(product: Product) {
    const prices = product.variants
        .map((variant) => variant.price)
        .filter((price) => Number.isFinite(price));

    if (prices.length === 0) {
        return { min: product.basePrice, max: product.basePrice };
    }

    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    };
}

export function formatPriceRange(product: Product) {
    const { min, max } = getProductPriceRange(product);
    return min === max
        ? formatPrice(min)
        : `${formatPrice(min)} – ${formatPrice(max)}`;
}

export function getProductTotalStock(product: Product) {
    return product.variants.reduce(
        (total, variant) =>
            total + (Number.isFinite(variant.stock) ? variant.stock : 0),
        0
    );
}

export function getProductImage(product: Product) {
    for (const variant of product.variants) {
        const image = variant.images?.find(Boolean);
        if (image) {
            return image;
        }
    }
    return undefined;
}

export function getPrimaryVariant(product: Product): ProductVariant | undefined {
    return product.variants[0];
}
