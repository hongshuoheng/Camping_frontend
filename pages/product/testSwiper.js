import styles from "@/styles/test.module.css"
import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules"

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className={styles.photo} src={"/images/img1.png"}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img className={styles.photo} src={"/images/img2.png"}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img className={styles.photo} src={"/images/img3.png"}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img className={styles.photo} src={"/images/img4.png"}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img className={styles.photo} src={"/images/img5.png"}></img>
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-next">
        <div> Next</div>
      </div>
    </>
  )
}
