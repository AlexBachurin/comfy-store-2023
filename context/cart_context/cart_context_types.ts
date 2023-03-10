import { Single_Product_Type } from "../products/products_context_types";

export type Cart_State = {
  cart: ICartItem[];
  totalItems: number;
  totalAmount: number;
  shipping_fee: number;
};

export type Cart_Context_Type = {
  cart: ICartItem[];
  totalItems: number;
  totalAmount: number;
  shipping_fee: number;
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: Single_Product_Type
  ) => void;
  clearCart: () => void;
  toggleAmount: (id: string, type: string) => void;
  removeFromCart: (id: string) => void;
};

export interface ICartItem {
  amount: number;
  color: string;
  id: string;
  image: string;
  max: number;
  name: string;
  price: number;
}
