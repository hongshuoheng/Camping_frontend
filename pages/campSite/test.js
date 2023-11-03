import React, { useEffect, useState } from "react"
import Layout from "@/components/Layouts/Layout"
import CardEx from "@/components/CampSiteComponents/Card-ex"
import DatePick from "@/components/CampSiteComponents/DatePick"
import Option from "@/components/CampSiteComponents/Option"
import Weather from "@/components/CampSiteComponents/Weather"
import HomeFooter from "@/components/CampSiteComponents/HomeFooter"
import CampCart from "@/components/CampSiteComponents/CampCart"
import s from "@/pages/campSite/css/test.module.css"
import CardSkeleton from "@/components/CampSiteComponents/Card-Skeleton"
import LinePayConfirm from "@/components/CampSiteComponents/LinePayConfirm"

export default function Test() {
  const [campGroundID, setCampGroundID] = useState([])

  useEffect(() => {
    fetch("http://localhost:3003/campSite")
      .then((res) => res.json())
      .then((result) => setCampGroundID(result))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Layout>
      <div className={s.tDiv}>
        <div>{/* <HomeFooter /> */}</div>
        <div>
          {/* {campGroundID.map((v, i) => {
            return (
              <CardEx
                key={v.campGroundID}
                city={v.city}
                site={v.site}
                campsite={v.campsite}
                campname={v.campgroundName}
                desc={v.campgroundDescription}
                elevation={v.elevation}
                twd={v.twd}
              />
            )
          })} */}
        </div>
        <div>{/* <DatePick /> */}</div>
        <div>{/* <Option /> */}</div>
        <div>{/* <Weather /> */}</div>
      </div>
      <div>{/* <CampCart /> */}</div>
      <div>
        <LinePayConfirm />
      </div>
      <div>{/* <CardSkeleton /> */}</div>
    </Layout>
  )
}
