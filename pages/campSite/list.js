import React, { useEffect, useState } from "react"
import Link from "next/link"
import Layout from "@/components/Layouts/Layout"
import s from "@/pages/campSite/css/list.module.css"
import CardEx from "@/components/CampSiteComponents/Card-ex"
import { useRouter } from "next/router"
import CardSkeleton from "@/components/CampSiteComponents/Card-Skeleton"
import Head from "next/head"

export default function Site() {
  const [campGroundID, setCampGroundID] = useState([])
  const [copyData, setCopyData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ewsn, setEwsn] = useState("")
  // console.log(campGroundID)
  // console.log(copyData)
  //* EWSN
  useEffect(() => {
    if (ewsn === "全部") {
      setCopyData(campGroundID)
    } else {
      const filterEWSN = campGroundID.filter((v) => {
        return v.EWSN === ewsn
      })
      setCopyData(filterEWSN)
    }
  }, [ewsn])

  console.log(copyData)

  useEffect(() => {
    fetch("http://localhost:3003/campSite")
      .then((res) => res.json())
      .then((result) => {
        setCampGroundID(result)
        setCopyData(result)
      })
      .catch((error) => console.log(error))
  }, [])
  //* isLoading
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }
  }, [ewsn])

  return (
    <Layout contentTitle="探索全台營地">
      <Head>
        <title>探索全台營地</title>
      </Head>

      <div className={s.titleScope}>
        {/* <h1 className={s.titleM}>探索全台營地</h1> */}
        <div className={s.titleS}>
          <span>
            <Link
              href="#"
              onClick={() => {
                setEwsn("全部")
                setIsLoading(true)
              }}
            >
              全部
            </Link>{" "}
            |{" "}
          </span>
          <span>
            <Link
              href="#"
              onClick={() => {
                setEwsn("北台灣")
                setIsLoading(true)
              }}
            >
              北台灣
            </Link>{" "}
            |{" "}
          </span>
          <span>
            <Link
              href="#"
              onClick={() => {
                setEwsn("中台灣")
                setIsLoading(true)
              }}
            >
              中台灣
            </Link>{" "}
            |{" "}
          </span>
          <span>
            <Link
              href="#"
              onClick={() => {
                setEwsn("南台灣")
                setIsLoading(true)
              }}
            >
              南台灣
            </Link>{" "}
            |{" "}
          </span>
          <span>
            <Link
              href="#"
              onClick={() => {
                setEwsn("東台灣")
                setIsLoading(true)
              }}
            >
              東台灣
            </Link>{" "}
            |{" "}
          </span>
        </div>
      </div>
      <div className={s.cardArea}>
        {isLoading && <CardSkeleton cards={16} />}{" "}
        {/* {campGroundID.map((v, i) => { */}
        {copyData.map((v, i) => {
          return (
            <CardEx
              key={v.campGroundID}
              cID={v.campGroundID} // 營地ID campGroundID
              EWSN={v.EWSN} // 東西南北 台灣
              city={v.city} // 各縣市 - 宜蘭縣
              site={v.site} // 各區鄉鎮 - 礁溪
              campname={v.campgroundName} // 營地名稱
              desc={v.campgroundDescription} // 營地簡述
              elevation={v.elevation} // 海拔
              ntd={v.minPrice} // 最低價
              Img={v.IMG}
            />
          )
        })}
      </div>
    </Layout>
  )
}
