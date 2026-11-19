import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { type DataTableFeatures } from "../utils/dataTableFeatures";
import type { Product } from "../product.types";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

// Root cause: TanStack Table doesn't resolve dot paths in accessor("variants.sku"). It looks up a literal property named "variants.sku" on the row object, which doesn't exist, so the cell value is undefined and renders blank. No error is thrown because the column simply has no value.
// Since variants is an array, one row can have multiple SKUs, so you don't want a plain scalar accessor anyway. Use a display column (same pattern as your actions column at line 53) and render the array yourself.

// Fix — replace Columns.tsx:14-16
// columnHelper.display({
//     id: "variants",
//     header: "Variants",
//     cell: ({ row }) => (
//         <div className="flex max-w-56 flex-wrap gap-1">
//             {row.original.variants.map((variant) => (
//                 <span
//                     key={variant._id ?? variant.sku}
//                     className="rounded bg-muted px-2 py-0.5 font-mono text-xs"
//                 >
//                     {variant.sku}
//                 </span>
//             ))}
//         </div>
//     )
// }),
// Notes:
// - display columns aren't sortable/filterable, which is fine here (you only sort basePrice and filter title). If you later need SKU sorting/filtering, use accessorFn: (row) => row.variants.map(v => v.sku).join(", ") with id: "variants" and still render the badges from row.original.variants.
// - key={variant._id ?? variant.sku} avoids duplicate-key warnings; SKUs are unique per product now, so this is safe.
// - If you want a fallback for products with no variants, render "—" when row.original.variants.length === 0.
// Verification
// - Run the frontend typecheck/build; the accessor("variants.sku") type error (if any) goes away with display.
// - Open /seller/products and confirm each row shows one badge per variant SKU.
// Want me to apply this edit?

export const Columns = columnHelper.columns([
    columnHelper.accessor("title", {
        header: "Product"
    }),
    columnHelper.display({
        id: "variants",
        header: "Variants",
        cell: ({row}) => (
            <div className="flex max-w-56 flex-wrap gap-1">
                {row.original.variants.length === 0 
                  ? "-"
                  : row.original.variants.map((variant) => (
                        <span
                            key={variant._id ?? variant.sku}
                            className="rounded bg-muted px-2 py-0.5 font-mono text-xs"
                        >
                            {variant.sku}
                        </span>
                    ))
                }
            </div>
        )
    }),
    columnHelper.accessor("category", {
        header: "Category"
    }),
    columnHelper.accessor("basePrice", {
        header: ({column}) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Base Price 
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const basePrice = parseFloat(row.getValue("basePrice"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR"
            }).format(basePrice)

            return <div className="font-medium">{formatted}</div>
        }
    }),
    columnHelper.accessor("isActive", {
        header: "Status",
        cell: ({getValue}) => {
           const isActive = getValue();
           return (
            <span className={isActive ? "text-green-600" : "text-destructive"}>
                {isActive ? "Active" : "Inactive"}
            </span>
           )
        }
    }),
    columnHelper.display({
        id: "actions",
        cell: ({row}) => {
            const product = row.original;

            return (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        render={<Link to={`/product/edit/${product.slug}`} />}
                    >
                        Edit Product
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        render={<Link to={`/product/${product.slug}`} />}
                        disabled
                    >
                        Add Variant
                    </Button>
                </div>
            );
        }
    })
])