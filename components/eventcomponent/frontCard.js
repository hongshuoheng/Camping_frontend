import Link from "next/link"
import styles from "./frontCard.module.css"
import { useEffect, useState } from "react"

export default function FrontCard({ title, registration_start_time, img, id }) {
  return (
    <div className={styles.container}>
      <Link href={`/offevent/${id}`}>
        <img src={`/eventsimg/${img}`} alt="" className={styles.imgBox} />
        <div className={styles.link}>{title}</div>
      </Link>
      <div className={styles.line}>
        <Link href={`/offevent/${id}`}>
          <span className={styles.span}>閱讀更多</span>
        </Link>
        <div className={styles.line1}>
          <p>報名開始日期</p>
          <p>|</p>
          <p>{registration_start_time}起</p>
        </div>
      </div>
    </div>
  )
}
