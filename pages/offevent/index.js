import { useEffect, useState } from "react"
import Layout from "@/components/Layouts/Layout"
import styles from "./css/events.module.css"
import CardExp from "@/components/eventcomponent/Card-exp"
import { Element } from "react-scroll"
import ScrollTopButton from "@/components/eventcomponent/ScrollTopButton"
import CardExpFull from "@/components/eventcomponent/Card-exp-full"
import { Pagination, Keyboard, Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css"
import Link from "next/link"
import AuthContext from "@/context/AuthContext"
import { useContext } from "react"
import SimpleLoadingDot from "@/components/eventcomponent/SimpleLoadingDot"
//增加愛心的參數ID

export default function EventPage() {
  const [data, setData] = useState({ sqlHeart: [], sqlAll: [] })
  const [heartData, setHeartData] = useState()
  const { auth, getToken } = useContext(AuthContext)
  //儲存的愛心陣列
  const [heartState, setHeartState] = useState([])
  //走刪除或是增加愛心的判斷方式
  const [heartDel, setHeartDel] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const handleHeart = (id) => {
    if (heartState.includes(id)) {
      setHeartState(heartState.filter((v) => v != id))
    } else {
      let newHeartState = [...heartState]
      newHeartState.push(id)
      setHeartState(newHeartState)
    }
  }
  useEffect(() => {
    fetch("http://localhost:3003/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token
      },
      // body: JSON.stringify({ user_id: auth.user_id })
      body: JSON.stringify({ user_id: 4 })
    })
      .then((r) => r.json())
      .then((data) => {
        setData(data)
        const heart = data.sqlHeart.map((v) => v.events_id)
        setHeartState(heart)
      })
    // if (heartData && heartDel == "add") {
    //   data.sqlHeart.push(heartData)
    //   setData({
    //     sqlHeart: data.sqlHeart,
    //     sqlAll: data.sqlAll
    //   })
    //   const heart = data.sqlHeart.length ? data.sqlHeart.map((v) => v.id) : []
    //   setHeartState(heart)
    // }
    // if (heartData && heartDel == "del") {
    //   //篩選刪除過後的陣列
    //   const dle = data.sqlHeart.filter((item) => {
    //     //篩選的判斷方式
    //     if (item.id !== heartData.id) {
    //       return item
    //     }
    //   })
    //   console.log(dle)
    //   setData({
    //     //篩回去原本的資料
    //     sqlHeart: dle,
    //     sqlAll: data.sqlAll,
    //     totalPages: data.totalPages
    //   })
    //   //判斷原本愛心的陣列，篩回去原本的愛心賦值
    //   const heart = dle.length ? dle.map((v) => v.id) : []
    //   setHeartState(heart)
    // }
  }, [heartData])
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [])
  //點擊送入資料庫更新
  const updateClick = (id) => {
    fetch("http://localhost:3003/event/s", {
      method: "POST",
      credentials: "include", // 需傳送 Cookie 必須開啟
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then((r) => r.json())
      .then((data) => {
        // setData(data)
        // 初始狀態下顯示所有活動
      })
  }
  console.log(data)
  //
  return isLoading ? (
    // 如果還在載入，顯示載入動畫或其他視覺提示
    // 這裡可以放你的載入動畫組件或提示
    <div>
      <SimpleLoadingDot />
    </div>
  ) : (
    <Layout pageTitle={"活動推薦"} contentTitle={"活動推薦"}>
      <>
        {/* ScrollTopButton 的 Element 包裹 */}
        <Element name="top" />
        <>
          <span className={styles.span}>熱門 </span>

          <div className={styles.cardArea}>
            <Swiper
              slidesPerView={4.5}
              slidesPerGroup={3}
              pagination={{
                clickable: true
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              navigation={true}
              modules={[Keyboard, Pagination, Autoplay, Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bottom": "90px",
                "--swiper-navigation-top": "100px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.click > 0)
                .sort((a, b) => b.click - a.click)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
            <Link href="/offevent/category" className={styles.button}>
              <span>查看所有體驗活動 </span>
            </Link>
          </div>
          <div className={styles.copy}>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true
              }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              modules={[Keyboard, Pagination, Autoplay]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#9f9f9f",
                "--swiper-pagination-color": "#ffffff",
                "--swiper-pagination-bottom": "80px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.click > 0)
                .sort((a, b) => b.click - a.click)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          {/* 北部開始 */}
          <div className={styles.line}>
            <div className={styles.line1}>
              <span className={styles.span}>北部</span>
            </div>
          </div>
          <div className={styles.cardArea1}>
            <Swiper
              slidesPerView={4.5}
              slidesPerGroup={3}
              pagination={{
                clickable: true
              }}
              // autoplay={{
              //   delay: 1000,
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true
              // }}
              // loop={true}
              navigation={true}
              modules={[Keyboard, Pagination, Autoplay, Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bottom": "90px",
                margin: "0 0px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 1)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          <div className={styles.copy}>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true
              }}
              modules={[Keyboard, Pagination, Autoplay]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#ffffff",
                "--swiper-pagination-bottom": "80px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 1)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          {/* 中部開始 */}
          <div className={styles.line}>
            <div className={styles.line1}>
              <span className={styles.span}>中部</span>
            </div>
          </div>
          <div className={styles.cardArea1}>
            <Swiper
              slidesPerView={4.5}
              slidesPerGroup={3}
              pagination={{
                clickable: true
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Autoplay, Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bottom": "90px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 2)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          <div className={styles.copy}>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true
              }}
              // autoplay={{
              //   delay: 1000,
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true
              // }}
              // loop={true}
              modules={[Keyboard, Pagination, Autoplay]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bottom": "80px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 2)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          {/* 南部開始 */}
          <div className={styles.line}>
            <div className={styles.line1}>
              <span className={styles.span}>南部</span>
            </div>
          </div>
          <div className={styles.cardArea1}>
            <Swiper
              slidesPerView={4.5}
              slidesPerGroup={3}
              pagination={{
                clickable: true
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Autoplay, Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bottom": "90px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 3)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          <div className={styles.copy}>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true
              }}
              // autoplay={{
              //   delay: 1000,
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true
              // }}
              // loop={true}
              modules={[Keyboard, Pagination, Autoplay]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#ffffff",
                "--swiper-pagination-bottom": "80px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 3)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          {/* 花東開始 */}
          <div className={styles.line}>
            <div className={styles.line1}>
              <span className={styles.span}>花東</span>
            </div>
          </div>
          <div className={styles.cardArea1}>
            <Swiper
              slidesPerView={4.5}
              slidesPerGroup={3}
              pagination={{
                clickable: true
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Autoplay, Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bottom": "90px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 4)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          <div className={styles.copy}>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true
              }}
              // autoplay={{
              //   delay: 1000,
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true
              // }}
              // loop={true}
              modules={[Keyboard, Pagination, Autoplay]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#ffffff",
                "--swiper-pagination-bottom": "80px"
              }}
            >
              {data.sqlAll
                .filter((item) => item.store_id == 4)
                .slice(0, 10)
                .map((item, i) => {
                  return (
                    <SwiperSlide
                      key={item.events_id}
                      className={styles.iconScope}
                      onClick={() => updateClick(item.id)}
                    >
                      {item.remaining_slots == 0 ? (
                        <CardExpFull
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          setHeartData={setHeartData}
                          setHeartDel={setHeartDel}
                        />
                      ) : (
                        <CardExp
                          id={item.id}
                          maplocation={item.maplocation}
                          title={item.title}
                          fullIntro={item.fullIntro}
                          img={item.img_file}
                          click={item.click}
                          isHeart={heartState.includes(item.id)}
                          handleHeart={() => {
                            handleHeart(item.id)
                          }}
                          setHeartDel={setHeartDel}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          {/* ScrollTopButton 放在頁面最下方 */}
          <ScrollTopButton />
        </>
      </>
    </Layout>
  )
}
