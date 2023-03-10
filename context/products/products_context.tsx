import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../../reducers/products_reducer";
import { products_url as url } from "../../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../../actions";
import {
  Products_Context_Type,
  Products_State,
} from "./products_context_types";

const initialState: Products_State = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featuredProducts: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: null,
};

const ProductsContext = React.createContext<Products_Context_Type | null>(null);

type Products_Provider_Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Products_Provider_Props> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  //FETCH ALL PRODUCTS
  const fetchProducts = async (url: string) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const resp = await axios.get(url);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: resp.data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  //FETCH SINGLE PRODUCT
  const fetchSingleProduct = async (url: string, id: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const resp = await axios.get(`${url}${id}`);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: resp.data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);
  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
