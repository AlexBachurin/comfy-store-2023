import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products/products_context";
import { FilterProvider } from "./context/filters/filter_context";
import { CartProvider } from "./context/cart_context/cart_context";
import { UserProvider } from "./context/user/user_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </UserProvider>
);
