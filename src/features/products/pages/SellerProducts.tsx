import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "@/app/app.store";
import { useProduct } from "../hooks/useProduct"
import { DataTable } from "@/components/ui/data-table";
import { Columns } from "../components/Columns";
import { EmptyState } from "../components/EmptyState";

const SellerProducts = () => {
    const { handleGetSellerProducts } = useProduct();
    const sellerProducts = useSelector((state: RootState) => state.product.sellerProducts);
    const products = useMemo(() => Object.values(sellerProducts), [sellerProducts]); 

    useEffect(() => {
        handleGetSellerProducts();
    }, [handleGetSellerProducts])

    // if(products.length === 0) {
    //   return (
    //     <EmptyState/>
    //   )
    // }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold lg:text-xl">Products</h1>
        <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
          Manage your catalogue and add new variants to existing products.
        </p>
      </div>
      <div className="mt-6">
        {products.length === 0 
          ? <EmptyState 
              redirectPath={`/product/create`}  
              title={`No Products Yet`}
              description={`You haven&apos;t created any products yet. Get started by creating
          your first product.`}
            /> 
          : <DataTable columns={Columns} data={products} />}
      </div>
    </div>
  )
}

export default SellerProducts