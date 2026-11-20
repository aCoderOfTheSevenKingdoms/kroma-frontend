import { useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "../utils/productPrice";
import type {
    ProductFiltersController,
    ProductSort
} from "../hooks/useProductFilters";

function formatLabel(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function getPriceChipLabel(minPrice: string, maxPrice: string) {
    if (minPrice && maxPrice) {
        return `${formatPrice(Number(minPrice))} – ${formatPrice(Number(maxPrice))}`;
    }
    if (minPrice) {
        return `From ${formatPrice(Number(minPrice))}`;
    }
    return `Up to ${formatPrice(Number(maxPrice))}`;
}

function ProductsToolbar({
    controller,
    resultCount,
    onOpenFilters
}: {
    controller: ProductFiltersController;
    resultCount: number;
    onOpenFilters: () => void;
}) {
    const {
        filters,
        activeFilterCount,
        setQuery,
        setCategory,
        toggleSize,
        toggleColor,
        setInStockOnly,
        setSort,
        clearSearch,
        clearPrice
    } = controller;

    const searchRef = useRef<HTMLInputElement>(null);
    const searchTimeout = useRef<number | null>(null);

    useEffect(() => {
        if (
            searchRef.current &&
            searchRef.current.value !== filters.q
        ) {
            searchRef.current.value = filters.q;
        }
    }, [filters.q]);

    useEffect(() => {
        return () => {
            if (searchTimeout.current !== null) {
                window.clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    const handleSearchChange = (value: string) => {
        if (searchTimeout.current !== null) {
            window.clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = window.setTimeout(() => {
            setQuery(value);
        }, 300);
    };

    const handleClearSearch = () => {
        if (searchTimeout.current !== null) {
            window.clearTimeout(searchTimeout.current);
            searchTimeout.current = null;
        }

        if (searchRef.current) {
            searchRef.current.value = "";
        }

        clearSearch();
    };

    const chips: Array<{ id: string; label: string; onRemove: () => void }> = [];

    filters.categories.forEach((category) => {
        chips.push({
            id: `category-${category}`,
            label: formatLabel(category),
            onRemove: () => setCategory(null)
        });
    });

    filters.sizes.forEach((size) => {
        chips.push({
            id: `size-${size}`,
            label: `Size ${size}`,
            onRemove: () => toggleSize(size)
        });
    });

    filters.colors.forEach((color) => {
        chips.push({
            id: `color-${color}`,
            label: formatLabel(color),
            onRemove: () => toggleColor(color)
        });
    });

    if (filters.minPrice || filters.maxPrice) {
        chips.push({
            id: "price",
            label: getPriceChipLabel(filters.minPrice, filters.maxPrice),
            onRemove: clearPrice
        });
    }

    if (filters.inStockOnly) {
        chips.push({
            id: "stock",
            label: "In stock",
            onRemove: () => setInStockOnly(false)
        });
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-0 flex-1 sm:max-w-xs">
                    <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        ref={searchRef}
                        defaultValue={filters.q}
                        onChange={(event) =>
                            handleSearchChange(event.target.value)
                        }
                        placeholder="Search products"
                        aria-label="Search products"
                        className="pl-8"
                    />
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                        {resultCount} {resultCount === 1 ? "product" : "products"}
                    </span>

                    <select
                        value={filters.sort}
                        onChange={(event) =>
                            setSort(event.target.value as ProductSort)
                        }
                        aria-label="Sort products"
                        className="h-9 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="title">Name A–Z</option>
                    </select>

                    <Button
                        variant="outline"
                        className="lg:hidden"
                        onClick={onOpenFilters}
                    >
                        <SlidersHorizontal />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="rounded-full bg-primary px-1.5 text-[0.65rem] text-primary-foreground">
                                {activeFilterCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {(filters.q || chips.length > 0) && (
                <div className="flex flex-wrap items-center gap-1.5">
                    {filters.q && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                        >
                            &quot;{filters.q}&quot;
                            <X className="size-3" />
                        </button>
                    )}
                    {chips.map((chip) => (
                        <button
                            key={chip.id}
                            type="button"
                            onClick={chip.onRemove}
                            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                        >
                            {chip.label}
                            <X className="size-3" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export { ProductsToolbar };
