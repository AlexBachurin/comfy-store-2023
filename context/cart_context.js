import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
import { getCartFromLocalStorage } from "../utils/helpers";

const initialState = {
  cart: getCartFromLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  // CLEAR CART
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  // REMOVE FROM CART
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // TOGGLE Amount
  const toggleAmount = (id) => {
    console.log("amount toggle");
  };

  //save cart items to localstorage, every time there is change in cart
  useEffect(() => {
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
