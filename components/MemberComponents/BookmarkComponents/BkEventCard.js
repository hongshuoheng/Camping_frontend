import React from "react"
import { BsFillGeoAltFill } from "react-icons/bs"
import styles from "@/components/eventcomponent/Card.module.css"
import styles2 from "@/pages/member/bookmark/bookmark.module.css"
import Link from "next/link"
import { BiTrash } from "react-icons/bi"

export default function CardExp({
  id,
  maplocation,
  title,
  fullIntro,
  img,
  click,
  handleDel
}) {
  return (
    <div style={{ position: "relative" }} className={styles.cardScope}>
      <Link href={`/offevent/${id}`}>
        <div className={styles.card}>
          <div className={styles.iconScope}>
            <img src={`/eventsimg/${img}`} className={styles.imgP} alt="..." />
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
      <BiTrash
        style={{ top: "16px", right: "16px" }}
        className={styles2.trashcan}
      ></BiTrash>
      <div
        style={{ top: "16px", right: "16px" }}
        pid={id}
        className={styles2.trashcan}
        onClick={handleDel}
      ></div>
    </div>
  )
}
