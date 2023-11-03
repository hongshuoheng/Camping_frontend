import Layout from "@/components/Layouts/Layout"
import HistoryNav from "@/components/MemberComponents/HistoryNav"
import MemberUtilityNav from "@/components/MemberComponents/memberUtilityNav"
import AuthContext from "@/context/AuthContext"
import style from "@/pages/member/history/history.module.css"
import styles from "@/pages/member/bookmark/bookmark.module.css"
import dayjs from "dayjs"
import { useState, useEffect, useContext } from "react"
import Swal from "sweetalert2"
import styles2 from "@/components/eventcomponent/Card.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import HistArticleCard from "@/components/MemberComponents/HistoryComponents/HistArticleCard"
import { delPostArticle } from "@/public/utilities/bookmarkFunc"

export default function Bookmark() {
  const router = useRouter()
  const { auth, getToken } = useContext(AuthContext)
  const [type, setType] = useState("product")
  const [historys, setHistorys] = useState([])
  const handleActive = (e) => {
    setType(e.target.id)
    setHistorys(null)
  }
  const getCampTotal = (v) => {
    let total = 0
    total += parseInt(v.campPrice)
    total += parseInt(v.tentsPrice)
    if (v.options[0]) {
      for (let option of v.options) {
        total += option.option_num * option.option_price
      }
    }
    return total
  }
  const getHistory = async (type) => {
    await fetch(process.env.API_SERVER + `/member/history_${type}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then((res) => {
        return res.json()
      })
      .then((r) => {
        if (r.code == 200) {
          setHistorys(r.data)
        } else {
          Swal.fire({ title: "訊息", text: r.msg, icon: "error" })
        }
      })
  }
  const handleDelPostArticle = (e) => {
    Swal.fire({
      title: "刪除文章",
      text: "確定要刪除這篇文章嗎？",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        delPostArticle(e.target.getAttribute("article_id"), auth.token)
        setHistorys(
          historys.filter(
            (v) => v.msg_id != e.target.getAttribute("article_id")
          )
        )
      }
    })
  }
  useEffect(() => {
    getHistory(type)
  }, [type])
  useEffect(() => {
    if (router.query.type) {
      switch (router.query.type) {
        case "product":
        case "camp":
        case "article":
        case "event":
          setType(router.query.type)
          break
        default:
          break
      }
    }
  }, [router.query])
  console.log(historys)
  return (
    <Layout pageTitle="收藏夾" contentTitle="商品收藏夾">
      <MemberUtilityNav active="history"></MemberUtilityNav>
      <HistoryNav active={type} handleActive={handleActive}>
        {type === "product" &&
          historys &&
          (historys.length > 0 ? (
            <div>
              <div className={style.history_content}>
                <div className={style.history_thead}>
                  <div className={style.history_date}>日期</div>
                  <div className={style.history_product}>產品</div>
                  <div className={style.history_price}>價格</div>
                  <div className={style.history_payment}>付款方式</div>
                </div>

                {historys.map((v) => {
                  return (
                    <>
                      <div className={style.history_tbody}>
                        <div className={style.history_date}>
                          {dayjs(v.purchase_date).format("YYYY/MM/DD-HH:mm")}
                        </div>
                        <div className={style.history_product}>
                          {v.products.map((p, i) => {
                            return (
                              <div key={v.purchase_id + "_p_" + i}>
                                {p.product_name} {p.type}* {p.product_pcs}
                              </div>
                            )
                          })}
                        </div>
                        <div className={style.history_price}>
                          {v.products.map((p, i) => {
                            return (
                              <div key={v.purchase_id + "_pr_" + i}>
                                {p.price}
                              </div>
                            )
                          })}
                        </div>
                        <div className={style.history_payment}>
                          {v.payment_method}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          ) : (
            <div>沒有資料</div>
          ))}
        {type === "camp" &&
          historys &&
          (historys.length > 0 ? (
            <div>
              <div className={style.history_content}>
                <div className={style.history_thead}>
                  <div className={style.history_date}>訂單編號</div>
                  <div className={style.history_product}>營地</div>
                  <div className={style.history_price}>價格</div>
                  <div className={style.history_payment}>露營日期</div>
                </div>

                {historys.map((v) => {
                  return (
                    <>
                      <div className={style.history_tbody}>
                        <div className={style.history_date}>{v.orderID}</div>
                        <div className={style.history_product}>
                          <div style={{ fontWeight: "600" }}>
                            {v.CampgroundName} || 露營區:{v.campName}
                          </div>
                          <div>帳篷: {v.tentsPeople}人</div>
                          {v.options[0] &&
                            v.options.map((o, i) => {
                              return (
                                <div key={v.orderID + "_o_" + i}>
                                  {o.option_name} * {o.option_num}
                                </div>
                              )
                            })}
                        </div>
                        <div className={style.history_price}>
                          <div>{v.campPrice}</div>
                          <div>{v.tentsPrice}</div>
                          {v.options[0] &&
                            v.options.map((o, i) => {
                              return (
                                <div key={v.orderID + "_pr_" + i}>
                                  {o.option_price * o.option_num}
                                </div>
                              )
                            })}
                        </div>
                        <div className={style.history_payment}>
                          {v.order_date}
                        </div>

                        <div className={style.history_total_price}>
                          <span
                            className={style.history_paymeny_time}
                          >{`下單時間: ${dayjs(v.PaymentTime).format(
                            "YYYY/MM/DD--HH:mm"
                          )}`}</span>
                          總價: {getCampTotal(v)}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          ) : (
            <div>沒有資料</div>
          ))}
        {type === "article" &&
          historys &&
          (historys.length > 0 ? (
            <>
              <h2>你發表的文章</h2>
              <div className={styles.p_bookmark_content}>
                <div style={{ gap: "10px" }}>
                  {historys.map((v) => {
                    return (
                      <HistArticleCard
                        key={v.msg_id}
                        {...v}
                        handleDelete={handleDelPostArticle}
                      ></HistArticleCard>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>沒有資料</div>
          ))}
        {type === "event" &&
          historys &&
          (historys.length > 0 ? (
            <>
              <h2>即將開始</h2>
              <div>
                <div className={style.history_event}>
                  {historys
                    .filter((f) => new Date(f.event_start) > new Date())
                    .map((v) => {
                      return (
                        <div key={v.events_id} className={styles2.cardScope}>
                          <Link href={`/offevent/${v.events_id}`}>
                            <div className={styles2.card}>
                              <img
                                src={`/eventsimg/${v.img_file}`}
                                className={styles2.imgP}
                                alt="..."
                              />

                              <div>
                                <h3 className={styles2.cardBody}>{v.title}</h3>
                                <p className={styles2.cardBody}>
                                  活動時間: {v.event_start}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })}
                </div>
              </div>
              <br></br>
              <hr></hr>
              <h2>已結束</h2>
              <div>
                <div className={style.history_event}>
                  {historys
                    .filter((f) => new Date(f.event_start) < new Date())
                    .map((v) => {
                      return (
                        <div key={v.events_id} className={styles2.cardScope}>
                          <Link href={`/offevent/${v.events_id}`}>
                            <div className={styles2.card}>
                              <img
                                src={`/eventsimg/${v.img_file}`}
                                className={styles2.imgP}
                                alt="..."
                              />

                              <div>
                                <h3 className={styles2.cardBody}>{v.title}</h3>
                                <p className={styles2.cardBody}>
                                  活動時間: {v.event_start}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })}
                </div>
              </div>
            </>
          ) : (
            <div>沒有資料</div>
          ))}
      </HistoryNav>
    </Layout>
  )
}
