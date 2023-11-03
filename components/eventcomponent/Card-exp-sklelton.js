import React, { useState } from "react"
import { BsFillGeoAltFill } from "react-icons/bs"
import { BsHeartFill } from "react-icons/bs"
import { BsHeart } from "react-icons/bs"
import styles from "./Card-sklelton.module.css"
import Link from "next/link"
import AuthContext from "@/context/AuthContext"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { BsImage } from "react-icons/bs"
import "react-loading-skeleton/dist/skeleton.css"
import { useContext } from "react"

import {
  addBookmark_event,
  delBookmark_event
} from "@/public/utilities/bookmarkFunc"
//活動收藏
export default function CardExpEvent({
  cards,
  id,
  maplocation,
  title,
  fullIntro,
  img,
  click,
  isHeart,
  //父層存下來  如何存愛心的id
  setHeartData,
  //父層存下來  如何判斷新增還是刪除
  setHeartDel
}) {
  const { auth, getToken } = useContext(AuthContext)

  const heartClick = async () => {
    if (!isHeart) {
      console.log("123123", auth.token, id)
      //登入才有TOKEN
      const res = await addBookmark_event(id, auth.token)
      console.log(res)
      setHeartData({ id })
      setHeartDel("add")
    } else {
      const res = await delBookmark_event(id, auth.token)
      console.log(res)
      setHeartData({ id })
      setHeartDel("del")
    }
  }
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((item, i) => (
          <SkeletonTheme
            baseColor={"#ffffff"}
            highlightColor="#e8e8e8"
            key={"card" + i}
          >
            <div className={styles.cardScope}>
              <Link href={`/offevent/${id}`}>
                <div className={styles.card}>
                  <div className={styles.iconScope}>
                    <div className={styles.icong}>
                      <BsImage color={"#fff"} size={280} />
                    </div>
                  </div>
                  <div>
                    <div className={styles.cardBody}>
                      <span>
                        <Skeleton width={120} height={24} />
                      </span>
                    </div>
                    <h3 className={styles.cardBody}>
                      <Skeleton width={200} height={24} />
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </SkeletonTheme>
        ))}
    </>
  )
}
