import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../../actions";
import { getCartFromLocalStorage } from "../../utils/helpers";
import { Cart_Context_Type, Cart_State } from "./cart_context_types";
import { Single_Product_Type } from "../products/products_context_types";

const initialState: Cart_State = {
  cart: getCartFromLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext<Cart_Context_Type | null>(null);

type Cart_Provider_Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Cart_Provider_Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (
    id: string,
    color: string,
    amount: number,
    product: Single_Product_Type
  ) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  // CLEAR CART
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  // REMOVE FROM CART
  const removeFromCart = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // TOGGLE Amount
  const toggleAmount = (id: string, type: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };

  // calculate totals
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    //save cart items to localstorage, every time there is change in cart
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeFromCart, toggleAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
