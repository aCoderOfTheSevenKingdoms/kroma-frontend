import { Link } from "react-router";
import { ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "../product.types";
import {
    formatPriceRange,
    getPrimaryVariant,
    getProductImage,
    getProductTotalStock
} from "../utils/productPrice";

function ProductCard({ product }: { product: Product }) {
    const image = getProductImage(product);
    const stock = getProductTotalStock(product);
    const variant = getPrimaryVariant(product);
    const productHref = `/products/${encodeURIComponent(product.slug)}`;

    const meta = product.variants.length > 1
        ? `${product.variants.length} options`
        : variant
            ? `${variant.color} · ${variant.size}`
            : "No variants";

    return (
        <Card
            size="sm"
            className="group/card gap-0 overflow-hidden pt-0 pb-0 transition-shadow hover:shadow-md"
        >
            <Link
                to={productHref}
                className="block overflow-hidden bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
                <div className="relative h-48 aspect-[3/4] w-full">
                    {image ? (
                        <img
                            src={image}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <ImageOff className="size-8" />
                        </div>
                    )}

                    {stock === 0 && (
                        <span className="absolute top-2 left-2 rounded-full bg-background/90 px-2 py-0.5 text-[0.65rem] font-medium">
                            Out of stock
                        </span>
                    )}

                    {stock > 0 && stock <= 5 && (
                        <span className="absolute top-2 right-2 rounded-full bg-background/90 px-2 py-0.5 text-[0.65rem] font-medium text-destructive">
                            Only {stock} left
                        </span>
                    )}
                </div>
            </Link>

            <div className="flex flex-1 flex-col gap-1 p-2.5">
                <Link
                    to={productHref}
                    className="line-clamp-1 text-sm font-medium hover:underline"
                >
                    {product.title}
                </Link>
                <p className="text-sm font-semibold">
                    {formatPriceRange(product)}
                </p>
                <p className="truncate text-xs text-muted-foreground">{meta}</p>

                <Button
                    size="sm"
                    variant="outline"
                    className="mt-1.5 w-full"
                    render={<Link to={productHref} />}
                >
                    View product
                </Button>
            </div>
        </Card>
    );
}

export { ProductCard };
