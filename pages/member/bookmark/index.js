import Layout from "@/components/Layouts/Layout"
import BkProductCard from "@/components/MemberComponents/BookmarkComponents/BkProductCard"
import BkCampCard from "@/components/MemberComponents/BookmarkComponents/BkCampCard"
import BkEventCard from "@/components/MemberComponents/BookmarkComponents/BkEventCard"
import BookmarkNav from "@/components/MemberComponents/BookmarkNav"
import MemberUtilityNav from "@/components/MemberComponents/memberUtilityNav"
import styles from "@/pages/member/bookmark/bookmark.module.css"
import Swal from "sweetalert2"
import { useState, useEffect, useContext } from "react"
import AuthContext from "@/context/AuthContext"
import {
  toggle_Bookmark_article,
  delBookmark_product,
  delBookmark_camp,
  delBookmark_event
} from "@/public/utilities/bookmarkFunc"
import Link from "next/link"
import { BiTrash } from "react-icons/bi"
import dayjs from "dayjs"
import parse from "html-react-parser"
const products = [
  {
    pid: 1,
    pName: "KRAKEN TENT SHELTER",
    pPrice: 14000,
    inventory: 0,
    img: "artic_parka_gtx(1).webp",
    onShelves: "2023-09-28"
  },
  {
    pid: 2,
    pName: "KRAKEN TENT SHELTER",
    pPrice: 12000,
    inventory: 1,
    img: "artic_parka_gtx(2).webp",
    onShelves: "2023-08-28"
  },
  {
    pid: 3,
    pName: "KRAKEN TENT SHELTER",
    pPrice: 12000,
    inventory: 1,
    img: "artic_parka_gtx(3).webp",
    onShelves: "2023-08-28"
  },
  {
    pid: 4,
    pName: "KRAKEN TENT SHELTER",
    pPrice: 12000,
    inventory: 1,
    img: "artic_parka_gtx(4).webp",
    onShelves: "2023-08-28"
  },
  {
    pid: 5,
    pName: "KRAKEN TENT SHELTER",
    pPrice: 12000,
    inventory: 1,
    img: "artic_parka_gtx(5).webp",
    onShelves: "2023-08-28"
  }
]

