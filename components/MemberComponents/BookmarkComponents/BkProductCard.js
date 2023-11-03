import React from "react"
import styles from "@/styles/product.module.css"
import Image from "next/image"
import { BiTrash } from "react-icons/bi"
import Link from "next/link"

export default function BkProductCard({
  pName,
  pPrice,
  inventory,
  img,
  onShelves,
  pid,
  handleDel
}) {
  const date = new Date() - new Date(onShelves)
  // console.log(date / (1000 * 60 * 60 * 24))

  return (
    <>
      <div className={styles.cardContainer}>
        <div>
          <Link href={`/product/${pid}`}>
            <div className={styles.tagContainer}>
              {(new Date() - new Date(onShelves)) / 1000 / 60 / 60 / 24 <=
              15 ? (
                <span className={styles.tag}>新上架</span>
              ) : (
                ""
              )}

              {inventory <= 5 ? (
                inventory == 0 ? (
                  <span className={styles.tag}>缺貨中</span>
                ) : (
                  <span className={styles.tag}>即將售罊</span>
                )
              ) : (
                ""
              )}
            </div>

            <Image
              width={320}
              height={400}
              className={styles.photo}
              src={`/images/pimg/${img}`}
              alt="product-image"
            />
            <p className={styles.pTitle}>{pName}</p>
            <p className={styles.price}>NTD {pPrice}</p>
          </Link>
        </div>
        <BiTrash className={styles.trashcan}></BiTrash>
        <div pid={pid} className={styles.trashcan} onClick={handleDel}></div>
      </div>
    </>
  )
}
