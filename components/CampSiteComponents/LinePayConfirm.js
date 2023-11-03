import React, { useEffect, useState } from "react"

export default function LinePayConfirm() {
  const [data, setData] = useState("")
  //# 接取 linePay 資料。
  // const fetchLinePayConfirm = async () => {
  useEffect(() => {
    // 發送一個HTTP請求到後端的路由，例如：
    // 此處示例路由 '/campCartUpdate' 是您的後端處理重定向的路由
    fetch("/campCartUpdate")
      .then((response) => {
        if (response.redirected) {
          // 如果收到重定向響應，獲取重定向的URL
          window.location.href = response.url
        }
      })
      .catch((error) => {
        console.error("發生錯誤：", error)
      })
  }, [])
  // }
  // useEffect(() => {
  //   fetchLinePayConfirm()
  // }, [])
  console.log("/linePay/confirm", data)
  //TODO: return.
  return (
    <>
      <h1>付款資訊</h1>
    </>
  )
}
