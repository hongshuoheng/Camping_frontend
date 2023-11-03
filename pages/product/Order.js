import React from "react"
import styles from "@/styles/Order.module.css"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useState, useEffect, useRef } from "react"

export default function Order({
  display,
  orderPrice,
  orderName,
  setOrderByDisplay,
  orderLatestProduct
}) {
  const Ref = useRef(null)
  // 淡出淡入效果
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
  // 點擊空白處或執行菜單內選項後關閉菜單
  const toggleMenu = () => {
    setOrderByDisplay(false)
  }

  return (
    <>
      <div ref={Ref} className={`${styles.container} ${styles.containerHide}`}>
        {/* 第0欄 */}
        <div className={styles.list}>
          <div className={styles.title}>排序方式</div>
          <div className={styles.items}>
            推薦商品 <MdKeyboardArrowRight />
          </div>
          <div className={styles.items}>
            暢銷商品 <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.items}
            onClick={() => {
              orderName("ASC")
              toggleMenu()
            }}
          >
            按字母排序 A-Z <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.items}
            onClick={() => {
              orderName("DESC")
              toggleMenu()
            }}
          >
            按字母排序 Z-A <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.items}
            onClick={() => {
              orderPrice("ASC")
              toggleMenu()
            }}
          >
            價格由高至低 <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.items}
            onClick={() => {
              orderPrice("DESC")
              toggleMenu()
            }}
          >
            價格由低至高
            <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.items}
            onClick={() => {
              orderLatestProduct()
              toggleMenu()
            }}
          >
            最新上架商品
            <MdKeyboardArrowRight />
          </div>
        </div>
      </div>
    </>
  )
}
