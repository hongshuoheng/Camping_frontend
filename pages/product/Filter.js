import React from "react"
import styles from "@/styles/Filter.module.css"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useState, useEffect, useRef } from "react"

export default function Filter({ display }) {
  const Ref = useRef(null)
  //淡出淡入效果
  useEffect(() => {
    let timer
    if (Ref.current) {
      if (display) {
        Ref.current.style.display = "flex"
        timer = setTimeout(() => {
          Ref.current.classList.remove(styles.containerHide)
        }, 0)
      } else {
        Ref.current.classList.add(styles.containerHide)
        timer = setTimeout(() => {
          Ref.current.style.display = "none"
        }, 500)
      }
    }
    return () => clearTimeout(timer)
  }, [display])


  return (
    <>
      <div ref={Ref} className={`${styles.container} ${styles.containerHide}`}>
        {/* 第0欄 */}
        <div className={styles.list}>
          <div className={styles.title}>品牌</div>
          <div className={styles.items}>
            MURACO <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            SNOW PEAK <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            KRAKEN <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            COLEMAN <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            NORTHFACE <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            ARCTERYX <MdKeyboardArrowRight />
          </div>
        </div>
        {/* 第一欄 */}
        <div className={styles.list}>
          <div className={styles.title}>商品分類</div>
          <div className={styles.items}>
            帳篷 <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            篷布
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            露營工具
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            露營用品
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            特價促銷
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            精選服飾
            <MdKeyboardArrowRight />
          </div>
        </div>
        {/* 第二欄 */}
        <div className={styles.list}>
          <div className={styles.title}>帳篷</div>
          <div className={styles.itemType}>類別</div>
          <div className={styles.items}>
            登山帳篷 <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            露營帳篷
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.itemType}>容量</div>
          <div className={styles.items}>
            1人帳
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            2人帳
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            3人帳
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            4人帳+
            <MdKeyboardArrowRight />
          </div>
        </div>
        {/* 第三欄 */}
        <div className={styles.list}>
          <div className={styles.title}>篷布</div>
          <div className={styles.itemType}>材質</div>
          <div className={styles.items}>
            尼龍
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            聚酯纖維
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.title}>露營工具</div>
          <div className={styles.items}>
            營釘
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            營釘鎚
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            營繩
            <MdKeyboardArrowRight />
          </div>
        </div>
        {/* 第四欄 */}
        <div className={styles.list}>
          <div className={styles.title}>露營用品</div>
          <div className={styles.items}>
            桌椅
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            睡袋
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            野炊用具
            <MdKeyboardArrowRight />
          </div>
        </div>
        {/* 第五欄 */}
        <div className={styles.list}>
          <div className={styles.title}>精選服飾</div>
          <div className={styles.items}>
            外套
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            上衣
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            褲子
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            襪子
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            鞋子
            <MdKeyboardArrowRight />
          </div>
        </div>
      </div>
    </>
  )
}
