import React, { useEffect, useState } from "react"
import s from "./css/weather.module.css"
import { IconName } from "react-icons/wi" // weather icon
import { WiDaySunny } from "react-icons/wi" //* 晴天
import { WiDayCloudy } from "react-icons/wi" //* 晴時多雲 多雲晴時
import { WiCloud } from "react-icons/wi" //* 陰天相關
import { WiRain } from "react-icons/wi" //* 下雨天
import { BsCloudSun } from "react-icons/bs" // 晴時多雲
import { BsThermometerHalf } from "react-icons/bs" // 溫度 Icon
import { BsUmbrellaFill } from "react-icons/bs" // 降雨率
import dayjs from "dayjs"

//* 1 晴天 -> WiDaySunny
//* 2 晴時多雲 多雲晴時 -> WiDayCloudy
//* 3 陰天相關 -> WiCloud
//* 4 下雨天相關 -> WiRain

//* 天氣API  https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-9C5E5A66-E7C9-4F8B-9BDB-7CFA96D9E1EF&format=JSON&locationName=&elementName=PoP12h,T,Wx&sort=time

export default function Weather({ weatherCity }) {
  const [data, setData] = useState({})
  const [copyData, setCopyData] = useState("") //* 展開複製篩選用資料
  const weatherAPI = async () => {
    try {
      //* 天氣API
      await fetch(
        "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-9C5E5A66-E7C9-4F8B-9BDB-7CFA96D9E1EF&format=JSON&locationName=&elementName=PoP12h,T,Wx&sort=time"
      )
        .then((r) => r.json())
        .then((result) => setData(result))
    } catch (error) {
      setData("noData")
      console.log(error)
    }
  }
  useEffect(() => {
    weatherAPI()
  }, [])
  console.log(data)
  console.log(weatherCity)
  //* weatherCity 改變時 觸發 動態篩選 縣市
  useEffect(() => {
    if (data.records) {
      //* 篩選縣市
      let arr = []
      const filterData = data.records.locations[0].location.filter(
        (v) => v.locationName === weatherCity[0]
      )
      //* 篩選 0~2索引值的time要是奇數
      const filterData2 = filterData[0].weatherElement.map((v, i) =>
        v.time.filter((v2, i2) => {
          if (i2 % 2 == 1) {
            return v2
          }
        })
      )
      for (let i = 0; i < filterData2[0].length; i++) {
        arr.push({
          rainfall: filterData2[0][i],
          temperature: filterData2[1][i],
          WDESC: filterData2[2][i]
        })
      }
      //* (3) [rainfall:{Array(7)}, temperature:{Array(7)}, WDESC:{Array(7)}]
      setCopyData(arr)
    }
  }, [weatherCity])
  console.log(copyData)
  //* 1 晴天 -> WiDaySunny
  //* 2 晴時多雲 多雲時晴 -> WiDayCloudy
  //* 3 陰天相關 -> WiCloud
  //* 4 下雨天相關 -> WiRain
  const weatherIcons = {
    //* 晴天相關
    晴天: <WiDaySunny className={s.iconSZ} />,
    晴時多雲: <WiDayCloudy className={s.iconSZ} />,
    多雲時晴: <WiDayCloudy className={s.iconSZ} />,
    晴有霧: <WiDayCloudy className={s.iconSZ} />,
    晴晨霧: <WiDayCloudy className={s.iconSZ} />,
    晴時多雲有霧: <WiDayCloudy className={s.iconSZ} />,
    晴時多雲晨霧: <WiDayCloudy className={s.iconSZ} />,
    多雲時晴有霧: <WiDayCloudy className={s.iconSZ} />,
    多雲時晴晨霧: <WiDayCloudy className={s.iconSZ} />,
    //* 陰天相關
    多雲時陰: <WiCloud className={s.iconSZ} />,
    多雲: <WiCloud className={s.iconSZ} />
  }
  const switchIcon = (key) => {
    if (key.includes("雨")) {
      return <WiRain className={s.iconSZ} />
    } else {
      return weatherIcons[key] || <WiDaySunny className={s.iconSZ} />
    }
  }

  // TODO RETURN .
  if (data != "noData" && copyData != "") {
    return (
      <div className={s.weatherArea}>
        {copyData.map((v, i) => (
          <div key={i} className={s.weatherPad}>
            <div className={s.iconHorizontal}>
              {/* <div>{weatherCity}</div> */}
              <div>{v.WDESC.startTime.slice(0, 10)}</div>
            </div>
            <div>
              {/* 天氣icon */}
              {switchIcon(v.WDESC.elementValue[0].value)}
              <div>{v.WDESC.elementValue[0].value}</div>
            </div>
            <div className={s.iconHorizontal}>
              <p>
                <BsThermometerHalf className={s.iconSZ2} />
                {v.temperature.elementValue[0].value} °C
              </p>
              <p>
                <BsUmbrellaFill className={s.iconSZ2} />
                {v.rainfall.elementValue[0].value != " "
                  ? v.rainfall.elementValue[0].value
                  : v.rainfall.elementValue[0].value + "-"}{" "}
                %
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div className={s.weatherArea}>
        {/* 1 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-25</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              25°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
        {/* 2 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-26</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              22°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
        {/* 3 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-27</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              24°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
        {/* 4 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-28</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              23°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
        {/* 5 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-29</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              24°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
        {/* 6 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-30</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              23°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
        {/* 7 */}
        <div className={s.weatherPad}>
          <div className={s.iconHorizontal}>
            {/* <div>新竹縣</div> */}
            <div>2023-10-31</div>
          </div>
          <div>
            <WiDaySunny className={s.iconSZ} />
            <div>晴天</div>
          </div>
          <div className={s.iconHorizontal}>
            <p>
              <BsThermometerHalf className={s.iconSZ2} />
              25°C
            </p>
            <p>
              <BsUmbrellaFill className={s.iconSZ2} />
              0%
            </p>
          </div>
        </div>
      </div>
    )
  }
}
