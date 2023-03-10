import { CART_ACTIONTYPE } from "@src/context/cart_context/cart_action_types";
import { Cart_State } from "@src/context/cart_context/cart_context_types";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state: Cart_State, action: CART_ACTIONTYPE) => {
  // *** ADD TO CART ***
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    // find item in cart, by id+color property
    const tmpItem = state.cart.find((item) => item.id === id + color);
    // if item with this id and color already exists in cart
    if (tmpItem) {
      // go through cart, find item which need to be edited by id and change amount of this item in cart
      const newCart = state.cart.map((item) => {
        if (item.id === tmpItem.id) {
          // check for amount to not exceed stock amount, for this
          // we created every item in cart with max property
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: [...newCart] };
    }
    // if not just create new object and add it to cart
    else {
      const newItem = {
        // add id as id+color so we can differentiate same items with same color
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  // *** CLEAR CART ***
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  // *** REMOVE ITEM FROM CART ***
  if (action.type === REMOVE_CART_ITEM) {
    // filter for matching payload id
    let newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: [...newCart] };
  }
  // *** TOGGLE CART AMOUNT ***
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, type } = action.payload;
    // map through cart, find item with same id provided in payload, change amount based on provided operation type in payload
    let tempCart = state.cart.map((item) => {
      if (item.id === id) {
        // check for operation type
        // *** INCREASE ***
        if (type === "inc") {
          //add 1 and check for amount to not exceed stock
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          // return item with edited amount
          return { ...item, amount: newAmount };
        }
        // *** DECREASE ***
        if (type === "dec") {
          let newAmount = item.amount - 1;
          // same thing as with increase, just check to not go below 1
          if (newAmount <= 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: [...tempCart] };
  }
  // *** COUNT CART TOTALS ***
  if (action.type === COUNT_CART_TOTALS) {
    // return object with total amount and totalitems properties with reduce
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, curItem) => {
        // get price and amount from each item in cart on every iteration
        const { price, amount } = curItem;
        // calculate total items
        total.totalItems += amount;
        // calculate total price
        total.totalAmount += amount * price;
        // return object with values
        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalAmount, totalItems };
  }
  throw new Error(`No Matching  - action type`);
};

export default cart_reducer;
