import React from "react"
import Image from "next/image"
// Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay, FreeMode } from "swiper/modules"

export default function CarouselWall({ imgArr }) {
  //! Swiper 輪播牆套件圖片陣列。
  // const imgArr = ["p1.jpg", "p2.jpg", "p3.jpg", "p1.jpg", "p2.jpg", "p3.jpg"]

  return (
    <Swiper
      freeMode={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        waitForTransition: true,
        pauseOnMouseEnter: true
      }}
      loop={true}
      centeredSlides={true}
      slidesPerView={1.7}
      // spaceBetween={30}
      modules={[Autoplay, FreeMode]}
      className="mySwiper"
    >
      {/* <Image
        width={824.81}
        height={549.88}
        className={s.imgItem}
        src={`/campSite-Img/p${9}.jpg`}
        alt="campSite-Img"
      /> */}
      {imgArr.map((v, i) => {
        return (
          <SwiperSlide key={i}>
            <Image
              width={824.81}
              height={549.88}
              style={{ maxWidth: " 90%" }}
              src={`/campSite-img/${v}`}
              alt="campSite-Img"
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
