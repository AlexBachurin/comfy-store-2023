import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../../actions";
import { useProductsContext } from "../products/products_context";
import { FILTERS_CONTEXT_TYPE, FILTERS_STATE } from "./filter_context_types";
import { Products_Context_Type } from "../products/products_context_types";

const initialState: FILTERS_STATE = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort_term: "price-lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext<FILTERS_CONTEXT_TYPE | null>(null);

type FILTER_PROVIDER_PROPS = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<FILTER_PROVIDER_PROPS> = ({
  children,
}) => {
  // get products from products context
  const { products } = useProductsContext() as Products_Context_Type;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Set Grid or List view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // SORT
  const updateSort: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // pass selected value of select element
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // FILTERS
  const updateFilters: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    // set value as string number or boolean since in different cases we need to set value as number or boolean
    let value = e.target.value as string | number | boolean;
    // change value for price input since value will be string
    if (name === "price") {
      value = Number(value);
    }
    // shipping
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    console.log("filters cleared");
    dispatch({ type: CLEAR_FILTERS });
  };

  // dispatch on component load and pass products from products context
  // add to dependancy array since products will be empty array at first
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  // sort every time sort term changes
  useEffect(() => {
    // FILTER PRODUCTS on filter state change
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort_term, state.filters]);

  // FILTER PRODUCTS on filter state change
  // useEffect(() => {
  //   dispatch({ type: FILTER_PRODUCTS });
  // }, [state.filters]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
