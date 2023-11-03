import { useEffect, useState } from "react"
import Layout from "@/components/Layouts/Layout"
import styles from "./css/front.module.css"
import FrontCard from "@/components/eventcomponent/frontCard"
import Link from "next/link"
export default function FirstPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:3003/event/front")
      .then((r) => r.json())
      .then((data) => {
        setData(data)
      })
  }, [])
  //點擊送入資料庫更新
  const updateClick = (id) => {
    fetch("http://localhost:3003/event/front", {
      method: "POST",
      credentials: "include", // 需傳送 Cookie 必須開啟
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ id })
    })
      .then((r) => r.json())
      .then((data) => {
        // setData(data)
        // 初始狀態下顯示所有活動
      })
  }
  console.log(data)
  return (
    <Layout pageTitle={"活動"} contentTitle={"活動資訊"}>
      <div className={styles.first}>
        <div className={styles.Box}>
          {data.map((item) => {
            const sqlDate = item.registration_start_time
            const jsDate = new Date(sqlDate)
            const formattedDate = jsDate.toLocaleDateString()
            return (
              <div
                className={styles.box1}
                key={item.id}
                onClick={() => updateClick(item.id)}
              >
                <FrontCard
                  id={item.events_id}
                  title={item.title}
                  registration_start_time={formattedDate}
                  img={item.img_file}
                />
              </div>
            )
          })}

          <div className={styles.btnbox}>
            <Link href={"/offevent/"} className={styles.btnbox}>
              更多活動
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
