import React, { useEffect, useState } from "react"
import Layout from "@/components/Layouts/Layout"
import DatePick from "@/components/CampSiteComponents/DatePick.js"
import Option from "@/components/CampSiteComponents/Option.js"
import Weather from "@/components/CampSiteComponents/Weather.js"
import CarouselWall from "@/components/CampSiteComponents/CarouselWall.js"
import { BsFillGeoAltFill } from "react-icons/bs"
import { BsFillStarFill } from "react-icons/bs"
import { LuListRestart } from "react-icons/lu"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useRouter } from "next/router.js"
import { scroller } from "react-scroll" // 點擊滾動套件。
import s from "@/pages/campSite/css/site.module.css" //* CSS
import SimpleLoadingDot from "@/pages/product/SimpleLoadingDot"
import Head from "next/head"

export default function Site() {
  //! |---------- 狀態管理區  。 ----------|
  const [campArea, setCampArea] = useState({ campName: "露營區" }) // "露營區"
  const [tents, setTents] = useState([]) // 帳棚人數的價錢。
  const [optionTotal1, setOptionTotal1] = useState({}) // 露營區對應方案。
  const [campPriceTotal, setCampPriceTotal] = useState([]) // 露營區 價錢。
  const [datePickCampOffDay, setDatePickCampOffDay] = useState([]) // 露營區 營休日
  const [optionCart, setOptionCart] = useState({}) //* Option 元件 購物車。
  const [datePickCart, setDatePickCart] = useState({}) //* DatePick 元件 購物車。
  //! |---------- 狀態管理區  。 ----------|
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [])
  //* 引入路由 導入資料
  const router = useRouter()
  const [data, setData] = useState({
    campsite: [],
    option: []
  })
  //* 大營地 小營區 資料。
  const fetchCampID = async (cID) => {
    try {
      const res = await fetch(`http://localhost:3003/campSite/${cID}`)
      setData(await res.json())
    } catch (ex) {
      console.log(ex)
    }
  }
  useEffect(() => {
    if (router.isReady) {
      const { cID } = router.query
      fetchCampID(cID)
    }
  }, [router.isReady]) // router.isReady 必加否則會抓不到資料

  //# Swiper 輪播牆套件圖片陣列。加入檔名xx.jpg
  const imgArrPicture = []
  // useEffect(() => {
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 50) + 1 // 產生1到50的隨機整數
    imgArrPicture.push(`p${random}.jpg`)
  }
  // }, [])

  //# scroller 跳轉按鈕函示。
  const GOGOClick = () => {
    scroller.scrollTo("element-to-scroll-to", {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart"
    })
  }
  //* 最早可預定日期: {AvailableDays}
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const twoWeekAgo = new Date(today - 86400000 * 14)
  const AvailableDays = twoWeekAgo.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })

  //* 讀取data資料 -> 篩選出最低價錢。
  const [minPrice, setMinPrice] = useState(0)
  useEffect(() => {
    if (data.campsite.length > 0) {
      //! 使用符號 + 來讓 string 轉型成 number
      const initialPrice = +data.campsite[0].price
      setMinPrice(
        data.campsite.reduce(
          (a, b) => (+a < +b.price ? a : b.price),
          initialPrice
        )
      )
    }
  }, [data])
  //#---------- 讀取所需的資料 ----------#
  //* 露營區 。
  const typeName = data.campsite.map((v) => v.typeName)
  //* 露營區 營區價錢
  const campPrice = data.campsite.map((v) => {
    const { typeName, price } = v
    return { typeName, price }
  })
  //* 露營區 營休日
  const campOffDay = data.campsite.map((v) => {
    const { typeName, offDay } = v
    return { typeName, offDay }
  })
  //* 露營區名稱 && 方案價錢  && 方案名稱 #使用 解構賦值
  const optionNameAndPrice = data.option.map((v) => {
    const { campgroundAdditionalOptionsID, typeName, optionName, optionPrice } =
      v
    return { campgroundAdditionalOptionsID, typeName, optionName, optionPrice }
  })

  //# 設定給子元素 方法使用 讀取選到的 露營區 帳數 方案 。
  // 露營區
  const campAreaOnclick = (v) => setCampArea(v)
  // 帳數
  const tentsOnClick = (v) => setTents(v)
  // 方案
  const optionTotalNum = (v) => setOptionTotal1(v)
  useEffect(() => {
    //* 篩選 露營區 對應的 方案選項。  露營區 --> 方案選項
    const campOption = optionNameAndPrice.filter(
      (v) => v.typeName === campArea.campName
    )
    const data = campOption.map((v) => {
      return { ...v, num: 0 }
    })
    setOptionTotal1(data)
  }, [campArea.campName])
  //* 露營區  價錢
  const campPricePick = (v) => setCampPriceTotal(v)
  useEffect(() => {
    //* 露營區 營區價錢 campPrice
    const campDatePrice = campPrice.filter(
      (v) => v.typeName === campArea.campName
    )
    const data = campDatePrice.map((v) => {
      const { typeName, price } = v
      return { typeName, price }
    })
    setCampPriceTotal(data)
  }, [campArea.campName])
  //* 露營區 DatePick 營休日
  const campOffDayDatePick = (v) => setDatePickCampOffDay(v)
  useEffect(() => {
    //* 篩選 露營區 DatePick 營休日。  露營區 --> 營休日
    const offDay = campOffDay.filter((v) => v.typeName === campArea.campName)
    const data = offDay.map((v) => {
      const { typeName, offDay } = v
      return { typeName, offDay }
    })
    setDatePickCampOffDay(data)
  }, [campArea.campName])
  //# 購物車。
  const OptionGoToCart = (v) => setOptionCart(v)
  useEffect(() => {
    setOptionCart(optionCart)
  }, [campArea])
  const DatePickGoToCart = (v) => setDatePickCart(v)
  useEffect(() => {}, [campArea])
  //# 天氣API 地區。
  //* 傳遞縣市給子元素
  const weatherCity = [...new Set(data.campsite.map((v) => v.city))]
  // console.log("160-------------------", weatherCity)
  console.log(data)
  //# Google Map API
  const mapAPI = [...new Set(data.campsite.map((v) => v.campgroundAddress))]
  console.log(mapAPI)
  // TODO -> RETURN.
  return isLoading ? (
    <div>
      <SimpleLoadingDot />
    </div>
  ) : (
    data.campsite.length > 0 && (
      <Layout contentTitle="營地細項">
        <Head>
          <title>
            {data.campsite[0].EWSN} | {data.campsite[0].campgroundName}
          </title>
        </Head>
        <div>
          <CarouselWall imgArr={imgArrPicture} />
        </div>
        <div className={s.siteScope}>
          <div className={s.textArea}>
            <div className={s.titleM}>
              {data.campsite[0].EWSN} | {data.campsite[0].campgroundName}
            </div>
            <div className={s.textScope}>
              {/* <p>
                <BsFillStarFill className="iconML" />
                4.5
              </p> */}
              <p>
                <BsFillGeoAltFill className="iconML" />
                {data.campsite[0].campgroundAddress}
              </p>
              <ul className={s.textUl}>
                <li>在全州韓屋村感受韓國傳統建築的歷史豐富性。</li>
                <li>
                  長泰山和大屯山是韓國的一顆隱藏的寶石，全年都會讓您著迷於其迷人的風景。
                </li>
                <li>
                  乘坐無憂班車前往韓國山脈和全州韓屋村的迷人自然美景，遠離首爾的喧囂。
                </li>
                <li>
                  現在是體驗長泰山、大屯山和全州韓屋村令人驚嘆的美景的最佳時機！
                </li>
              </ul>
            </div>
          </div>

          <div className={s.priceScope}>
            <p className={s.priceText}>
              NTD {minPrice} <span style={{ fontSize: "22px" }}>起</span>
            </p>
            <button className={s.btnText} type="button" onClick={GOGOClick}>
              選擇方案
            </button>
          </div>
        </div>
        {/* 輪播牆加上方案內容到此 */}
        {/* 日曆加上方案從這邊開始 */}
        <div className={s.boxLine}>
          {/* (這邊動態變化露營區) */}
          <div className={s.titleM}>
            {data.campsite[0].campgroundName} | {campArea.campName}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            最早可預定日期: {AvailableDays}
          </div>
        </div>
        <div className={s.dateOption}>
          <p id="element-to-scroll-to">選擇日期、選項</p>
          {/* <p>
            <LuListRestart className={s.remake} type="button" />
            全部重選
          </p> */}
        </div>
        {/* 日曆 && 方案*/}
        <div className={s.doArea}>
          {/* 日曆元件 */}
          <DatePick
            Price={campPriceTotal}
            offDay={datePickCampOffDay}
            // campPricePick={campPricePick}
            //campOffDayDatePick={campOffDayDatePick}
            DatePickGoToCart={setDatePickCart}
          />
          {/* 方案元件 */}
          <Option
            // Area={typeName}
            Area={campPrice}
            Option={optionTotal1}
            campAreaClick={campAreaOnclick}
            tentsClick={tentsOnClick}
            optionTotalNum={optionTotalNum}
            OptionGoToCart={setOptionCart}
            DatePickGoToCart={datePickCart}
            CampgroundName={data.campsite[0].campgroundName}
          />
        </div>
        {/* 天氣API && Google Map API */}
        {/* 天氣卡片元件 */}{" "}
        <div className={s.dateOption} style={{ marginTop: "100px" }}>
          <p>{weatherCity} | 一周天氣</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Weather weatherCity={weatherCity} />
        </div>
        {/* Google Map */}
        <div className={s.googleMap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.004603539625!2d121.54083797698765!3d25.033917838291913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd379a5ec97%3A0xedc006d25a9e35df!2z6LOH5bGV5ZyL6Zqb6IKh5Lu95pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1695731341239!5m2!1szh-TW!2stw"
            width="100%"
            height="600px"
            style={{ border: "0", marginTop: "16px" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <GoogleMapDemo addressAPI={mapAPI} /> */}
          {/* <Gmap /> */}
        </div>
        <div>
          <p className={s.shopInfo}>營業時間: 09:00 ~ 17:00</p>
          <p className={s.shopInfo}>聯繫號碼: 09-12345678</p>
          <p className={s.shopInfo}>客服時間: 09:00~12:00、13:00~17:00</p>
        </div>
        <div className={s.shopInfo2}>
          <p>注意事項</p>
          <ul style={{ listStyleType: "disc" }}>
            <li>園區露營者需將車輛停至指定營位或停車場</li>
            <li>
              園區內提供接電服務（延長線需自備），另有乾濕分離衛浴設施，24
              小時供應熱水（本衛浴僅供露友盥洗沐浴用，拜託勿做其它使用）。
            </li>
            <li>
              垃圾煙蒂請勿落地，並於離園前將垃圾分類整理，放置於指定垃圾桶內。
            </li>
          </ul>
        </div>
      </Layout>
    )
  )
}
