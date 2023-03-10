import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Product_Type } from "@src/context/products/products_context_types";

type PageHero_Props = {
  title: string;
  product: boolean;
};

const PageHero: React.FC<PageHero_Props> = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to={"/"}>Home</Link>/
          {/* if products prop is true then display link to products aswell
          made for SingleProduct page */}
          {product ? <Link to={"/products"}>products /</Link> : null}
          {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
