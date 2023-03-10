import { FILTERS_CONTEXT_TYPE } from "@src/context/filters/filter_context_types";
import React from "react";
import { useFilterContext } from "../context/filters/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products, grid_view } =
    useFilterContext() as FILTERS_CONTEXT_TYPE;
  if (filtered_products.length < 1) {
    return <h5>Sorry, no products matched your criteria</h5>;
  }
  return (
    <>
      {grid_view ? (
        <GridView products={filtered_products}></GridView>
      ) : (
        <ListView products={filtered_products}></ListView>
      )}
    </>
  );
};

export default ProductList;
