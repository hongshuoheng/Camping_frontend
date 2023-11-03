import React from "react"
import Link from "next/link"
import s from "@/components/CampSiteComponents/css/homefooter.module.css"

export default function HomeFooter() {
  return (
    <div className={s.bgc}>
      <div className={s.logo}>
        <Link href="#">LOGO</Link>
      </div>
      <nav className={s.nav}>
        {/* 商品 */}
        <ul className={s.listScope}>
          <li className={s.itemScope}>
            <span>商品</span>
            <ul>
              <li className={s.item}>－</li>

              <li>
                <Link href="#">All</Link>
              </li>

              <li>
                <Link href="#">Tent</Link>
              </li>

              <li>
                <Link href="#">Tarp</Link>
              </li>

              <li>
                <Link href="#">Tent / Tarp Accessories</Link>
              </li>

              <li>
                <Link href="#">Stove</Link>
              </li>

              <li>
                <Link href="#">Equipment</Link>
              </li>

              <li>
                <Link href="#">Apparel</Link>
              </li>

              <li>
                <Link href="#">Repair</Link>
              </li>

              <li>
                <Link href="#">Dog Accessories</Link>
              </li>

              <li>
                <Link href="#">m Selected</Link>
              </li>

              <li>
                <Link href="#">Sale</Link>
              </li>
            </ul>
          </li>
        </ul>
        {/* 營地 */}
        <ul className={s.listScope}>
          <li className={s.itemScope}>
            <span>營地</span>
            <ul>
              <li className={s.item}>－</li>
              <li>
                <Link href="#">全部</Link>
              </li>
              <li>
                <Link href="#">北台灣</Link>
              </li>
              <li>
                <Link href="#">中台灣</Link>
              </li>
              <li>
                <Link href="#">南台灣</Link>
              </li>
              <li>
                <Link href="#">東台灣</Link>
              </li>
            </ul>
          </li>
        </ul>
        {/* 活動 */}
        <ul className={s.listScope}>
          <li className={s.itemScope}>
            <span>活動</span>
            <ul>
              <li className={s.item}>－</li>

              <li>
                <Link href="#">All</Link>
              </li>

              <li>
                <Link href="#">Tent</Link>
              </li>

              <li>
                <Link href="#">Tarp</Link>
              </li>

              <li>
                <Link href="#">Tent / Tarp Accessories</Link>
              </li>

              <li>
                <Link href="#">Stove</Link>
              </li>

              <li>
                <Link href="#">Equipment</Link>
              </li>

              <li>
                <Link href="#">Apparel</Link>
              </li>

              <li>
                <Link href="#">Repair</Link>
              </li>

              <li>
                <Link href="#">Dog Accessories</Link>
              </li>

              <li>
                <Link href="#">m Selected</Link>
              </li>

              <li>
                <Link href="#">Sale</Link>
              </li>
            </ul>
          </li>
        </ul>
        {/* 論壇 */}
        <ul className={s.listScope}>
          <li className={s.itemScope}>
            <span>論壇</span>
            <ul>
              <li className={s.item}>－</li>

              <li>
                <Link href="#">All</Link>
              </li>

              <li>
                <Link href="#">Tent</Link>
              </li>

              <li>
                <Link href="#">Tarp</Link>
              </li>

              <li>
                <Link href="#">Tent / Tarp Accessories</Link>
              </li>

              <li>
                <Link href="#">Stove</Link>
              </li>

              <li>
                <Link href="#">Equipment</Link>
              </li>

              <li>
                <Link href="#">Apparel</Link>
              </li>

              <li>
                <Link href="#">Repair</Link>
              </li>

              <li>
                <Link href="#">Dog Accessories</Link>
              </li>

              <li>
                <Link href="#">m Selected</Link>
              </li>

              <li>
                <Link href="#">Sale</Link>
              </li>
            </ul>
          </li>
        </ul>
        {/* 會員 */}
        <ul className={s.listScope}>
          <li className={s.itemScope}>
            <span>會員</span>
            <ul>
              <li className={s.item}>－</li>

              <li>
                <Link href="#">會員登入</Link>
              </li>

              <li>
                <Link href="#">會員註冊</Link>
              </li>

              <li>
                <Link href="#">願望清單</Link>
              </li>

              <li>
                <Link href="#">購物車</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
