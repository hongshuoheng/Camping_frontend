import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import Link from "next/link"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "@/styles/homepage.module.css"
import LayoutBg from "@/components/Layouts/LayoutBg"
import HomePageHeading from "./HomePageHeading"
import FirstPage from "../offevent/front"

export default function MainHomePage() {
  const arr = [
    {
      sub1: "高海拔登山好夥伴",
      sub2: "GUSTAV 6P 高海拔登山帳篷",
      sub3: "壓倒性的抗風性和舒適性",
      img: "homepage_1.jpg",
      link: "/product/43"
    },
    {
      sub1: "A/W 23 全新上市",
      sub2: "THE NORTH FACE PARKA 系列",
      sub3: "入冬保暖首選",
      img: "homepage_2.avif",
      link: "/product/39"
    },
    {
      sub1: "Quecha系列後背包",
      sub2: "QUECHA趣岳雨天防水後背包",
      sub3: "防潑水材質可抵禦突發小雨",
      img: "homepage_3.jpg",
      link: ""
    },
    {
      sub1: "露營生活嚴選",
      sub2: "超實用露營用具系列",
      sub3: "絕對神速搭營",
      img: "homepage_4.jpg",
      link: ""
    },
    {
      sub1: "1人即可輕鬆搭篷",
      sub2: "COLEMAN 大型網屋帳篷",
      sub3: "好評販售中",
      img: "homepage_5.jpg",
      link: ""
    },
    {
      sub1: "露營生活會員回饋",
      sub2: "線下活動開放報名中",
      sub3: "名額有限!",
      img: "homepage_6.jpg",
      link: ""
    }
  ]
  return (
    <>
      <LayoutBg pageTitle="首頁 | 露營生活">
        <Swiper
          style={{
            "--swiper-pagination-color": "#ffffff"
          }}

          loop={true}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={true}
          navigation={false}
          pagination={{
            clickable: true
          }}
          modules={(Autoplay, Pagination, Navigation, EffectFade)}
          effect={"fade"}
          className="mySwiper"
        >
          {/* 設定圖片大小 */}
          {arr.map((v, i) => (
            <>
              <SwiperSlide key={i}>
                <Link href={v.link}>
                  <div className={styles.slideHeadingContainer}>
                    <div className={styles.subHeading}>{v.sub1}</div>
                    <div className={styles.mainHeading}>{v.sub2}</div>
                    <div className={styles.subHeading}>{v.sub3}</div>
                  </div>
                </Link>

                <img
                  className={styles.photo}
                  src={`/images/homepage/${v.img}`}
                />
              </SwiperSlide>
            </>
          ))}

          <HomePageHeading count={arr.length} />
        </Swiper>
      </LayoutBg>
    </>
  )
}
