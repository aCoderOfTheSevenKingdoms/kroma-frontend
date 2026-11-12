import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "../utils/dataTableFeatures";
import type { Product } from "../product.types";
import { MoreHorizontal } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const Columns = columnHelper.columns([
    columnHelper.accessor("title", {
        header: "Title"
    }),
    columnHelper.accessor("category", {
        header: "Category"
    }),
    columnHelper.accessor("basePrice", {
        header: () => <div className="text-right">Base Price</div>,
        cell: ({row}) => {
            const basePrice = parseFloat(row.getValue("basePrice"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR"
            }).format(basePrice)

            return <div className="text-right font-medium">{formatted}</div>
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
    })
])