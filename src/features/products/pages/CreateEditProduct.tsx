import { useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { RootState } from "@/app/app.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload";
import { useToast } from "@/features/toast/hook/useToast";
import { FileUploadDialog } from "../components/FileUploadDialog";
import { useProduct } from "../hooks/useProduct";
import type { AddVariantPayload, CreateProductPayload, ProductCategory } from "../product.types";

type CreateEditProductProps = {
  slug?: string;
  isAddVariant?: boolean;
};

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type Size = (typeof SIZES)[number];

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
];

type ProductFormState = {
  title: string;
  description: string;
  category: ProductCategory;
  basePrice: string;
  sku: string;
  color: string;
  size: Size | "";
  price: string;
  stock: string;
};

function toSize(value?: string): Size {
  return SIZES.includes(value as Size) ? (value as Size) : "M";
}

const CreateEditProduct = ({ slug, isAddVariant = false }: CreateEditProductProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { handleCreateProduct, handleUpdateProduct, handleAddVariant, loading } = useProduct();
  const product = useSelector((state: RootState) =>
    slug ? state.product.sellerProducts[slug] : undefined
  );

  const isEdit = Boolean(slug) && !isAddVariant;
  const variant = isAddVariant ? undefined : product?.variants?.[0];

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [form, setForm] = useState<ProductFormState>({
    title: product?.title ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "men",
    basePrice: product?.basePrice !== undefined ? String(product.basePrice) : "",
    sku: variant?.sku ?? "",
    color: variant?.color ?? "",
    size: isAddVariant ? "" : toSize(variant?.size),
    price: variant?.price !== undefined ? String(variant.price) : "",
    stock: variant?.stock !== undefined ? String(variant.stock) : "",
  });

  const initialImages: FileMetadata[] = isAddVariant
    ? []
    : (variant?.images ?? []).map((url, index) => ({
        id: `existing-${index}`,
        name: `image-${index + 1}`,
        size: 0,
        type: "image/*",
        url,
      }));

  function updateField<K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goBack() {
    navigate("/products/seller");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newFiles: File[] = [];
    const existingImages: string[] = [];

    files.forEach((fileItem) => {
      if (fileItem.file instanceof File) {
        newFiles.push(fileItem.file);
      } else {
        existingImages.push(fileItem.file.url);
      }
    });

    if (isAddVariant && slug) {
      if (!form.size) {
        toast.error("Size required", "Select a size for the new variant.");
        return;
      }

      const payload: AddVariantPayload = {
        variants: [
          {
            sku: form.sku.trim(),
            size: form.size,
            color: form.color.trim(),
            price: Number(form.price || form.basePrice),
            stock: Number(form.stock || 0),
            images: newFiles.map((_, index) => index),
          },
        ],
        images: newFiles,
      };

      const result = await handleAddVariant(slug, payload);

      if (result.success) {
        navigate("/products/seller");
      }

      return;
    }

    const basePrice = Number(form.basePrice);

    const payload: CreateProductPayload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      basePrice,
      attributes: {},
      variants: [
        {
          sku: form.sku.trim(),
          size: form.size || toSize(),
          color: form.color.trim(),
          price: Number(form.price || form.basePrice),
          stock: Number(form.stock || 0),
          images: [...existingImages, ...newFiles.map((_, index) => index)],
        },
      ],
      isActive: product?.isActive ?? true,
      images: newFiles,
    };

    const result = isEdit && slug
      ? await handleUpdateProduct(slug, payload)
      : await handleCreateProduct(payload);

    if (result.success) {
      navigate("/products/seller");
    }
  }

  if (slug && !product) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goBack}
            aria-label="Back to products"
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-xl font-semibold lg:text-2xl">Product not found</h1>
            <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
              We couldn't find a product with the slug "{slug}" in your catalogue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goBack}
            aria-label="Back to products"
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-xl font-semibold lg:text-2xl">
              {isAddVariant ? "Add variant" : isEdit ? "Edit product" : "Create product"}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
              {isAddVariant
                ? `Adding a new variant to ${product?.title ?? "product"}`
                : isEdit
                  ? `Updating ${product?.title ?? "product"}`
                  : "Add a new product to your catalogue."}
            </p>
          </div>
        </div>
        <FileUploadDialog initialFiles={initialImages} onFilesChange={setFiles} />
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Oversized cotton tee"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <RadioGroup
                  value={form.category}
                  onValueChange={(value) =>
                    updateField("category", value as ProductCategory)
                  }
                  className="flex flex-wrap gap-4"
                  aria-label="Category"
                >
                  {CATEGORIES.map((category) => (
                    <div key={category.value} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={category.value}
                        id={`category-${category.value}`}
                      />
                      <Label
                        htmlFor={`category-${category.value}`}
                        className="font-normal"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="basePrice">Base price</Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.basePrice}
                  onChange={(event) => updateField("basePrice", event.target.value)}
                  placeholder="999"
                  required
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Describe the fabric, fit and finish"
                  required
                />
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-base font-medium">Variant details</h2>
              <p className="text-sm text-muted-foreground">
                Set the size, colour and inventory for this product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="grid gap-2 md:col-span-2">
                <Label>Size</Label>
                <RadioGroup
                  value={form.size}
                  onValueChange={(value) => updateField("size", toSize(value))}
                  className="flex flex-wrap gap-2"
                  aria-label="Size"
                >
                  {SIZES.map((size) => (
                    <RadioGroupItem
                      key={size}
                      value={size}
                      className="aspect-auto size-auto cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors [&_[data-slot=radio-group-indicator]]:hidden"
                    >
                      {size}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={form.sku}
                  onChange={(event) => updateField("sku", event.target.value)}
                  placeholder="TEE-BLK-M"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="color">Colour</Label>
                <Input
                  id="color"
                  name="color"
                  value={form.color}
                  onChange={(event) => updateField("color", event.target.value)}
                  placeholder="Black"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Variant price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="999"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(event) => updateField("stock", event.target.value)}
                  placeholder="10"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={goBack} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : isAddVariant
                ? "Add variant"
                : isEdit
                  ? "Update product"
                  : "Create product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditProduct;
