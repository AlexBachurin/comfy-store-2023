export type Products_State = {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: Product_Type[];
  featuredProducts: Product_Type[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Single_Product_Type | null;
};

export type Products_Context_Type = {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: Product_Type[];
  featuredProducts: Product_Type[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Single_Product_Type | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string, id: string) => void;
};

export interface Product_Type {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: String[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
  featured: boolean;
}

export interface Single_Product_Type {
  id: string;
  stock: number;
  name: string;
  price: number;
  images: Single_Product_Image[];
  colors: String[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
  reviews: number;
  stars: number;
}

export type Single_Product_Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
};
