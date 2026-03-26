"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  Heading,
  Link as LinkIcon,
} from "lucide-react";
import SectionCard from "@/features/admin/dashboard/products/SectionCard";
import InputGroup from "@/features/admin/dashboard/products/InputGroup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import ProductImageUploader from "./ProductImageUploader";
import {
  createProduct,
  fetchAdminProductById,
  updateProduct,
} from "@/shared/lib/redux/admin/AdminProductsThunk";
import {
  type ProductFormData,
  ProductFormSchema,
} from "@/shared/validations/product.schema";
import { selectAllCategories } from "@/shared/lib/redux/categories/categoriesSlice";
import { selectAllbrands } from "@/shared/lib/redux/brands/brandsSlice";
import { fetchCategories } from "@/shared/lib/redux/categories/categoriesThunk";
import { fetchBrands } from "@/shared/lib/redux/brands/brandsThunk";
import { selectAdminProductById } from "@/shared/lib/redux/admin/AdminProducts.selectors";
import { ProductAttributes } from "@/entities/ProductAttributes";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: number;
  onSuccess?: () => void;
}

const ProductForm = ({ mode, productId, onSuccess }: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const brands = useAppSelector(selectAllbrands);

  const product = useAppSelector((state) =>
    mode === "edit" && productId
      ? selectAdminProductById(state, productId)
      : null,
  );

  const emptyDefaults = {
    title: "",
    slug: "",
    price: 0,
    stock: 0,
    status: "DRAFT" as const,
    categoryId: 0,
    brandId: 0,
    descriptionHtml: "",
    attributes: [],
    images: [],
  };

  const {
    control,
    reset,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: emptyDefaults,
  });

  console.log(product);

  const images = watch("images");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (mode === "edit" && productId) {
      dispatch(fetchAdminProductById({ id: productId }));
    }
  }, [mode, productId, dispatch]);

  useEffect(() => {
    if (mode === "edit" && product) {
      reset({
        title: product.title,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        status: product.status,
        categoryId: product.categoryId,
        brandId: product.brandId,
        descriptionHtml: product.content?.descriptionHtml ?? "",
        attributes: product.attributes ?? [],
        images: product.images ?? [],
      });
    }
  }, [product, mode, reset]);

  const onSubmit = async (data: ProductFormData) => {
    console.log("onSubmit вызван", data);
    console.log("mode:", mode, "productId:", productId);
    try {
      if (mode === "create") {
        await dispatch(createProduct(data)).unwrap();
      } else if (productId) {
        console.log("продукт обновлен", data);
        await dispatch(updateProduct({ id: productId, data })).unwrap();
      }
      onSuccess?.();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8">
      {/* Basic Information */}
      <SectionCard title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputGroup label="Product Title">
              <input
                type="text"
                {...register("title")}
                placeholder="Product name"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.title ? "border-red-500" : "border-slate-200"
                } focus:ring-1 focus:black outline-none`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </InputGroup>
          </div>

          <InputGroup label="Slug">
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 text-sm italic">
                /products/
              </span>
              <input
                type="text"
                {...register("slug")}
                className={`w-full pl-20 pr-4 py-2 rounded-lg border ${
                  errors.slug ? "border-red-500" : "border-slate-200"
                } focus:ring-1 focus:black outline-none`}
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </InputGroup>

          <InputGroup label="Status">
            <select
              {...register("status")}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:black outline-none"
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </InputGroup>

          <InputGroup label="Price">
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-2 rounded-lg border ${
                  errors.price ? "border-red-500" : "border-slate-200"
                } focus:ring-1 focus:black outline-none`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </InputGroup>

          <InputGroup label="Stock Quantity">
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              placeholder="0"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.stock ? "border-red-500" : "border-slate-200"
              } focus:ring-1 focus:black outline-none`}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </InputGroup>

          <InputGroup label="Category">
            <select
              {...register("categoryId", { valueAsNumber: true })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.categoryId ? "border-red-500" : "border-slate-200"
              } bg-white focus:ring-1 focus:black outline-none`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </InputGroup>

          <InputGroup label="Brand (Optional)">
            <select
              {...register("brandId", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:black outline-none"
            >
              <option value="">No Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </InputGroup>
        </div>
      </SectionCard>

      {/* Media Uploader */}
      <ProductImageUploader value={images} setValue={setValue} />

      {/* Description (Rich Text Mockup) */}
      <SectionCard title="Description">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50">
            <button className="p-2 hover:bg-white rounded text-slate-600 transition-colors">
              <Bold size={16} />
            </button>
            <button className="p-2 hover:bg-white rounded text-slate-600 transition-colors">
              <Italic size={16} />
            </button>
            <button className="p-2 hover:bg-white rounded text-slate-600 transition-colors">
              <Heading size={16} />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1" />
            <button className="p-2 hover:bg-white rounded text-slate-600 transition-colors">
              <List size={16} />
            </button>
            <button className="p-2 hover:bg-white rounded text-slate-600 transition-colors">
              <LinkIcon size={16} />
            </button>
          </div>
          <textarea
            {...register("descriptionHtml")}
            rows={6}
            placeholder="Describe your product..."
            className="w-full p-4 outline-none resize-y min-h-50 text-slate-700"
          />
        </div>
      </SectionCard>

      {/* Product Attributes */}
      <ProductAttributes control={control} errors={errors} />

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onSuccess}
          className="cursor-pointer px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-gray-200 hover:text-black disabled:opacity-50 transition"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Product"
              : "Update Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
