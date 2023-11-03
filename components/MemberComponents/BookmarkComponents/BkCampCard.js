import React from "react"
import { BsFillGeoAltFill } from "react-icons/bs"
import { FaMountainSun } from "react-icons/fa6"
import { BiTrash } from "react-icons/bi"
import styles from "@/pages/member/bookmark/bookmark.module.css"
import Link from "next/link"
import Image from "next/image"

export default function CardEx({
  cID,
  EWSN,
  city,
  site,
  campname,
  desc,
  elevation,
  ntd,
  handleDel,
  Img
}) {
  return (
    <div className="card" style={{ position: "relative" }}>
      <Link href={`/campSite/detail/${cID}`}>
        <div className="iconScope">
          <div className="iconL">
            <BsFillGeoAltFill className="iconML" />
            {EWSN}
          </div>
          <Image
            loading="lazy"
            width={320}
            height={200}
            className="imgP"
            src={`/campSite-Img/${Img}.jpg`}
            alt="campSite-Img"
          />
        </div>
        <div>
          <div className="cardBody">
            <span>
              <BsFillGeoAltFill className="iconML" />
              {city}-{site}
            </span>
          </div>
          <h3 className="cardBody">
            {city}｜{campname}
          </h3>
          <p className="cardBody">{desc}</p>
          <div className="cardPrice">
            <span>
              <span>
                <FaMountainSun className="iconML" />
              </span>
              海拔 {elevation} 公尺
            </span>
            <span>NTD$ {ntd} 起</span>
          </div>
        </div>{" "}
      </Link>
      <BiTrash
        style={{ color: "black", top: "10px", right: "10px" }}
        className={styles.trashcan}
      ></BiTrash>
      <div
        style={{ top: "10px", right: "10px" }}
        pid={cID}
        className={styles.trashcan}
        onClick={handleDel}
      ></div>
    </div>
  )
}
