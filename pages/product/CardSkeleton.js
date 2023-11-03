import React from "react"
import styles from "@/styles/CardSkeleton.module.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { BsImage } from "react-icons/bs"

export default function CardSkeleton({ cards }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((item, i) => (
          <SkeletonTheme
            baseColor={"#ffffff"}
            highlightColor="#e8e8e8"
            key={"card" + i}
          >
            <div className={styles.cardContainer}>
              <div className={styles.tagContainer}>
                <Skeleton width={60} height={24} />
              </div>
              <div className={styles.photo}>
                <BsImage color={"#e8e8e8"} size={160} />
              </div>

              <p className={styles.pTitle}>
                <Skeleton width={250} height={20} />
                <Skeleton width={100} height={20} />
              </p>

              <p className={styles.price}></p>
            </div>
          </SkeletonTheme>
        ))}
    </>
  )
}
