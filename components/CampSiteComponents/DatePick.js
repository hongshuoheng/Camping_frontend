import React, { useState } from "react"
import dayjs from "dayjs"
//* css
// import s from "./css/dp.module.css"
//* 圖示 TbArrowBigLeftLineFilled
import { TbArrowBigLeft } from "react-icons/tb" // 左箭頭
import { TbArrowBigRight } from "react-icons/tb" // 右箭頭

// 切分陣列
// chunk - 依size分成子陣列，ex. chunk([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

export default function DatePick({ Price, offDay, DatePickGoToCart }) {
  //! 一開始選中的日期
  const [myDate, setMyDate] = useState(0)
  //! 切換 月
  const [myMonth, setMyMonth] = useState(dayjs().month() + 1)
  //! 切換 年
  const [myYear, setMyYear] = useState(dayjs().year())
  //* 判斷當前 年 月份
  const year = dayjs().year() // 今年
  const month = dayjs().month() + 1 // 今月 //* 索引值 0 ~ 11 -> 1 ~ 12 月
  const days = dayjs().date() // 今日
  const weekDayList = ["日", "一", "二", "三", "四", "五", "六"]
  //# 取得本 月 有幾 天 。
  const dayOfMonth = dayjs([myYear, myMonth]).daysInMonth()
  //# 取得當月第一天是星期幾? 索引值 0 ~ 6 -> 星期 日 ~ 六 。
  const firstDayOfWeek = dayjs([myYear, myMonth]).startOf("month").day()
  // 最前面塞入空白字串的陣列
  const emptyData = Array(firstDayOfWeek).fill("")

  // 有值的陣列1 ~ days
  // 如何建立一個陣列包含1...N數字
  // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  const valueData = Array(dayOfMonth)
    .fill("")
    .map((v, i) => i + 1)
  //# 合併兩陣列為一長陣列  ( 當月第一天前面的空值+所有天數 )
  const allData = [...emptyData, ...valueData]
  //* 準備切出所需要的組數
  const allDataChunks = chunk(allData, 7)
  // console.log(allDataChunks)
  //* 取得 營區營休日 = 。 allday的index % 7 = offDay.offDay 設置成禁止選擇。
  // const campOffDay = offDay.length ? +offDay[0].offDay : ""
  const campOffDay = offDay ? +offDay[0]?.offDay || "" : ""

  // console.log(campOffDay)

  // TODO -> RETURN.
  return (
    <>
      <div className="calendar">
        <div className="header">
          <div className="current_month">{`${myYear}年\n${myMonth}月\n${
            myDate ? myDate : days
          }日`}</div>
          <div className="prev_month">
            {/* 左箭頭 */}
            <button
              type="button"
              className="icons"
              onClick={() => {
                if (myYear <= year && myMonth <= month) return // 當日期 >= 今天今月今日 就離開。
                if (myMonth - 1 < 1) {
                  setMyMonth(12)
                  setMyYear(myYear - 1)
                } else {
                  setMyMonth(myMonth - 1)
                }
              }}
            >
              {/* 左箭頭 */}
              <TbArrowBigLeft />
            </button>
          </div>
          <div className="next_month">
            {/* 右箭頭 */}
            <button
              type="button"
              className="icons"
              onClick={() => {
                if (myMonth + 1 > 12) {
                  setMyMonth(1)
                  setMyYear(myYear + 1)
                } else {
                  setMyMonth(myMonth + 1)
                }
              }}
            >
              {/* 右箭頭 */}
              <TbArrowBigRight />
            </button>
          </div>
        </div>
        {/* 這邊開始是週日到週一 */}
        <div className="table_wrapper">
          <table className="date_table">
            <thead>
              {/* 輸出 ["日", "一", "二", "三", "四", "五", "六"] */}
              <tr className="row_day">
                {weekDayList.map(function (v, i) {
                  return (
                    <th key={i} className="cell_day">
                      {v}
                    </th>
                  )
                })}
              </tr>
            </thead>
            {/* 這邊開始是日期 */}
            <tbody>
              {allDataChunks.map((v, i) => {
                return (
                  <tr className="row_date" key={i}>
                    {v.map((item, idx) => (
                      <td
                        key={idx}
                        onClick={() => {
                          if (item) {
                            setMyDate(item)
                            DatePickGoToCart({
                              Year: myYear,
                              Month: myMonth,
                              Day: item
                            })
                          }
                        }}
                        className={`cell_date.disabled ${
                          myDate === item ? "chosenDate" : ""
                        } ${+idx % 7 === campOffDay ? "notAllow" : ""} 
                        ${
                          myYear <= year && myMonth <= month
                            ? item <= days
                              ? "notAllow"
                              : ""
                            : ""
                        }                        
                        `}
                        style={{
                          cursor: `${
                            myYear <= year && myMonth <= month
                              ? item <= days
                                ? "not-allowed"
                                : "pointer"
                              : "pointer"
                          }`
                        }}
                      >
                        <div className="date_num">{item}</div>
                        {Price &&
                          Price.length > 0 &&
                          Price.map((v, i) => {
                            return item !== "" ? (
                              <div key={i} className="price">
                                NTD {v.price}
                              </div>
                            ) : null
                          })}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* 這邊是這日曆的CSS */}
      <style jsx>{`
        td {
          padding: 10px 0;
        }
        /*td:hover {
          background-color: #708983; 
          cursor: pointer;
        }*/
        .priceHidden {
        }
        .notAllow {
          cursor: not-allowed;
          pointer-events: none;
          text-decoration: line-through;
          color: #999ea269;
          opacity: 0.4;
        }
        .chosenDate {
          background-color: #708983;
        }
        .calendar {
          width: 100%;
          border: 1px solid black;
          gap: 1em;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
          padding: 0 25px;
          border-bottom: 1px solid #eee;
        }
        .current_month {
          flex-grow: 1;
          font-size: 1.6rem;
          font-weight: 700;
        }
        .prev_month {
        }
        .next_month {
        }
        .disabled {
          color: #ddd;
          cursor: default;
        }
        .icons {
          font-size: 2rem;
          margin-right: 20px;
          border: none; /* 取消邊框 */
          padding: 0; /* 取消內邊距 */
          background: none; /* 取消背景色 */
          color: inherit; /* 繼承父元素的文字顏色 */
          cursor: pointer; /* 滑鼠懸停時顯示手型游標 */
          outline: none; /* 取消默認的焦點輪廓樣式 */
        }
        .table_wrapper {
          /* position: relative; */
          height: 100%;
        }
        .date_table {
          width: 100%;
          padding: 5px;
          border-collapse: separate;
          table-layout: fixed;
          height: 90%;
        }
        .row_day {
          text-align: center;
        }
        .cell_day {
          padding: 10px 0 20px;
          text-align: center;
          color: #666;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .row_date {
          text-align: center;
        }
        .cell_date {
          position: relative;
          padding: 8px 4px;
          border-radius: 6px;
          text-align: center;
          user-select: none;
        }
        .cell_date.selectable {
          cursor: pointer;
        }
        .cell_date.disabled {
          cursor: not-allowed;
          color: #ccc;
          background-color: transparent;
        }
        .cell_date.disabled .date_num {
          /* text-decoration: line-through; */
          font-size: 1.25rem;
        }
        .cell_date .date_num {
          font-size: 1.6rem;
          font-weight: 700;
        }
        .option-booking .cell-date .price {
          min-height: 20px;
          color: #666;
          font-size: 1rem;
        }
      `}</style>
    </>
  )
}
