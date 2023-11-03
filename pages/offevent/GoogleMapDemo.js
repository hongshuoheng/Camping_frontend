import SingleMapDetail from "@/components/eventcomponent/SingleMapDetail"
import GeocodeSearch from "@/components/eventcomponent/GeocodeSearch"
import { useState, useEffect } from "react"

function GoogleMapDemo() {
  // 給一個預設的中心點
  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)

  useEffect(() => {
    console.log(lat)
  }, [lat])

  useEffect(() => {
    console.log(lng)
  }, [lng])

  return (
    <>
      <div style={{ margin: "50px 0" }}>1231231</div>
      <GeocodeSearch setLat={setLat} setLng={setLng} />
      <SingleMapDetail
        lat={lat}
        lng={lng}
        infoTitle="測試"
        infoContent="this is a sample string"
      />

      <h2>捷運科技大樓站</h2>
      {/* <SingleMapDetail
        lat={25.026312}
        lng={121.543439}
        infoTitle="捷運科技大樓站"
        infoContent="this is a sample string"
      /> */}
    </>
  )
}

export default GoogleMapDemo
