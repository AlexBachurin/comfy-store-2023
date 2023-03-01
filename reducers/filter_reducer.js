import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // find maxPrice for filters
    let pricesArr = action.payload.map((item) => item.price);
    let maxPrice = Math.max(...pricesArr);
    return {
      ...state,
      // !!!use spread to copy products, so js wont point on same products object from products context
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  // SET GRID OR LIST VIEW
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // UPDATE SORT
  if (action.type === UPDATE_SORT) {
    return { ...state, sort_term: action.payload };
  }
  // SORT FUNCTIONALITY
  if (action.type === SORT_PRODUCTS) {
    const { sort_term, filtered_products } = state;
    if (sort_term === "price-lowest") {
      filtered_products.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort_term === "price-highest") {
      filtered_products.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort_term === "name-a") {
      filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort_term === "name-z") {
      filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    // just return state, since sort mutates filtered products array anyway
    return { ...state };
  }
  // FILTERS
  if (action.type === UPDATE_FILTERS) {
    // get name and value from payload
    const { name, value } = action.payload;
    console.log(action.payload);
    // update dynamically filters object by provided values from payload
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
