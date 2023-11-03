import React from "react"
import { useSwiper } from "swiper/react"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"

export default function SwiperButtons() {
  const swiper = useSwiper()
  return (
    <>
      <MdKeyboardArrowLeft
        onClick={() => {
          swiper.slidePrev()
        }}
        size={40}
      />
      <MdKeyboardArrowRight
        onClick={() => {
          swiper.slideNext()
        }}
        size={40}
      />
    </>
  )
}
