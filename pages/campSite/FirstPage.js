import React from "react"
import Layout from "@/components/Layouts/Layout"
import Link from "next/link"
import s from "./css/firstpage.module.css"
import Image from "next/image"
// 套件
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay, FreeMode } from "swiper/modules"

//   Image 參數
//   <Image
//   width={833.81}
//   height={555.88}
//  className={s.imgBox}
//   src={"/campSite-Img/p5.jpg"}
//   alt="campSite-Img"
//   />

export default function FirstPage() {
  return (
    <Layout>
      <h2 className={s.h2}>精選營地 </h2>
      <Swiper
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          waitForTransition: true,
          pauseOnMouseEnter: true
        }}
        loop={true}
        centeredSlides={true}
        slidesPerView={1.7}
        modules={[Autoplay, FreeMode]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            width={833.81}
            height={555.88}
            className={s.imgBox}
            src={"/campSite-Img/p1.jpg"}
            alt="campSite-Img"
          />
          {/* <img src="/campSite-img/p1.jpg" alt="" className={s.imgBox} /> */}
          <div className={s.line}>
            <div>
              潺潺森活：聆聽溪水聲，感受大自然的和諧，度過寧靜的露營時光。
            </div>
            <Link href="#">More</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={833.81}
            height={555.88}
            className={s.imgBox}
            src={"/campSite-Img/p2.jpg"}
            alt="campSite-Img"
          />
          {/* <img src="/campSite-img/p2.jpg" alt="" className={s.imgBox} /> */}
          <div className={s.line}>
            <div>嶺秀休閒：壯觀山景，理想的度假勝地，讓您放鬆身心。</div>
            <Link href="#">More</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={833.81}
            height={555.88}
            className={s.imgBox}
            src={"/campSite-Img/p3.jpg"}
            alt="campSite-Img"
          />
          {/* <img src="/campSite-img/p3.jpg" alt="" className={s.imgBox} /> */}
          <div className={s.line}>
            <div>山田露營區：壯觀山區景色，適合放鬆和探險。</div>
            <Link href="#">More</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={833.81}
            height={555.88}
            className={s.imgBox}
            src={"/campSite-Img/p4.jpg"}
            alt="campSite-Img"
          />
          {/* <img src="/campSite-img/p4.jpg" alt="" className={s.imgBox} /> */}
          <div className={s.line}>
            <div>巴卡的天空：開闊的天空視野，欣賞星空和自然美景。</div>
            <Link href="#">More</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={833.81}
            height={555.88}
            className={s.imgBox}
            src={"/campSite-Img/p5.jpg"}
            alt="campSite-Img"
          />
          {/* <img src="/campSite-img/p5.jpg" alt="" className={s.imgBox} /> */}
          <div className={s.line}>
            <div>吻吻露營區：浪漫氛圍，適合情侶或家庭享受愉快時光。</div>
            <Link href="#">More</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={833.81}
            height={555.88}
            className={s.imgBox}
            src={"/campSite-Img/p6.jpg"}
            alt="campSite-Img"
          />
          {/* <img src="/campSite-img/p6.jpg" alt="" className={s.imgBox} /> */}
          <div className={s.line}>
            <div>
              桃花源露營區：幽靜美地，如桃花源一樣寧靜，遠離塵囂的好去處。
            </div>
            <Link href="#">More</Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </Layout>
  )
}
