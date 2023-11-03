import { useEffect, useState } from "react"
import Layout from "@/components/Layouts/Layout"
import styles from "./css/category.module.css"
import CardExp from "../../components/eventcomponent/Card-exp"
import CardExpFull from "@/components/eventcomponent/Card-exp-full"
import CardExpEvent from "@/components/eventcomponent/Card-exp-sklelton"
import { Element } from "react-scroll"
import ScrollTopButton from "@/components/eventcomponent/ScrollTopButton"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import AuthContext from "@/context/AuthContext"
import { useContext } from "react"

export default function Category() {
  const [data, setData] = useState({ sqlHeart: [], sqlAll: [], totalPages: 0 })
  const [location, setLocation] = useState("all")
  //增加愛心的參數ID
  const [heartData, setHeartData] = useState()
  const { auth, getToken } = useContext(AuthContext)
  //儲存的愛心陣列
  const [heartState, setHeartState] = useState([])
  //走刪除或是增加愛心的判斷方式
  const [heartDel, setHeartDel] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 16 // 設定每頁顯示的項目數量
  const handleHeart = (id) => {
    if (heartState.includes(id)) {
      setHeartState(heartState.filter((v) => v != id))
    } else {
      let newHeartState = [...heartState]
      newHeartState.push(id)
      setHeartState(newHeartState)
    }
  }
  const fetchTypeData = () => {
    fetch(
      `http://localhost:3003/event/category?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`
        },
        // body: JSON.stringify({ user_id: auth.user_id })
        body: JSON.stringify({ type: location })
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setData(data)
        const heart = data.sqlHeart.map((v) => v.events_id)
        setHeartState(heart)
      })
  }
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }
  }, [])
  useEffect(() => {
    if (auth.token) {
      fetchTypeData()
    }
    //判斷增加愛心或是刪除

    // if (heartData && heartDel == "add") {
    //   data.sqlHeart.push(heartData)
    //   setData({
    //     sqlHeart: data.sqlHeart,
    //     sqlAll: data.sqlAll,
    //     totalPages: data.totalPages
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

    // { sqlHeart: [], sqlAll: [], totalPages: 0 }
    // sqlHeart.push(heartData)
  }, [auth, currentPage, location, heartData, heartDel])

  //點擊送入資料庫更新
  const updateClick = (id) => {
    fetch("http://localhost:3003/event/categoryd", {
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
        // setFilteredData(data.all)
        // 初始狀態下顯示所有活動
      })
  }

  const handleLocationClick = async (selectedLocation) => {
    // all -> hot
    // all -> set hot -> fetch
    setLocation(selectedLocation)
    setCurrentPage(1)
  }
  const getLocationId = (location) => {
    switch (location) {
      case "north":
        return 1
      case "central":
        return 2
      case "south":
        return 3
      case "west":
        return 4

      default:
        return null
    }
  }

  const handleCurrentPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: "smooth" // 可以選擇是否要平滑捲動
    })
  }
  console.log(data)
  return (
    <>
      <Layout pageTitle={"活動總覽"} contentTitle={"活動總覽"}>
        {/* ScrollTopButton 的 Element 包裹 */}
        <Element name="top" />
        <div className={styles.container}>
          <ul className={styles.bar}>
            <li className={styles.nav_bar}>
              <a href="#" onClick={() => handleLocationClick("all")}>
                全部
              </a>
            </li>
            <span className={styles.nav_bar}>｜</span>
            <li className={styles.nav_bar}>
              <a href="#" onClick={() => handleLocationClick("hot")}>
                熱門
              </a>
            </li>
            <span className={styles.nav_bar}>｜</span>
            <li className={styles.nav_bar}>
              <a href="#" onClick={() => handleLocationClick("north")}>
                北部
              </a>
            </li>
            <span className={styles.nav_bar}>｜</span>
            <li className={styles.nav_bar}>
              <a href="#" onClick={() => handleLocationClick("central")}>
                中部
              </a>
            </li>
            <span className={styles.nav_bar}>｜</span>
            <li className={styles.nav_bar}>
              <a href="#" onClick={() => handleLocationClick("south")}>
                南部
              </a>
            </li>
            <span className={styles.nav_bar}>｜</span>
            <li className={styles.nav_bar}>
              <a href="#" onClick={() => handleLocationClick("west")}>
                花東
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardArea}>
            {isLoading && <CardExpEvent cards={12} />}
            {data.sqlAll.map((item, i) => {
              const isFull = data.sqlAll[i].remaining_slots == 0
              const shouldDisplay =
                location === "all" ||
                location === "hot" ||
                data.sqlAll[i].store_id === getLocationId(location)
              return shouldDisplay ? (
                <div
                  key={item.id}
                  className={styles.cardin}
                  onClick={() => updateClick(item.id)}
                >
                  {isFull ? (
                    <CardExpFull
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
                </div>
              ) : null
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px"
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={data.totalPages} // 使用總頁數
                page={currentPage} // 使用當前頁碼
                shape="rounded"
                onChange={(event, page) => {
                  handleCurrentPage(page)
                }}
              />
              {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
            </Stack>
          </div>
        </div>
        {/* ScrollTopButton 放在頁面最下方 */}
        <ScrollTopButton />
      </Layout>
    </>
  )
}
