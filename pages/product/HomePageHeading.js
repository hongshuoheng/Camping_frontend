import React from "react"
import styles from "@/styles/HomePageHeading.module.css"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useSwiper } from "swiper/react"

export default function HomePageHeading({ count }) {
  const swiper = useSwiper()
  return (
    <>
      <div className={styles.pageHeadingContainer}>
        <div className={styles.slideControl}>
          <MdKeyboardArrowLeft
            className={styles.prevButton}
            onClick={() => swiper.slidePrev()}
            size={68}
          />
          {/* <p className={styles.currentPage}>1</p>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}></div>
          </div>
          <p className={styles.totalPage}>{count}</p> */}
          <MdKeyboardArrowRight
            className={styles.nextButton}
            onClick={() => swiper.slideNext()}
            size={68}
          />
        </div>
      </div>
    </>
  )
}
