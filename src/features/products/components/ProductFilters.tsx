import { useId, type ReactNode } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { ProductFiltersController } from "../hooks/useProductFilters";

function formatLabel(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function FilterSection({
    title,
    children
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-wide uppercase">
                {title}
            </h3>
            {children}
        </div>
    );
}

function FilterPill({
    active,
    onClick,
    children
}: {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
        >
            {children}
        </button>
    );
}

function ProductFilters({
    controller,
    className
}: {
    controller: ProductFiltersController;
    className?: string;
}) {
    const priceInputId = useId();

    const {
        filters,
        facets,
        activeFilterCount,
        setCategory,
        toggleSize,
        toggleColor,
        setMinPrice,
        setMaxPrice,
        setInStockOnly,
        clearAll
    } = controller;

    return (
        <div className={cn("flex flex-col gap-5", className)}>
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Filters</h2>
                {activeFilterCount > 0 && (
                    <Button variant="ghost" size="xs" onClick={clearAll}>
                        Clear all
                    </Button>
                )}
            </div>

            <FilterSection title="Category">
                <div className="flex flex-wrap gap-1.5">
                    <FilterPill
                        active={filters.categories.length === 0}
                        onClick={() => setCategory(null)}
                    >
                        All
                    </FilterPill>
                    {facets.categories.map((category) => (
                        <FilterPill
                            key={category}
                            active={filters.categories.includes(category)}
                            onClick={() => setCategory(category)}
                        >
                            {formatLabel(category)}
                        </FilterPill>
                    ))}
                </div>
            </FilterSection>

            <Separator />

            <FilterSection title="Size">
                {facets.sizes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {facets.sizes.map((size) => (
                            <FilterPill
                                key={size}
                                active={filters.sizes.includes(size)}
                                onClick={() => toggleSize(size)}
                            >
                                {size}
                            </FilterPill>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        No sizes available.
                    </p>
                )}
            </FilterSection>

            <Separator />

            <FilterSection title="Color">
                {facets.colors.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {facets.colors.map((color) => (
                            <FilterPill
                                key={color}
                                active={filters.colors.includes(color)}
                                onClick={() => toggleColor(color)}
                            >
                                {formatLabel(color)}
                            </FilterPill>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        No colors available.
                    </p>
                )}
            </FilterSection>

            <Separator />

            <FilterSection title="Price">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor={`${priceInputId}-min-price`}
                            className="text-xs font-normal text-muted-foreground"
                        >
                            Min
                        </Label>
                        <Input
                            id={`${priceInputId}-min-price`}
                            type="number"
                            min={0}
                            inputMode="numeric"
                            value={filters.minPrice}
                            placeholder={String(facets.minPrice)}
                            onChange={(event) => setMinPrice(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor={`${priceInputId}-max-price`}
                            className="text-xs font-normal text-muted-foreground"
                        >
                            Max
                        </Label>
                        <Input
                            id={`${priceInputId}-max-price`}
                            type="number"
                            min={0}
                            inputMode="numeric"
                            value={filters.maxPrice}
                            placeholder={String(facets.maxPrice)}
                            onChange={(event) => setMaxPrice(event.target.value)}
                        />
                    </div>
                </div>
            </FilterSection>

            <Separator />

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    className="size-4 accent-foreground"
                    checked={filters.inStockOnly}
                    onChange={(event) => setInStockOnly(event.target.checked)}
                />
                In stock only
            </label>
        </div>
    );
}

export { ProductFilters };
