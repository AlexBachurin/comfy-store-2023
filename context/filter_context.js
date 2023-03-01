import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort_term: "price-lowest",
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // get products from products context
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Set Grid or List view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // SORT
  const updateSort = (e) => {
    // pass selected value of select element
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // dispatch on component load and pass products from products context
  // add to dependancy array since products will be empty array at first
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
