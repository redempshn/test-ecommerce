import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { ProductFormData } from "@/shared/validations/product.schema";
import SectionCard from "@/features/admin/dashboard/products/SectionCard";

interface ProductAttributesProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export const ProductAttributes = ({
  control,
  errors,
}: ProductAttributesProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <SectionCard
      title="Product Attributes"
      extra={
        <button
          type="button"
          onClick={() => append({ name: "", value: "" })}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 uppercase tracking-tight cursor-pointer transition"
        >
          <Plus size={14} /> Add Attribute
        </button>
      }
    >
      <div className="space-y-3">
        {fields.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">
            No attributes yet. Click &quot;Add Attribute&quot; to add one.
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3 items-start">
            <div className="flex-1">
              <input
                {...control.register(`attributes.${index}.name`)}
                placeholder="Name (e.g. Color)"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.attributes?.[index]?.name
                    ? "border-red-500"
                    : "border-slate-200"
                } focus:ring-1 outline-none`}
              />
              {errors.attributes?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.attributes[index].name.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <input
                {...control.register(`attributes.${index}.value`)}
                placeholder="Value (e.g. Red)"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.attributes?.[index]?.value
                    ? "border-red-500"
                    : "border-slate-200"
                } focus:ring-1 outline-none`}
              />
              {errors.attributes?.[index]?.value && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.attributes[index].value.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="cursor-pointer mt-2 p-1.5 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
