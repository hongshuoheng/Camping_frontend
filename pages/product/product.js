import React, { useContext } from "react"
import styles from "@/styles/product.module.css"
import Image from "next/image"
import Layout from "@/components/Layouts/Layout"
import { MdAdd } from "react-icons/md"
import { useState, useEffect, useRef } from "react"
import Filter from "./Filter"
import Order from "./Order"
import ProductCard from "./ProductCard"
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import CardSkeleton from "./CardSkeleton"

export default function Product() {
  // search 功能
  const router = useRouter()
  // console.log({ q: router.query })
  let { search: searchParam, category } = router.query

  //短路運算法，確保變數不為空or Undefined
  searchParam = searchParam || ""
  category = category || ""

  //useState Hook
  const [data, setData] = useState([]) //接商品data
  const [isLoading, setIsLoading] = useState(true)

  //async/await接資料
  const func = async () => {
    const usp = new URLSearchParams({ search: searchParam, category: category })
    const res = await fetch("http://localhost:3003/product?" + usp.toString())
    setData(await res.json())
  }
  //useEffect Hook
  useEffect(() => {
    console.log(router.query)
    func()
  }, [searchParam, category])

  useEffect(() => {
    if (isLoading) {
      // 播放一下動畫2秒後停止
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [data])

  // const params = { search: router.query.search }
  console.log(data)

  const [pCat, setPCAT] = useState(false)
  const [pOrder, setPOrder] = useState(false)
  const [filterDisplay, setFilterDisplay] = useState(false)
  const [orderByDisplay, setOrderByDisplay] = useState(false)

  // 價格排序由低至高
  const orderPriceLowToHigh = (t) => {
    const newData = [...data]
    if (t == "DESC") {
      setData(
        newData.sort((a, b) => {
          return a.unit_price - b.unit_price
        })
      )
    }
    if (t == "ASC") {
      setData(
        newData.sort((a, b) => {
          return b.unit_price - a.unit_price
        })
      )
    }
  }

  // 名稱排序AtoZ
  const orderNameAZ = (t) => {
    const newData = [...data]
    if (t == "DESC") {
      setData(
        newData.sort((a, b) => {
          if (a.product_name > b.product_name) return -1
          if (a.product_name < b.product_name) return 1
          return 0
        })
      )
    }
    if (t == "ASC") {
      setData(
        newData.sort((a, b) => {
          if (a.product_name < b.product_name) return -1
          if (a.product_name > b.product_name) return 1
          return 0
        })
      )
    }
  }
  //最新商品排序
  const orderLatestP = () => {
    const newData = [...data]
    setData(
      newData.sort((a, b) => {
        return new Date(b.last_update) - new Date(a.last_update)
      })
    )
  }
  const handleCatClick = () => {
    setFilterDisplay(!filterDisplay)
    const newPCat = !pCat
    if (newPCat && pOrder) {
      setPOrder(!pOrder)
    }
    setPCAT(newPCat)
  }
  const handleOrderClick = () => {
    setOrderByDisplay(!orderByDisplay)
    const newPOrder = !pOrder
    if (newPOrder && pCat) {
      setPCAT(!pCat)
    }
    setPOrder(newPOrder)
  }

  return (
    <>
      <Layout
        pageTitle={"全部商品"}
        contentTitle={category ? category : "全部商品"}
        bread={""}
      >
        <div className={styles.filterContainer}>
          <div
            className={`${styles.pCatFilter} ${
              !pCat ? "" : styles.pCatFilterOn
            }`}
            onClick={handleCatClick}
          >
            篩選
            <MdAdd
              className={`${styles.normal}  ${!pCat ? "" : styles.addRotate}`}
              size={28}
            />
          </div>
          <div
            className={`${styles.pOrderBy} ${!pOrder ? "" : styles.pOrderByOn}`}
            onClick={handleOrderClick}
          >
            排序
            <MdAdd
              className={`${styles.normal}  ${!pOrder ? "" : styles.addRotate}`}
              size={28}
            />
          </div>
        </div>
        <div className={styles.container}>
          {isLoading && <CardSkeleton cards={16} />}
          {data.map((v, i) => {
            return (
              <ProductCard
                key={i}
                pName={v.product_name}
                pPrice={v.unit_price}
                inventory={v.STOCK}
                img={v.list_img.split(",")[0]}
                onShelves={v.last_update}
                pid={v.product_id}
                pDiscount={v.discount}
              />
            )
          })}

          <Filter display={filterDisplay} />
          <Order
            setOrderByDisplay={setOrderByDisplay}
            display={orderByDisplay}
            orderPrice={orderPriceLowToHigh}
            orderName={orderNameAZ}
            orderLatestProduct={orderLatestP}
          />
        </div>
      </Layout>
    </>
  )
}
