import { ChangeEventHandler } from "react";
import { Product_Type } from "../products/products_context_types";

export type FILTERS_STATE = {
  filtered_products: Product_Type[];
  all_products: Product_Type[];
  grid_view: boolean;
  sort_term: string;
  filters: {
    text: string;
    category: string;
    company: string;
    color: string;
    min_price: number;
    max_price: number;
    price: number;
    shipping: boolean;
  };
};

export type FILTERS_CONTEXT_TYPE = {
  filtered_products: Product_Type[];
  all_products: Product_Type[];
  grid_view: boolean;
  sort_term: string;
  filters: {
    text: string;
    category: string;
    company: string;
    color: string;
    min_price: number;
    max_price: number;
    price: number;
    shipping: boolean;
  };
  setGridView: () => void;
  setListView: () => void;
  updateSort: ChangeEventHandler<HTMLInputElement>;
  updateFilters: ChangeEventHandler<HTMLInputElement>;
  clearFilters: () => void;
};
