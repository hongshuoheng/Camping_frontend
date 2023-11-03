import React, { useContext, useEffect, useState } from "react"
import s from "./css/option.module.css"
import { BsPlusSquare } from "react-icons/bs"
import { BsDashSquare } from "react-icons/bs"
import AuthContext from "@/context/AuthContext"
// ES6 Modules or TypeScript
import Swal from "sweetalert2"
import { useRouter } from "next/router"

// Swal.fire({
//   icon: "error",
//   title: "Oops...",
//   //text: "Something went wrong!",
// })
export default function Option({
  Area, // 露營區
  Option, // 方案名稱
  campAreaClick, // 父子元件傳送的方法 設定所選露營區
  tentsClick, // 父子元件傳送的方法  設定所選帳篷
  optionTotalNum, // 父子元件傳送的方法 設定方案的數量
  OptionGoToCart, //* 結帳時 需要的資料
  DatePickGoToCart, //* 結帳時 需要的資料
  CampgroundName //* 結帳時 需要的資料
}) {
  const router = useRouter()
  //TODO: 資料庫方案要重新設定。
  // console.log(CampgroundName)
  //* ---------- 名稱 ----------|
  const [campName, setCampName] = useState("露營區") // 名稱 -> 露營區
  const [tentsPeople, setTentsPeople] = useState("幾人帳篷") // 名稱 -> 幾人帳篷
  const [optionName, setOptionName] = useState("") // 名稱 -> 方案名稱
  //* ---------- 數量 ----------|
  const [optionNum, setOptionNum] = useState(0) // 數量 -> 方案數量
  //* ---------- 總金額 ----------|
  const [campPrice, setCampPrice] = useState(0) // 總金額 -> 露營區
  const [tentsPrice, setTentsPrice] = useState(0) // 總金額 -> 露營區
  const [optionPrice, setOptionPrice] = useState({
    total: 0,
    optionNameArr: [""],
    optionNumArr: [0],
    optionPriceArr: [""]
  }) // 總金額 -> 方案
  // console.log(optionPrice)
  //* ---------- 購物車 ----------|
  const [cart, setCart] = useState({})
  console.log(
    DatePickGoToCart,
    CampgroundName,
    campName,
    campPrice,
    tentsPeople,
    tentsPrice,
    optionPrice
  )

  //# userID.
  const { getToken } = useContext(AuthContext)
  let token = getToken()

  //! ---------- 購物車 資料驗證 確保資料全部都有。 ----------|
  const addToCart = () => {
    let flag = true
    if (!DatePickGoToCart.Day) {
      Swal.fire({
        icon: "error",
        title: "請選取日期"
      })
      flag = false
    }
    if (campName === "露營區") {
      Swal.fire({
        icon: "error",
        title: "請選取露營區"
      })
      flag = false
    }
    if (tentsPeople === "幾人帳篷") {
      Swal.fire({
        icon: "error",
        title: "請選取帳篷人數"
      })
      flag = false
    }
    if (flag === true) {
      Swal.fire({
        icon: "success",
        title: "成功加入購物車"
      })
      //  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VyX21haWwiOiJUb21fQ2xvc2VAY2FtcG1haWwuY29tIiwiaWF0IjoxNjk2NDg5NTk4fQ.e-XSJqPZB9pNBCIRfXd14RyegHuLxo8wy00I7KRMzig
      fetch("http://localhost:3003/campSite/campCart", {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          DatePickGoToCart,
          CampgroundName,
          campName,
          campPrice,
          tentsPeople,
          tentsPrice,
          optionPrice
        })
      })
        .then((res) => res.json())
        .then(() => {
          router.push("/campSite/cart")
        })
        // .then(() => {
        //   Swal.fire({
        //     icon: "success",
        //     title: "成功加入購物車"
        //   }).then(() => {
        //     router.push("/campSite/cart")
        //   })
        // })
        .catch((ex) => console.log(ex))
    }
  }
  //! ---------- 購物車 資料驗證 確保資料全部都有。 ----------|

  //# 方案加總的函示。
  const OptionTotalPrice = () => {
    // num: 0
    // optionName: "溪畔帳篷"
    let total = 0
    let optionNameArr = []
    let optionNumArr = []
    let optionPriceArr = []

    Option.forEach((v) => {
      const { num, optionName, optionPrice } = v
      total += num * optionPrice
      optionNameArr.push(optionName)
      optionNumArr.push(num)
      optionPriceArr.push(optionPrice)
    })
    return { total, optionNameArr, optionNumArr, optionPriceArr }
  }

  // # testing Array
  //* 固定幾人帳篷 && 人數價錢
  const Tents = [
    {
      people: 2,
      price: 0
    },
    {
      people: 4,
      price: 1000
    },
    {
      people: 6,
      price: 2000
    },
    {
      people: 8,
      price: 3000
    }
  ]
  optionPrice.optionNameArr
  //# 變更露營區時 設定對應的狀態
  useEffect(() => {
    setOptionPrice({
      total: 0,
      optionNameArr: [],
      optionNumArr: [],
      optionPriceArr: []
    })
    setCampName(campName)
    setCampPrice(campPrice)
    setTentsPeople(tentsPeople)
    setTentsPrice(tentsPrice)
    setOptionName("") // 清空方案名稱
    setOptionNum(0) // 清空方案數量
  }, [campName])

  //TODO: RETURN.
  return (
    <div className={s.optionArea}>
      <div className={s.optionTitleA}>
        <p>露營區</p>
        <div className={s.optionA}>
          {Area.length > 0 &&
            Area.map((v, i) => (
              <p
                key={i}
                onClick={() => {
                  campAreaClick({ campName: v.typeName, campPrice: v.price })
                  setCampName(v.typeName)
                  setCampPrice(0)
                  setCampPrice(+Area[i].price)
                }}
                className={`${s.oBtn} ${
                  campName === v.typeName ? s.click : ""
                }`}
              >
                {v.typeName}
              </p>
            ))}
        </div>
      </div>
      {/* 帳篷數量 */}
      <div className={s.optionTitleB}>
        <p>帳數</p>
        <div className={s.optionA}>
          {Tents.map((v, i) => (
            <>
              <p
                key={i}
                onClick={() => {
                  tentsClick({ tentsPeople: v.people, tentsPrice: v.price })
                  setTentsPeople(v.people)
                  setTentsPrice(+Tents[i].price)
                }}
                className={`${s.oBtn} ${
                  tentsPeople === v.people ? s.click : ""
                }`}
              >
                {v.people + "人帳"} NTD {v.price}
              </p>
            </>
          ))}
        </div>
      </div>
      {/* 加選方案 */}
      <div className={s.option2}>
        <p>加選方案</p>
        {Option.length > 0 &&
          Option.map((v, i) => (
            <>
              <div key={i} className={s.optionB}>
                <p style={{ width: "50%" }}>{v.optionName}</p>
                <p style={{ width: "25%" }}>NTD {v.optionPrice}</p>
                <div className={s.optionNum}>
                  <button
                    type="button"
                    className={s.iconBtn}
                    onClick={() => {
                      if (Option[i].num <= 0) return
                      Option[i].num -= 1
                      setOptionPrice(OptionTotalPrice())
                      setOptionName(Option[i].optionName)
                      setOptionNum(Option[i].num)
                      optionTotalNum(Option) // 父元素 接收 子元件資料
                    }}
                  >
                    <BsDashSquare className={s.iconBs} />
                  </button>
                  <p style={{ margin: "0 12px" }}>{Option[i].num}</p>
                  <button
                    type="button"
                    className={s.iconBtn}
                    onClick={() => {
                      Option[i].num += 1
                      setOptionPrice(OptionTotalPrice())
                      setOptionName(Option[i].optionName)
                      setOptionNum(Option[i].num)
                      optionTotalNum(Option) // 父元素 接收 子元件資料
                    }}
                  >
                    <BsPlusSquare className={s.iconBs} />
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
      {/* 總價錢 */}
      <div className={s.totalPriceScope}>
        <div className={s.totalPrice}>
          <p>總金額</p>
          {/* +optionPrice.total */}
          <p>NTD {+optionPrice.total + campPrice + tentsPrice}</p>
        </div>
        <button
          type="button"
          className={s.cartBtn}
          onClick={() => {
            OptionGoToCart(cart)
            addToCart()
            // Swal.fire({
            //   icon: "success",
            //   title: "成功加入購物車"
            // })
          }}
        >
          加入購物車
        </button>
      </div>
    </div>
  )
}
