import React, { useState } from "react"
import styles from "@/styles/ProductCategory.module.css"
import Link from "next/link"

export default function ProductCategory({ handleMouseOut }) {
  return (
    <>
      <div className={styles.catTitle}>商品分類</div>
      <div className={styles.flexContainer}>
        <div className={styles.catCard} onClick={handleMouseOut}>
          <Link href={"/product/product?category=帳篷"}>
            <img className={styles.catImg} src="/images/cat-tent.png"></img>
            <div className={styles.catName}>帳篷</div>
          </Link>
        </div>

        <div className={styles.catCard} onClick={handleMouseOut}>
          <Link href={"/product/product?category=篷布"}>
            <img className={styles.catImg} src="/images/cat-tarp.png"></img>
            <div className={styles.catName}>篷布</div>
          </Link>
        </div>

        <div className={styles.catCard} onClick={handleMouseOut}>
          <Link href={"/product/product?category=露營工具"}>
            <img className={styles.catImg} src="/images/cat-tools.png"></img>
            <div className={styles.catName}>露營工具</div>
          </Link>
        </div>

        <div className={styles.catCard} onClick={handleMouseOut}>
          <Link href={"/product/product?category=露營用品"}>
            <img
              className={styles.catImg}
              src="/images/cat-furniture.png"
            ></img>
            <div className={styles.catName}>露營用品</div>
          </Link>
        </div>

        <div className={styles.catCard} onClick={handleMouseOut}>
          <Link href={"/product/product?category=特價中"}>
            <img className={styles.catImg} src="/images/cat-sale.png"></img>
            <div className={styles.catName}>優惠促銷</div>
          </Link>
        </div>

        <div className={styles.catCard} onClick={handleMouseOut}>
          <Link href={"/product/product?category=精選服飾"}>
            <img className={styles.catImg} src="/images/cat-clothing.png"></img>
            <div className={styles.catName}>精選服飾</div>
          </Link>
        </div>

        <Link href={"/product/product"}>
          <div className={styles.viewAllBtn} onClick={handleMouseOut}>
            查看所有商品
          </div>
        </Link>
      </div>
    </>
  )
}
