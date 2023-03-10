import { Product_Type, Single_Product_Type } from "./products_context_types";

export type PRODUCTS_ACTIONTYPES =
  | { type: "SIDEBAR_OPEN" }
  | { type: "SIDEBAR_CLOSE" }
  | { type: "GET_PRODUCTS_BEGIN" }
  | { type: "GET_PRODUCTS_SUCCESS"; payload: Product_Type[] }
  | { type: "GET_PRODUCTS_ERROR" }
  | { type: "GET_SINGLE_PRODUCT_BEGIN" }
  | { type: "GET_SINGLE_PRODUCT_SUCCESS"; payload: Single_Product_Type }
  | { type: "GET_SINGLE_PRODUCT_ERROR" };