export default function Bookmark() {
  const { getToken } = useContext(AuthContext)
  const [type, setType] = useState("product")
  const [bookmarks, setBookmarks] = useState([])
  const handleActive = (e) => {
    setType(e.target.id)
    setBookmarks(null)
  }
  const handleDel = (e) => {
    // delProductBookmark(e.target.getAttribute("pid"))
    switch (type) {
      case "product":
        delBookmark_product(e.target.getAttribute("pid"), ifToken())
        setBookmarks(
          bookmarks.filter((v) => v.product_id != e.target.getAttribute("pid"))
        )
        break
      case "camp":
        delBookmark_camp(e.target.getAttribute("pid"), ifToken())
        setBookmarks(
          bookmarks.filter(
            (v) => v.campGroundID != e.target.getAttribute("pid")
          )
        )
        break
      case "event":
        delBookmark_event(e.target.getAttribute("pid"), ifToken())
        setBookmarks(
          bookmarks.filter((v) => v.events_id != e.target.getAttribute("pid"))
        )
        break
      case "article":
        toggle_Bookmark_article(e.target.getAttribute("pid"), ifToken())
        setBookmarks(
          bookmarks.filter((v) => v.msg_id != e.target.getAttribute("pid"))
        )
        break
    }
  }
  const ifToken = () => {
    if (getToken()) {
      return getToken()
    } else {
      window.location.href = "/member/login"
    }
  }
  const getBookmark = async (text) => {
    await fetch(process.env.API_SERVER + `/member/bookmark_${text}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ifToken()}`
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((r) => {
        if (r.code == 200) {
          console.log(r)
          setBookmarks(r.data)
        } else {
          Swal.fire({
            title: "訊息",
            text: r.msg,
            icon: "error"
          })
        }
      })
      .catch((ex) => {
        Swal.fire({
          title: "訊息",
          text: ex,
          icon: "error"
        })
      })
  }
  const delProductBookmark = async (product_id) => {
    await fetch(process.env.API_SERVER + "/member/bookmark_product", {
      method: "DELETE",
      body: JSON.stringify({ product_id: product_id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ifToken()}`
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((r) => {
        if (r.code == 200) {
          console.log(r)
        } else {
          Swal.fire({
            title: "訊息",
            text: r.msg,
            icon: "error"
          })
        }
      })
      .catch((ex) => {
        Swal.fire({
          title: "訊息",
          text: ex,
          icon: "error"
        })
      })
  }

  useEffect(() => {
    if (type === "product") {
      getBookmark("product")
      // setBookmarks(products)
    }
    if (type === "camp") {
      getBookmark("camp")
    }
    if (type === "event") {
      getBookmark("event")
    }
    if (type === "article") {
      getBookmark("article")
    }
    // console.log("effect")
  }, [type])

  return (
    <Layout pageTitle="收藏夾" contentTitle="商品收藏夾">
      <MemberUtilityNav></MemberUtilityNav>
      <BookmarkNav active={type} handleActive={handleActive}>
        <div className={styles.p_bookmark_content}>
          {type === "product" && bookmarks && (
            <div style={{ width: "92%" }}>
              {bookmarks.map((v) => {
                return (
                  <BkProductCard
                    key={v.product_id}
                    pid={v.product_id}
                    pName={v.product_name}
                    pPrice={v.unit_price}
                    inventory={v.inventory}
                    img={v.list_img.split(",")[0]}
                    onShelves={v.onShelves}
                    handleDel={handleDel}
                  ></BkProductCard>
                )
              })}
            </div>
          )}
          {type === "camp" && bookmarks && (
            <div style={{ width: "85%" }}>
              {bookmarks.map((v) => {
                return (
                  <BkCampCard
                    key={v.campGroundID}
                    cID={v.campGroundID}
                    EWSN={v.EWSN}
                    city={v.city}
                    site={v.site}
                    campname={v.campgroundName}
                    desc={v.campgroundDescription}
                    elevation={v.elevation}
                    ntd={v.minPrice}
                    handleDel={handleDel}
                    Img={v.IMG}
                  ></BkCampCard>
                )
              })}
            </div>
          )}
          {type === "article" && bookmarks && (
            <div>
              {bookmarks.map((v) => {
                return (
                  <div key={v.msg_id} className={styles.article_card}>
                    <div className={styles.article_card_inner}>
                      <BiTrash
                        style={{ top: "16px", right: "16px", color: "#333" }}
                        className={styles.trashcan}
                      ></BiTrash>
                      <div
                        style={{ top: "16px", right: "16px" }}
                        pid={v.msg_id}
                        className={styles.trashcan}
                        onClick={handleDel}
                      ></div>
                      <Link href={`/discussion/${v.msg_id}`}>
                        <div>
                          <img className={styles.article_img} src={v.img} />
                        </div>
                      </Link>
                      <div className={styles.article_content}>
                        <div>
                          <Link href={`/discussion/${v.msg_id}`}>
                            <div className={styles.article_title}>
                              {v.title}
                            </div>
                          </Link>
                          <div className={styles.article_text}>
                            {" "}
                            {parse("<p>" + v.content + "</p>")}
                          </div>
                        </div>
                        <div className={styles.article_author}>
                          <img
                            className="avatar"
                            src={`http://localhost:3003/member/${
                              v.user_img ? v.user_img : "no_img.png"
                            }`}
                          />
                          <div>
                            <div className={styles.article_author_name}>
                              {v.user_name}
                            </div>
                            <div>
                              {dayjs(v.createTime).format(
                                "YYYY/MM/DD HH:mm:ss"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {type === "event" && bookmarks && (
            <div>
              {bookmarks.map((v) => {
                return (
                  <BkEventCard
                    key={v.events_id}
                    id={v.events_id}
                    maplocation={v.maplocation}
                    title={v.title}
                    fullIntro={v.fullIntro}
                    img={v.img_file}
                    click={v.click}
                    handleDel={handleDel}
                  ></BkEventCard>
                )
              })}
            </div>
          )}
        </div>
      </BookmarkNav>
    </Layout>
  )
}
