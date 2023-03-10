import { Single_Product_Type } from "../products/products_context_types";

export type CART_ACTIONTYPE =
  | {
      type: "ADD_TO_CART";
      payload: {
        id: string;
        color: string;
        amount: number;
        product: Single_Product_Type;
      };
    }
  | { type: "REMOVE_CART_ITEM"; payload: string }
  | { type: "TOGGLE_CART_ITEM_AMOUNT"; payload: { id: string; type: string } }
  | { type: "CLEAR_CART" }
  | { type: "COUNT_CART_TOTALS" };
