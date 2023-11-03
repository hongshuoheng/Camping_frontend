import React from "react"
import styles from "@/styles/product.module.css"
import Image from "next/image"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ProductCard({
  pName,
  pPrice,
  inventory,
  img,
  onShelves,
  pid,
  pDiscount
}) {
  return (
    <>
      <div className={styles.cardContainer}>
        <Link href={`/product/${pid}`}>
          <div className={styles.tagContainer}>
            {(new Date() - new Date(onShelves)) / 1000 / 60 / 60 / 24 <= 15 ? (
              <span className={styles.tag}>新上架</span>
            ) : (
              ""
            )}

            {inventory <= 5 ? (
              inventory == 0 || !inventory ? (
                <span className={styles.tag}>已售罄</span>
              ) : (
                <span className={styles.tag}>即將售罊</span>
              )
            ) : (
              ""
            )}

            {pDiscount ? (
              <span className={styles.discountTag}>
                {100 * pDiscount + "% OFF"}
              </span>
            ) : (
              ""
            )}
          </div>

          {/* <div style={{ top: "30px" }} className={styles.tagContainer}>
          </div> */}

          <Image
            loading="lazy"
            width={320}
            height={400}
            className={styles.photo}
            src={`/images/pimg/${img}`}
            alt="product-image"
          />
          <p className={styles.pTitle}>{pName}</p>
          {pDiscount ? (
            <>
              <span className={styles.strikeThrough}>NTD {pPrice}</span>
              <span className={styles.discountPrice}>
                NTD {parseInt(pPrice * (1 - pDiscount))}
              </span>
            </>
          ) : (
            <p className={styles.price}>NTD {pPrice}</p>
          )}
        </Link>
      </div>
    </>
  )
}
