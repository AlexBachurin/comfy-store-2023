import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context/cart_context";
import AmountButtons from "./AmountButtons";
import { Cart_Context_Type } from "@src/context/cart_context/cart_context_types";
import { Single_Product_Type } from "@src/context/products/products_context_types";

type AddToCart_Props = {
  id: string;
  stock: number;
  colors: string[];
  product: Single_Product_Type;
};

const AddToCart: React.FC<AddToCart_Props> = ({
  id,
  stock,
  colors,
  product,
}) => {
  const { addToCart } = useCartContext() as Cart_Context_Type;
  // state for color
  const [mainColor, setMainColor] = useState(colors[0]);
  // state for amount
  const [amount, setAmount] = useState(1);

  const increaseAmount = () => {
    // check to not exceed stock
    if (amount >= stock) {
      setAmount(stock);
    } else {
      setAmount(amount + 1);
    }
  };

  const decreaseAmount = () => {
    if (amount <= 1) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                // add color directly to style
                style={{ background: color }}
                className={`color-btn ${color === mainColor ? "active" : null}`}
                key={index}
                // change main color by clicking on color button
                onClick={() => setMainColor(color)}
              >
                {/* add check icon to current active color(mainColor) */}
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />
        <Link
          to={"/cart"}
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
