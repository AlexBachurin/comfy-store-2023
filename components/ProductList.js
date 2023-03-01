import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products } = useFilterContext();
  if (filtered_products.length < 1) {
    return <h5>Sorry, no products matched your criteria</h5>;
  }
  // return <GridView products={filtered_products}></GridView>;
  return <ListView products={filtered_products}></ListView>;
};

export default ProductList;
