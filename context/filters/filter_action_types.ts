import { Product_Type } from "../products/products_context_types";

export type FILTERS_ACTIONTYPES =
  | { type: "LOAD_PRODUCTS"; payload: Product_Type[] }
  | { type: "SET_GRIDVIEW" }
  | { type: "SET_LISTVIEW" }
  | { type: "UPDATE_SORT"; payload: string }
  | { type: "SORT_PRODUCTS" }
  | {
      type: "UPDATE_FILTERS";
      payload: { name: string; value: string | number | boolean };
    }
  | { type: "FILTER_PRODUCTS" }
  | { type: "CLEAR_FILTERS" };
