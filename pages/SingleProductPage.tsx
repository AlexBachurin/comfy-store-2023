import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Products_Context_Type,
  Single_Product_Type,
} from "@src/context/products/products_context_types";

type Params_Props = {
  id: string;
};

const SingleProductPage = () => {
  //get id using react router useparams
  const { id } = useParams<Params_Props>();
  //history
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product,
    fetchSingleProduct,
  } = useProductsContext() as Products_Context_Type;

  //FETCH on page load
  useEffect(() => {
    fetchSingleProduct(url, id);
  }, []);

  // Navigate back to home page if there is an error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (!loading && single_product) {
    const {
      name,
      price,
      description,
      stock,
      stars,
      colors,
      reviews,
      id: sku,
      company,
      images,
    } = single_product as Single_Product_Type;

    return (
      <Wrapper>
        <PageHero title={name} product={true} />
        <div className="section section-center page">
          <Link to={"/products"} className="btn">
            back to products
          </Link>
          <div className="product-center">
            {/* product images */}
            <ProductImages images={images} />
            {/* Product info */}
            <section className="content">
              <h2>{name}</h2>
              {/* Stars component */}
              <Stars stars={stars} reviews={reviews} />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Available: </span>
                {stock > 0 ? "In Stock" : "Out of stock"}
              </p>
              <p className="info">
                <span>SKU: </span>
                {sku}
              </p>
              <p className="info">
                <span>Brand: </span>
                {company}
              </p>
              <hr />
              {/* Add to cart and colors only if in stock */}
              {single_product && id
                ? stock > 0 && (
                    <AddToCart
                      id={id}
                      stock={stock}
                      colors={colors}
                      product={single_product}
                    />
                  )
                : null}
            </section>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
