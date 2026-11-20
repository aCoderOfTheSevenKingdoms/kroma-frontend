import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Product } from "../product.types";
import { getProductPriceRange, getProductTotalStock } from "../utils/productPrice";

export type ProductSort = "newest" | "price-asc" | "price-desc" | "title";

export type ProductFilterState = {
    q: string;
    categories: string[];
    sizes: string[];
    colors: string[];
    minPrice: string;
    maxPrice: string;
    inStockOnly: boolean;
    sort: ProductSort;
};

export type ProductFacets = {
    categories: string[];
    sizes: string[];
    colors: string[];
    minPrice: number;
    maxPrice: number;
};

const FILTER_KEYS = [
    "q",
    "category",
    "size",
    "color",
    "min",
    "max",
    "stock",
    "sort"
] as const;

const SORT_OPTIONS: ProductSort[] = ["newest", "price-asc", "price-desc", "title"];

function parseList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function isProductSort(value: string | null): value is ProductSort {
    return value !== null && SORT_OPTIONS.includes(value as ProductSort);
}

function uniqueSorted(values: string[]) {
    return Array.from(new Set(values)).sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
    );
}

function matchesQuery(product: Product, query: string) {
    const haystack = [
        product.title,
        product.description,
        product.category,
        ...product.variants.flatMap((variant) => [variant.color, variant.size])
    ]
        .join(" ")
        .toLowerCase();

    return haystack.includes(query);
}

function sortProducts(products: Product[], sort: ProductSort) {
    const sorted = [...products];

    switch (sort) {
        case "price-asc":
            return sorted.sort(
                (a, b) => getProductPriceRange(a).min - getProductPriceRange(b).min
            );
        case "price-desc":
            return sorted.sort(
                (a, b) => getProductPriceRange(b).max - getProductPriceRange(a).max
            );
        case "title":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case "newest":
        default:
            return sorted.sort((a, b) => {
                const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
                const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
                return bTime - aTime;
            });
    }
}

