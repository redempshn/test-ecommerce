import { z } from "zod";

export const ProductFormSchema = z.object({
  title: z.string().min(3).trim(),
  slug: z.string().min(3).trim(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]),
  categoryId: z.number().int(),
  brandId: z.number().int(),
  descriptionHtml: z.string(),
  attributes: z.array(
    z.object({ name: z.string().min(1), value: z.string().min(1) }),
  ),
  images: z.array(
    z.object({ url: z.string().min(1), position: z.number().int() }),
  ),
});

export type ProductFormData = z.infer<typeof ProductFormSchema>;
