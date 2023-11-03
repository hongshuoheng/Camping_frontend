import React, { useContext, useEffect, useState } from "react"
import s from "@/components/CampSiteComponents/css/campcart.module.css"
import Image from "next/image"
import Link from "next/link"
import { MdAddCircleOutline } from "react-icons/md"
import { MdRemoveCircleOutline } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri" //* 刪除 icon
import Head from "next/head"
import { useRouter } from "next/router"
import dayjs from "dayjs"
import AuthContext from "@/context/AuthContext"
// ES6 Modules or TypeScript
import Swal from "sweetalert2"
import { CheckBox } from "@mui/icons-material"
// Swal.fire({
//   icon: "error",
//   title: "Oops...",
// })
export default function CampCart() {
  //* 引入路由 導入資料
  const router = useRouter()
  const [data, setData] = useState("")
  const [campCart, setCampCart] = useState([])
  const [orderS, setOrderS] = useState([])
  const [linePayUrl, setLinePayUrl] = useState("")

  //# 計算 總計購物車清單 總價錢。 orderSPrice(map 出所有清單的金額).  allPrice(把map出的金額做加總計算.)
  // const allPrice = orderS.map((v) => +v.campPrice + +v.tentsPrice + +v.total).reduce((acc, cur) => acc + cur, 0)
  const allPrice = orderS.reduce(
    (acc, v) => acc + (+v.campPrice + +v.tentsPrice + +v.total),
    0
  )
  console.log(allPrice)
  //# 後端路由 ->  讀取 購物車資料.
  const { getToken } = useContext(AuthContext)
  const fetchCampCartList = async () => {
    let token = getToken()
    try {
      const res = await fetch(`http://localhost:3003/campSite/campCartList`, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        })
      })
      //setData(await res.json())
      const myData = await res.json()
      setData(myData)
      setCampCart(myData.campcart)
      setOrderS(myData.orderS)
    } catch (ex) {
      console.log(ex)
    }
  }
  //# 後端路由 -> useEffect 讀取 購物車資料.
  useEffect(() => {
    fetchCampCartList()
  }, [])
  //* 篩選購物車資料 Sinder 老師 幫寫的 Code.
  const tData = orderS.map((order) => {
    const { orderID, orderTime } = order
    const items = []
    // const total = []
    campCart.forEach((i) => {
      if (i.orderID === orderID) {
        items.push({ ...i })
        // total.push(+i.campPrice + +i.tentsPrice + +i.total)
      }
    })
    return {
      orderID,
      orderTime,
      items
      // total
    }
  })
  console.log({ tData })
  //# 後端路由 ->  刪除購物車單筆資料.
  const campCartDel = async (id) => {
    const DelOrderID = { OrderID: id }
    let token = getToken()
    try {
      const res = await fetch(`http://localhost:3003/campSite/campCartDelete`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(DelOrderID)
      })
      if (res) {
        fetchCampCartList()
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  //# 後端路由 -> 完成付款更新購物車 Payment = 1 .
  //* 判斷當前 年 月份
  const year = dayjs().year() // 今年
  const month = dayjs().month() + 1 // 今月 //* 索引值 0 ~ 11 -> 1 ~ 12 月
  const days = dayjs().date() // 今日
  const paymentTime = `${year}-${month}-${days}`
  //* 取出 購物車清單全部的 tData的orderID
  const campCartUpdate = async () => {
    const paymentOrderID = tData.map((v) => v.orderID)
    let token = getToken()
    try {
      const res = await fetch(`http://localhost:3003/campSite/campCartUpdate`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ paymentOrderID, paymentTime, LINEPAYorder })
      })
      const waite = await res.json()
      setLinePayUrl(waite)
      console.log(waite)
      if (res) {
        // fetchCampCartList() //* 重新刷新購物車頁面
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  console.log(tData)
  //* 商品圖片隨機
  for (let i = 0; i < tData.length; i++) {
    const random = Math.floor(Math.random() * 50) + 1 // 產生1到50的隨機整數
    tData[i].image = `p${random}.jpg` // 假設你想在每個物件中添加一個名為 "image" 的屬性
  }
  //* 製作 LINE PAY 架構 body:{}
  //todo: allPrice -> 購物車金額。 products.name: 商品名稱-大營地。
  const LINEPAYorder = {
    body: {
      amount: allPrice, //! 全部商品的總額 = 購物車的金額
      currency: "TWD",
      packages: [
        {
          id: "前端的產品ID", // 前端的產品ID
          amount: allPrice, //! 這筆商品的總額。
          products: [
            {
              name: "products1", // 大營地名稱
              quantity: 1,
              price: allPrice
            }
          ]
        }
      ],
      orderId: "" // 後端產生uuidV4
    }
  }
  console.log({ LINEPAYorder })
  console.log(linePayUrl)
  if (linePayUrl != "") {
    window.location.href = `${linePayUrl}`
  }
  //TODO: RETURN.
  return (
    <>
      <Head>
        <title>購物車 | 營地</title>
      </Head>
      <div className={s.nav}>
        <div className={s.main}>
          <div className={s.divWrapper}>
            <Link href="/product/cart">
              <div className={s.div}>商品購物車</div>
            </Link>
          </div>
          <div className={s.frame}>
            <div className={s.productCartText}>營地預定</div>
          </div>
        </div>
        <div className={s.frame2} />
      </div>
      <div className={s.outerBox}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className={s.cartTitle}>
              <th>1</th>
              <th style={{ color: "transparent" }} className={s.pImgTitle}>
                營地名稱
              </th>
              <th className={s.pImgTitle}>營地細項</th>
              <th className={s.pImgTitle}>方案細項</th>
              <th className={s.pImgTitle}>金額</th>
              <th style={{ color: "transparent" }} className={s.pImgTitle}>
                營地名稱
              </th>
            </tr>
          </thead>
          <tbody>
            {/* map資料起始位置 */}
            {tData.every((v) => Array.isArray(v.items) && v.items.length > 0) &&
              tData.map((v, i) => {
                return (
                  <tr key={i} className={s.productItem}>
                    <td className={s.pImg}>
                      <div className={s.imgContainer}>
                        {/* 圖片規格: 200*133.33 */}
                        <Image
                          loading="lazy"
                          width={200}
                          height={133}
                          className={s.imgItem}
                          src={`/campSite-Img/${v.image}`}
                          alt="campSite-Img"
                        />
                      </div>
                    </td>
                    <td className={s.pItemScope}>
                      <div className={s.pName}>
                        大營地:
                        <span className={s.pItem}>
                          {v.items[0].CampgroundName}
                        </span>
                      </div>
                      <div className={s.pName}>
                        小營區:
                        <span className={s.pItem}>{v.items[0].campName}</span>
                      </div>
                      <div className={s.pName}>
                        人數:
                        <span className={s.pItem}>
                          {v.items[0].tentsPeople}人
                        </span>
                      </div>
                      <div className={s.pName}>
                        預定日:
                        <span
                          className={s.pItem}
                        >{`${v.items[0].Year} - ${v.items[0].Month} - ${v.items[0].Day}`}</span>
                      </div>
                    </td>
                    <td className={s.pItemScope}>
                      {v.items.map((v, i) => {
                        return (
                          <div key={i} className={s.pName}>
                            {v.optionNumArr === "0" ? null : (
                              <>
                                方案名稱:
                                <span className={s.pItem}>
                                  {v.optionNameArr === "N"
                                    ? "N/A"
                                    : v.optionNameArr}
                                </span>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </td>
                    <td className={s.pItemScope}>
                      <div className={s.pName}>
                        NTD{" "}
                        {+v.items[0].campPrice +
                          +v.items[0].tentsPrice +
                          +v.items[0].total}
                        {/* {v.total[0]} */}
                      </div>
                    </td>
                    <td className={s.pItemScope}>
                      <button
                        className={s.btn}
                        onClick={() => {
                          Swal.fire({
                            title: "確認刪除嗎?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "確認刪除"
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire("成功刪除!")
                              campCartDel(v.orderID)
                            }
                          })
                        }}
                        style={{
                          color: "black",
                          backgroundColor: "transparent",
                          fontSize: "30px"
                        }}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                )
              })}
            {/* map資料結束位置 */}
          </tbody>
        </table>

        <div className={s.grandTotalContainer}>
          <div
            class="form-check"
            style={{ display: "flex", alignItems: "center", gap: ".5em" }}
          >
            <input
              type="checkbox"
              style={{ height: "24px", width: "24px" }}
              checked
            />
            <label style={{ fontSize: "24px", marginRight: "5px" }}>
              同會員資訊
            </label>
          </div>
          <div className={s.optionContainer}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "24px"
              }}
            >
              結帳方式:
            </span>
            <span>
              <select className={s.optionMenu}>
                <option value={0}>請選擇</option>
                <option value={0}>Line Pay</option>
                <option value={0}>信用卡</option>
              </select>
            </span>
          </div>
          {/* <div className={s.grandTotal}>總計</div> */}
          <div className={s.grandTotal}>
            <div>總計</div>
            NTD {allPrice}
          </div>
          <button
            className={s.btn}
            onClick={() => {
              allPrice == 0 ? null : campCartUpdate()
            }}
          >
            前往付款
          </button>
        </div>
      </div>
    </>
  )
}
