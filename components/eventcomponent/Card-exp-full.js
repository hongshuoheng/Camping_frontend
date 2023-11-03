import React, { useContext, useState } from "react"
import { BsFillGeoAltFill } from "react-icons/bs"
import { BsHeartFill } from "react-icons/bs"
import { BsHeart } from "react-icons/bs"
import styles from "./Card.module.css"
import Link from "next/link"
import AuthContext from "@/context/AuthContext"

import {
  addBookmark_event,
  delBookmark_event
} from "@/public/utilities/bookmarkFunc"

export default function CardExpFull({
  id,
  maplocation,
  title,
  fullIntro,
  img,
  click,
  isHeart,
  //父層存下來  如何存愛心的id
  handleHeart,
  //父層存下來  如何判斷新增還是刪除
  setHeartDel
}) {
  const [heart, setHeart] = useState(false)
  const { auth, getToken } = useContext(AuthContext)
  const heartClick = async () => {
    if (!isHeart) {
      console.log("123123", auth.token, id)
      //登入才有TOKEN
      const res = await addBookmark_event(id, auth.token)
      console.log(res)
      handleHeart()
      // setHeartData({ id })
      // setHeartDel("add")
    } else {
      const res = await delBookmark_event(id, auth.token)
      console.log(res)
      handleHeart()
      // setHeartData({ id })
      // setHeartDel("del")
    }
  }

  return (
    <div className={styles.cardScope}>
      {isHeart ? (
        <div
          className={styles.iconH}
          onClick={heartClick}
          style={{ cursor: "pointer" }}
        >
          {/* <BsHeartFill /> */}
        </div>
      ) : (
        <div className={styles.iconR} onClick={heartClick}>
          {/* <BsHeart /> */}
        </div>
      )}

      <Link href={`/offevent/${id}`}>
        <div className={styles.card}>
          <div className={styles.iconScope}>
            <div className={styles.iconL}>
              {/* <BsFillGeoAltFill className={styles.iconML} />
              {maplocation} */}
            </div>
            <div className={styles.imgcontainer}>
              <div className={styles.imgfull}>已額滿</div>

              <img
                src={`/eventsimg/${img}`}
                className={styles.imgQ}
                alt="..."
                style={{ filter: "brightness(0.3)" }}
              />
            </div>
          </div>

          <div>
            <div className={styles.cardBody}>
              <span>
                <BsFillGeoAltFill />
                {maplocation}
              </span>
              <span>瀏覽人次：{click}人</span>
            </div>
            <h3 className={styles.cardBody}>{title}</h3>
            <p className={styles.cardBody}>{fullIntro}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
