import React, { useState } from "react";
import { useFilterContext } from "../context/filters/filter_context";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";
import { FILTERS_CONTEXT_TYPE } from "@src/context/filters/filter_context_types";
const Sort = () => {
  const {
    filtered_products,
    grid_view,
    setGridView,
    setListView,
    updateSort,
    sort_term,
  } = useFilterContext() as FILTERS_CONTEXT_TYPE;

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          onClick={setGridView}
          className={`${grid_view ? "active" : null}`}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={setListView}
          className={`${grid_view ? null : "active"}`}
        >
          <BsList />
        </button>
      </div>
      <p>{filtered_products.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          onChange={updateSort}
          value={sort_term}
        >
          <option value="price-lowest">price-lowest</option>
          <option value="price-highest">price-highest</option>
          <option value="name-a">Name (A-Z)</option>
          <option value="name-z">Name (Z-A)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
