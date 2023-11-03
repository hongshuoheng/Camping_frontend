import React, { useEffect, useContext, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import AuthContext from "@/context/AuthContext"
import CampCart from "@/components/CampSiteComponents/CampCart"
import Layout from "@/components/Layouts/Layout"
import Image from "next/image"
export default function AA() {
  const search = useSearchParams()
  const { getToken } = useContext(AuthContext)
  const [lineStatus, setLineStatus] = useState({})
  useEffect(() => {
    let token = getToken()
    const transID = search.get("transactionId")
    const orderID = search.get("orderId")
    console.log(transID, orderID)
    console.log(123)
    if (transID != null) {
      console.log(456)
      fetch(
        `http://localhost:3003/campSite/linePay/confirm/${transID}/${orderID}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          })
        }
      ).then((res) => {
        console.log("27------", res)
        const myData = res
        setLineStatus(myData)
      })
      // .then((result) => {
      //   console.log(result)
      // })
    }
  }, [search])
  console.log("37---------", lineStatus)
  //http://localhost:3000/member/history
  if (lineStatus.status == 200) {
    window.location.href = "http://localhost:3000/member/history"
  }
  return (
    <>
      <Layout contentTitle="LinePay-付款中">
        {/* <CampCart /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2em",
            marginTop: "100px"
          }}
        >
          <div>
            <Image
              width={238}
              height={69}
              src="/LINEPayPNG/LINE-Pay(h)_W238_n.png"
              alt="LinePay-Img"
            />
          </div>
          <div style={{ fontSize: "28px" }}>付款中 ... ...</div>
        </div>
      </Layout>
    </>
  )
}
