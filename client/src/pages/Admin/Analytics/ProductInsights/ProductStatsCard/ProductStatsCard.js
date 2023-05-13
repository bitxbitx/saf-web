import React from 'react';
import styles from './ProductStatsCard.module.css';

export default function ProductStatsCard({ data }) {
  /**
   * Example data:
   * {
      "_id": "645e6d8b772fcfa221df4ac8",
      "name": "TEST PRODUCT 2",
      "totalSales": 0,
      "totalOrders": 0,
      "totalUnitsSold": 0,
      "totalUnitsInStock": 0,
      "wishlistCount": 0,
      "addToCartCount": 0,
      "variants": [
        {
          "_id": "645e6d8b772fcfa221df4aca"
        }
      ]
    }
   */
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {data.name}
      </div>
      <div className={styles.stats}>
        <div className={styles.statsInfo} >
          Sales: {data.totalSales}
        </div>
        <div className={styles.statsInfo} >
          Orders: {data.totalOrders}
        </div>
        <div className={styles.statsInfo} >
          Units Sold: {data.totalUnitsSold}
        </div>
        <div className={styles.statsInfo} >
          Units in Stock: {data.totalUnitsInStock}
        </div>
        <div className={styles.statsInfo} >
          Wishlist: {data.wishlistCount}
        </div>
        <div className={styles.statsInfo} >
          Add to Cart: {data.addToCartCount}
        </div>
      </div>
    </div>
  )
}
