import React from 'react'
import { authStyles } from '../styles/authStyles'
import { cartStyles } from '../styles/cartStyles'

const ProductCard = ({product}) => {
  return (
    <>
        <div className={cartStyles.productCard}>

            <img src={product.thumbnail} 
            alt={product.title}
            className={cartStyles.img} />

            <div className={cartStyles.productBody}>

                <h3 className={cartStyles.productTitle}>{product.title}</h3>
                <p className={cartStyles.detail}>Price : ${product.price}</p>
                <p className={cartStyles.detail}>Quantity : {product.quantity}</p>
                <p className={cartStyles.detail}>Total : ${product.total.toFixed(2)}</p>
                <p className={cartStyles.detail}>Discount : {product.discountPercentage}%</p>
                <p className={cartStyles.highlight}>Discount Total : ${product.discountedTotal}</p>

                
            </div>
            
        </div>
    </>
  )
}

export default ProductCard