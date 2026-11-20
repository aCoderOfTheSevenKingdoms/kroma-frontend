import type { Product } from "../product.types";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

const gridClassName = "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4";

type ProductsGridProps = {
    products: Product[];
    loading?: boolean;
    emptyMessage?: string;
};

function ProductsGrid({
    products,
    loading = false,
    emptyMessage = "No products available yet."
}: ProductsGridProps) {
    if (loading && products.length === 0) {
        return (
            <div className={gridClassName}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <p className="py-12 text-center text-sm text-muted-foreground">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className={gridClassName}>
            {products.map((product) => (
                <ProductCard
                    key={product._id ?? product.slug}
                    product={product}
                />
            ))}
        </div>
    );
}

export { ProductsGrid };
