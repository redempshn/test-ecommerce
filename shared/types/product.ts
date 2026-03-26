export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  stock: number;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  categoryId: number;
  brandId: number;
  createdAt: string;
  updatedAt: string;

  content: Content;
  attributes: Attributes[];
  images: Images[];
  category: Category;
  brand: Brand;
}

export interface Content {
  id: number;
  productId: number;
  descriptionHtml: string;
}

export interface Attributes {
  id: number;
  productId: number;
  name: string;
  value: string;
}

export interface Images {
  id: number;
  productId: number;
  url: string;
  position: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
}

export interface Brand {
  id: number;
  name: string;
}
