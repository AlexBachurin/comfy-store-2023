import { Product_Type } from "@src/context/products/products_context_types";
import React from "react";
import styled from "styled-components";
import Product from "./Product";

type GridView_Props = {
  products: Product_Type[];
};

const GridView: React.FC<GridView_Props> = ({ products }) => {
  return (
    <Wrapper>
      <section className="products-container">
        {products.map((item) => {
          return <Product key={item.id} {...item} />;
        })}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
