import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/app.store";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { useProduct } from "../hooks/useProduct";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductsGrid } from "../components/ProductsGrid";
import { ProductsToolbar } from "../components/ProductsToolbar";
import { ProductFilters } from "../components/ProductFilters";

const Products = () => {
    const products = useSelector((state: RootState) => state.product.products);
    const { handleGetAllProducts, loading } = useProduct();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const controller = useProductFilters(products);
    const hasActiveFilters = controller.activeFilterCount > 0;
    const hasNoResults =
        !loading && controller.filteredProducts.length === 0 && hasActiveFilters;

    useEffect(() => {
        handleGetAllProducts();
    }, [handleGetAllProducts]);

    return (
        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            <div>
                <ProductsToolbar
                    controller={controller}
                    resultCount={controller.filteredProducts.length}
                    onOpenFilters={() => setFiltersOpen(true)}
                />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <aside className="hidden lg:block">
                    <div className="sticky top-16">
                        <ProductFilters controller={controller} />
                    </div>
                </aside>

                <div className="min-w-0">
                    {hasNoResults ? (
                        <Empty className="py-12">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <SearchX />
                                </EmptyMedia>
                                <EmptyTitle className="text-base">
                                    No products match your filters
                                </EmptyTitle>
                                <EmptyDescription>
                                    Try removing a filter or broadening your
                                    search.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent className="flex-row justify-center">
                                <Button
                                    variant="outline"
                                    onClick={controller.clearAll}
                                >
                                    Clear filters
                                </Button>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <ProductsGrid
                            products={controller.filteredProducts}
                            loading={loading}
                        />
                    )}
                </div>
            </div>

            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetContent
                    side="left"
                    className="w-[85vw] sm:max-w-sm"
                >
                    <SheetHeader className="border-b">
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-4 pb-6">
                        <ProductFilters controller={controller} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Products;
