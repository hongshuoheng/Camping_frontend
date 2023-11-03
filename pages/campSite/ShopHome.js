import React from "react"
import { BsCameraFill } from "react-icons/bs" // 相機
import { BsCompassFill } from "react-icons/bs" // 指南針
import Layout from "@/components/Layouts/Layout"
import Link from "next/link"
import s from "./css/shophome.module.css"

export default function ShopHome() {
  return (
    <Layout>
      <div className={s.mainScope}>
        <img src="/campSite-img/CShome.jpg" alt="..." />
        <div className={s.secondScope}>
          <div>
            <h1 className={s.h1}>探索自然，於營中開展</h1>
            <p className={s.p}>
              在大自然的懷抱中，我們找到了心靈的避風港。每一次的露營生活，都是一場與自然的深刻對話。清晨的第一縷陽光穿越帳篷的縫隙，溫柔地喚醒沉睡的心靈。湖水泛起漣漪，彷彿是大自然為我們演奏的安靜樂章，讓煩憂在湖畔盡失。夜幕降臨，星空如鑲嵌的寶石點亮了黑暗，我們仰望著宇宙的奧秘，思緒在無垠的星海中遨遊。
              在大自然的懷抱中，我們找到了心靈的避風港。每一次的露營生活，都是一場與自然的深刻對話。清晨的第一縷陽光穿越帳篷的縫隙，溫柔地喚醒沉睡的心靈。湖水泛起漣漪，彷彿是大自然為我們演奏的安靜樂章，讓煩憂在湖畔盡失。夜幕降臨，星空如鑲嵌的寶石點亮了黑暗，我們仰望著宇宙的奧秘，思緒在無垠的星海中遨遊。
            </p>
          </div>
          <div>
            <p>地址：台北市信義區市府路54號</p>
            <p>營業時間：11:00 - 22:00</p>
            <p>電話：02-2318-3333s</p>
          </div>
          <div className={s.iconP}>
            <p>
              <BsCameraFill />
              <Link href="#"> @camplife_taipei101</Link>
            </p>
            <p>
              <BsCompassFill />
              <Link href="#"> https://goo.gl/maps/XwaNtWB4q8bMZGS28</Link>
            </p>
          </div>
        </div>
      </div>

      {/* 這是一條線 */}
      <div
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: "1px",
          margin: "30px 0"
        }}
      ></div>

      <div className={s.linkScopeMain}>
        <div>
          <p className={s.FindYourShop}>Find Your Shop</p>
        </div>
        <div className={s.linkScope}>
          <Link href="#">台北</Link>
          <Link href="#">新北</Link>
          <Link href="#">桃園</Link>
          <Link href="#">新竹</Link>
        </div>
        <div className={s.linkScope}>
          <Link href="#">台中</Link>
          <Link href="#">台南</Link>
          <Link href="#">高雄</Link>
          <Link href="#">花蓮</Link>
        </div>
      </div>
    </Layout>
  )
}
