import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  // *** ADD TO CART ***
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    console.log(action.payload);
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
  // *** COUNT CART TOTALS ***
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
