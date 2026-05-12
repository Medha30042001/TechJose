import React from "react";
import ProductCard from "./ProductCard";
import { authStyles } from "../styles/authStyles";
import { cartStyles } from "../styles/cartStyles";

const CartItems = ({ cart }) => {
  return (
    <>
      <div className={cartStyles.cartCard}>

        <div className={cartStyles.cartHeader}>
          <div>
            <h2 className={cartStyles.cartTitle}>Cart #{cart.id}</h2>
            <p className={cartStyles.cartMeta}>User ID : {cart.userId}</p>
          </div>

          <p className={cartStyles.highlight}>
            {cart.totalProducts} products .{cart.totalQuantity} items
          </p>
        </div>

        <div className={cartStyles.products}>
          {cart.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className={cartStyles.cartSummary}>
          <div className={cartStyles.summaryItem}>
            <p className={cartStyles.summaryLabel}>Total : </p>
            <p className={cartStyles.summaryValue}>{cart.total}</p>
          </div>

          <div className={cartStyles.summaryItem}>
            <p className={cartStyles.summaryLabel}>Discounted Total : </p>
            <p className={cartStyles.summaryValue}>{cart.discountedTotal}</p>
          </div>

          <div className={cartStyles.summaryItem}>
            <p className={cartStyles.summaryLabel}>User ID : </p>
            <p className={cartStyles.summaryValue}>{cart.userId}</p>
          </div>

          <div className={cartStyles.summaryItem}>
            <p className={cartStyles.summaryLabel}>Products : </p>
            <p className={cartStyles.summaryValue}>{cart.totalProducts}</p>
          </div>

          <div className={cartStyles.summaryItem}>
            <p className={cartStyles.summaryLabel}>Quantity : </p>
            <p className={cartStyles.summaryValue}>{cart.totalQuantity}</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default CartItems;
