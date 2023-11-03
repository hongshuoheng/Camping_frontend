import { useState } from "react"
import { chunk } from "lodash" // chunk([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]

export default function Calendar() {
  const [myDate, setMyDate] = useState(0)
  const now = {
    y: new Date().getFullYear(),
    m: new Date().getMonth() + 1, //注意回傳為 0~11
    d: new Date().getDate()
  }
  const weekDayList = ["日", "一", "二", "三", "四", "五", "六"]
  const days = new Date(now.y, now.m, 0).getDate()
  const firstDay = new Date(now.y, now.m - 1, 1).getDay()
  const allData = chunk(
    [
      ...Array(firstDay).fill(""),
      ...Array(days)
        .fill("")
        .map((v, i) => i + 1)
    ],
    7
  )

  return (
    <>
      <h1>日曆</h1>
      <h2 id="yearAndMonth">{`${now.y}/${now.m}/${myDate ? myDate : ""}`}</h2>
      <table border="1">
        <thead id="title">
          <tr>
            {weekDayList.map(function (v, i) {
              return <th key={i}>{v}</th>
            })}
          </tr>
        </thead>
        <tbody id="data">
          {allData.map((v, i) => {
            return (
              <tr key={i}>
                {v.map((item, idx) => (
                  <td
                    key={idx}
                    onClick={() => {
                      if (item) setMyDate(item)
                    }}
                    className={`${now.d === item ? "today" : ""} ${
                      myDate === item ? "chosen-date" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    role="presentation"
                  >
                    {item}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <style jsx>
        {`
          .today {
            background-color: gold;
          }

          .chosen-date {
            background-color: green;
          }
        `}
      </style>
    </>
  )
}
