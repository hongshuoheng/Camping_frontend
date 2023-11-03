import { useEffect, useState } from "react"
import Link from "next/link"
import Layout from "@/components/Layouts/Layout"
import styles from "./css/eventDetailed.module.css"
import { Element } from "react-scroll"
import ScrollTopButton from "@/components/eventcomponent/ScrollTopButton"
import { Pagination, Keyboard, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css"
import SimpleLoadingDot from "@/components/eventcomponent/SimpleLoadingDot"
import { scroller } from "react-scroll"
import { useRouter } from "next/router"

import SingleMapDetail from "@/components/eventcomponent/SingleMapDetail"
import GeocodeSearch from "@/components/eventcomponent/GeocodeSearch"
export default function EventDetail() {
  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)

  useEffect(() => {
    console.log(lat)
  }, [lat])

  useEffect(() => {
    console.log(lng)
  }, [lng])
  const router = useRouter()
  const [data, setData] = useState([])
  const [people, setPeople] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //獲取商品ID;
  console.log(router.query.eid)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEventDetail = async (eid) => {
    console.log(`http://localhost:3003/event/${router.query.eid}`)
    const res = await fetch(`http://localhost:3003/event/${eid}`)
    const data1 = await res.json()
    setData(data1.sql)
    setPeople(data1.peoplesql)
  }
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }
  }, [])
  useEffect(() => {
    if (router.isReady) {
      const { eid } = router.query
      fetchEventDetail(eid)
    }
  }, [router.isReady])
  console.log(people)
  console.log(data)
  const handleClick = () => {
    scroller.scrollTo("element-to-scroll-to", {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart"
    })
  }
  return isLoading ? (
    // 如果還在載入，顯示載入動畫或其他視覺提示
    // 這裡可以放你的載入動畫組件或提示
    <div>
      <SimpleLoadingDot />
    </div>
  ) : (
    data.length !== 0 && (
      <>
        <Element name="top" />

        <Layout
          pageTitle={"活動詳情"}
          contentTitle={"活動詳情"}
          bread={
            <span>
              <Link href={"/offevent/category"}>活動總覽</Link> / 活動詳情
            </span>
          }
        >
          {/* ScrollTopButton 的 Element 包裹 */}
          <div className={styles.container}>
            <div className={styles.swiper}>
              <Swiper
                slidesPerView={1}
                pagination={{
                  clickable: true
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
                style={{
                  "--swiper-navigation-color": "#9f9f9f",
                  "--swiper-pagination-color": "#9f9f9f",
                  "--swiper-pagination-bottom": "0px"
                }}
              >
                {data.map((v, i) => {
                  return (
                    <SwiperSlide className={styles.iconScope} key={i}>
                      <img
                        src={`/eventsimg/${v.img_file}`}
                        alt=""
                        className={styles.img}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div className={styles.text}>
              <h1 className={styles.h1}>{data[0].title}</h1>

              <p>{data[0].fullIntro}</p>
              <div className={styles.text1}>
                <p>活動地址 :{data[0].location}</p>
                <p>
                  舉辦日期 : {data[0].event_start} 時間 {data[0].evets_time}
                </p>
              </div>
              <div className={styles.icon1}>
                <div className={styles.icon}>
                  {/* <BsInstagram className={styles.icon} /> */}
                  {/* <p>@camplife_taipei101</p> */}
                </div>
                <div className={styles.icon}>
                  {/* <BsBrowserSafari className={styles.icon} /> */}
                  {/* <p>@camplife_taipei101</p> */}
                </div>
              </div>
              <div className={styles.people}>
                <span className={styles.span}>瀏覽次數：{data[0].click}人</span>
                {people[1].remaining_slots == 0 ? (
                  ""
                ) : (
                  <span>
                    剩
                    {people[1].remaining_slots == null
                      ? data[0].applicantlimitedqty
                      : people[1].remaining_slots}
                    人額滿
                  </span>
                )}
              </div>
              <div className={styles.button}>
                <div className={styles.button1} onClick={handleClick}>
                  活動地址
                </div>

                <div className={styles.buttoncontainer}>
                  {people[1].remaining_slots == 0 ? (
                    <div className={styles.button3} aria-disabled>
                      已額滿
                    </div>
                  ) : (
                    <Link
                      href={`/offevent/${router.query.eid}/registration-form`}
                      className={styles.button2}
                    >
                      報名
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.text2}>
            <p>{data[0].simpleIntro}</p>
          </div>
          <div className={styles.line}>
            <div className={styles.line1}></div>
          </div>

          <div className={styles.notice}>
            <p>活動說明</p>
            <ul>
              {data[0].EventDescription.split("。").map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
          <div className={styles.notice}>
            <ul>
              <li></li>
            </ul>
          </div>
          <div className={styles.notice}>
            <p>活動須知</p>
            <ul>
              {data[0].Activityinstructions.split("。").map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
          <div className={styles.notice}>
            <p>舉辦店家資訊</p>
            <ul>
              <li>分店名稱 / {data[0].store}</li>
              <li>店家地址 / {data[0].address}</li>
              <li>營業時間 / {data[0].business_hours}</li>
              <li>聯絡電話 / {data[0].phone}</li>
            </ul>
          </div>
          <div className={styles.notice}>
            <p id="element-to-scroll-to" style={{ margin: "20px 0" }}>
              地圖
            </p>
            <div
              style={{
                width: "1500px",
                height: "1000px",
                margin: "auto"
              }}
            >
              <GeocodeSearch
                setLat={setLat}
                setLng={setLng}
                address={data[0].location}
              />
              <SingleMapDetail
                lat={lat}
                lng={lng}
                infoTitle="測試"
                infoContent="this is a sample string"
              />
            </div>
          </div>
          {/* ScrollTopButton 放在頁面最下方 */}
          <ScrollTopButton />
        </Layout>
      </>
    )
  )
}
