import { useSelector } from "react-redux";
import type { RootState } from "@/app/app.store";

type CreateEditProductProps = {
  slug?: string;
};

const CreateEditProduct = ({ slug }: CreateEditProductProps) => {
  const product = useSelector((state: RootState) =>
    slug ? state.product.sellerProducts[slug] : undefined
  );

  const isEdit = Boolean(slug);

  if (isEdit && !product) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find a product with the slug "{slug}" in your catalogue.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit product" : "Create product"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEdit
            ? `Updating ${product?.title ?? "product"}`
            : "Add a new product to your catalogue."}
        </p>
      </div>
    </div>
  );
};

export default CreateEditProduct;
