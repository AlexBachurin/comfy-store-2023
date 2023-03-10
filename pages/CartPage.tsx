import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import { Cart_Context_Type } from "@src/context/cart_context/cart_context_types";

const CartPage = () => {
  const { cart } = useCartContext() as Cart_Context_Type;
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to={"/products"} className="btn">
            Back to shopping
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title={"cart"} product={false} />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
