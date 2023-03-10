import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filters/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useProductsContext } from "../context/products/products_context";

const Filters = () => {
  const { updateFilters, clearFilters, filters, all_products } =
    useFilterContext();

  // get unique values for each filter category
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={filters.text}
              onChange={updateFilters}
            />
          </div>
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((category, index) => {
                return (
                  <button
                    name="category"
                    value={category}
                    onClick={updateFilters}
                    key={index}
                    className={`${
                      category === filters.category ? "active" : null
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          {/* company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              className="company"
              name="company"
              id="company"
              value={filters.company}
              onChange={updateFilters}
            >
              {companies.map((comp, index) => {
                return (
                  <option key={index} value={comp}>
                    {comp}
                  </option>
                );
              })}
            </select>
          </div>
          {/* colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colors.map((color, index) => {
                // all color btn
                if (color === "all") {
                  return (
                    <button
                      key={index}
                      value={color}
                      name="color"
                      className={`all-btn ${
                        filters.color === color ? "active" : null
                      }`}
                      onClick={updateFilters}
                    >
                      {color}
                    </button>
                  );
                }
                // rest buttons
                return (
                  <button
                    style={{ background: color }}
                    key={index}
                    value={color}
                    name="color"
                    className={`color-btn ${
                      filters.color === color ? "active" : null
                    }`}
                    onClick={updateFilters}
                  >
                    {filters.color === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(filters.price)}</p>
            <input
              name="price"
              min={filters.min_price}
              max={filters.max_price}
              value={filters.price}
              onChange={updateFilters}
              type="range"
            />
          </div>
          {/* shipping */}
          <div className="form-cotrol shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={filters.shipping}
              onChange={updateFilters}
            />
          </div>
        </form>
        {/* clear filters */}
        <button className="clear-btn" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 125px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    margin-top: 15px;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