export function useProductFilters(products: Product[]) {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo<ProductFilterState>(() => {
        const sort = searchParams.get("sort");

        return {
            q: searchParams.get("q") ?? "",
            categories: parseList(searchParams.get("category")),
            sizes: parseList(searchParams.get("size")),
            colors: parseList(searchParams.get("color")),
            minPrice: searchParams.get("min") ?? "",
            maxPrice: searchParams.get("max") ?? "",
            inStockOnly: searchParams.get("stock") === "in",
            sort: isProductSort(sort) ? sort : "newest"
        };
    }, [searchParams]);

    const updateParams = useCallback(
        (mutate: (params: URLSearchParams) => void) => {
            setSearchParams(
                (current) => {
                    const next = new URLSearchParams(current);
                    mutate(next);
                    return next;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );

    const setQuery = useCallback(
        (value: string) => {
            updateParams((params) => {
                const trimmed = value.trim();
                if (trimmed) {
                    params.set("q", trimmed);
                } else {
                    params.delete("q");
                }
            });
        },
        [updateParams]
    );

    const setCategory = useCallback(
        (category: string | null) => {
            updateParams((params) => {
                if (category) {
                    params.set("category", category);
                } else {
                    params.delete("category");
                }
            });
        },
        [updateParams]
    );

    const toggleListValue = useCallback(
        (key: "size" | "color", value: string) => {
            updateParams((params) => {
                const current = parseList(params.get(key));
                const next = current.includes(value)
                    ? current.filter((item) => item !== value)
                    : [...current, value];

                if (next.length > 0) {
                    params.set(key, next.join(","));
                } else {
                    params.delete(key);
                }
            });
        },
        [updateParams]
    );

    const toggleSize = useCallback(
        (size: string) => toggleListValue("size", size),
        [toggleListValue]
    );

    const toggleColor = useCallback(
        (color: string) => toggleListValue("color", color),
        [toggleListValue]
    );

    const setMinPrice = useCallback(
        (value: string) => {
            updateParams((params) => {
                if (value) {
                    params.set("min", value);
                } else {
                    params.delete("min");
                }
            });
        },
        [updateParams]
    );

    const setMaxPrice = useCallback(
        (value: string) => {
            updateParams((params) => {
                if (value) {
                    params.set("max", value);
                } else {
                    params.delete("max");
                }
            });
        },
        [updateParams]
    );

    const setInStockOnly = useCallback(
        (value: boolean) => {
            updateParams((params) => {
                if (value) {
                    params.set("stock", "in");
                } else {
                    params.delete("stock");
                }
            });
        },
        [updateParams]
    );

    const setSort = useCallback(
        (value: ProductSort) => {
            updateParams((params) => {
                if (value === "newest") {
                    params.delete("sort");
                } else {
                    params.set("sort", value);
                }
            });
        },
        [updateParams]
    );

    const clearSearch = useCallback(() => {
        updateParams((params) => params.delete("q"));
    }, [updateParams]);

    const clearPrice = useCallback(() => {
        updateParams((params) => {
            params.delete("min");
            params.delete("max");
        });
    }, [updateParams]);

    const clearAll = useCallback(() => {
        updateParams((params) => {
            FILTER_KEYS.forEach((key) => params.delete(key));
        });
    }, [updateParams]);

    const facets = useMemo<ProductFacets>(() => {
        const activeProducts = products.filter(
            (product) => product.isActive !== false && !product.isDeleted
        );

        const ranges = activeProducts.map(getProductPriceRange);

        return {
            categories: uniqueSorted(activeProducts.map((product) => product.category)),
            sizes: uniqueSorted(
                activeProducts.flatMap((product) =>
                    product.variants.map((variant) => variant.size)
                )
            ),
            colors: uniqueSorted(
                activeProducts.flatMap((product) =>
                    product.variants.map((variant) => variant.color)
                )
            ),
            minPrice: ranges.length
                ? Math.floor(Math.min(...ranges.map((range) => range.min)))
                : 0,
            maxPrice: ranges.length
                ? Math.ceil(Math.max(...ranges.map((range) => range.max)))
                : 0
        };
    }, [products]);

    const filteredProducts = useMemo(() => {
        const query = filters.q.trim().toLowerCase();
        const minPrice = filters.minPrice === "" ? null : Number(filters.minPrice);
        const maxPrice = filters.maxPrice === "" ? null : Number(filters.maxPrice);

        const filtered = products
            .filter((product) => product.isActive !== false && !product.isDeleted)
            .filter((product) => !query || matchesQuery(product, query))
            .filter(
                (product) =>
                    filters.categories.length === 0 ||
                    filters.categories.includes(product.category)
            )
            .filter(
                (product) =>
                    filters.sizes.length === 0 ||
                    product.variants.some((variant) =>
                        filters.sizes.includes(variant.size)
                    )
            )
            .filter(
                (product) =>
                    filters.colors.length === 0 ||
                    product.variants.some((variant) =>
                        filters.colors.includes(variant.color)
                    )
            )
            .filter((product) => {
                const range = getProductPriceRange(product);

                if (minPrice !== null && !Number.isNaN(minPrice) && range.max < minPrice) {
                    return false;
                }

                if (maxPrice !== null && !Number.isNaN(maxPrice) && range.min > maxPrice) {
                    return false;
                }

                return true;
            })
            .filter(
                (product) =>
                    !filters.inStockOnly || getProductTotalStock(product) > 0
            );

        return sortProducts(filtered, filters.sort);
    }, [products, filters]);

    const activeFilterCount =
        (filters.q ? 1 : 0) +
        filters.categories.length +
        filters.sizes.length +
        filters.colors.length +
        (filters.minPrice || filters.maxPrice ? 1 : 0) +
        (filters.inStockOnly ? 1 : 0);

    return {
        filters,
        facets,
        filteredProducts,
        activeFilterCount,
        setQuery,
        setCategory,
        toggleSize,
        toggleColor,
        setMinPrice,
        setMaxPrice,
        setInStockOnly,
        setSort,
        clearSearch,
        clearPrice,
        clearAll
    };
}

export type ProductFiltersController = ReturnType<typeof useProductFilters>;
