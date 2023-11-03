import React from "react"
import { BsFillGeoAltFill } from "react-icons/bs"
import { FaMountainSun } from "react-icons/fa6"
import { BsHeartFill } from "react-icons/bs" //實心愛心
import { BsHeart } from "react-icons/bs" // 空心愛心
import Link from "next/link"
import Image from "next/image"
import s from "@/components/CampSiteComponents/css/Card-Skeleton.module.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { BsImage } from "react-icons/bs"
import "react-loading-skeleton/dist/skeleton.css"

export default function CardSkeleton({
  cards,
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
    <>
      {Array(cards)
        .fill(0)
        .map((item, i) => (
          <SkeletonTheme
            baseColor={"#ffffff80"}
            highlightColor="#e8e8e8"
            key={"card" + i}
          >
            <Link href={`/campSite/detail/${cID}`}>
              <div>
                <div className={s.card}>
                  <div className={s.iconScope}>
                    <div className={s.iconR}>{/* <BsHeartFill /> */}</div>
                    <div className={s.iconL}>
                      {/* <BsFillGeoAltFill className={s.iconML} /> */}
                      <Skeleton width={150} />
                    </div>
                    {/* 320 * 200 */}
                    <div
                      style={{
                        width: "320px",
                        height: "200px",
                        backgroundColor: "lightgrey",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <BsImage color={"#e8e8e8"} size={90} />
                    </div>
                    {/* <Image
                      width={320}
                      height={200}
                      className={s.imgP}
                      src={`/campSite-Img/${Img}.jpg`}
                      alt="campSite-Img"
                    /> */}
                    {/* <img src="/campSite-Img/testimg.jpg" className={s.}"imgP" alt="..." /> */}
                  </div>
                  <div>
                    <div className={s.cardBody}>
                      <span>
                        <Skeleton width={100} />
                        <Skeleton />
                      </span>
                    </div>
                    <h3 className={s.cardBody}>
                      <Skeleton />
                    </h3>
                    <p className={s.cardBody}>{desc}</p>
                    <div className={s.cardPrice}>
                      <span>
                        <span>
                          {/* <FaMountainSun className={s.iconML} /> */}
                        </span>
                        <Skeleton width={100} />
                      </span>
                      <span>
                        <Skeleton width={50} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SkeletonTheme>
        ))}
    </>
  )
}
