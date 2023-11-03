import React from "react"
import { BsFillGeoAltFill } from "react-icons/bs"
import { FaMountainSun } from "react-icons/fa6"
import { BsHeartFill } from "react-icons/bs" //實心愛心
import { BsHeart } from "react-icons/bs" // 空心愛心
import Link from "next/link"
import Image from "next/image"

export default function CardEx({
  cID,
  id,
  EWSN,
  city,
  site,
  campname,
  desc,
  elevation,
  ntd,
  Img
}) {
  return (
    <Link href={`/campSite/detail/${cID}`}>
      <div>
        <div className="card">
          <div className="iconScope">
            <div className="iconR">{/* <BsHeartFill /> */}</div>
            <div className="iconL">
              <BsFillGeoAltFill className="iconML" />
              {EWSN}
            </div>
            {/* 320 * 200 */}
            <Image
              loading="lazy"
              width={320}
              height={200}
              className="imgP"
              src={`/campSite-Img/${Img}.jpg`}
              alt="campSite-Img"
            />
            {/* <img src="/campSite-Img/testimg.jpg" className="imgP" alt="..." /> */}
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
          </div>
        </div>
      </div>
    </Link>
  )
}
