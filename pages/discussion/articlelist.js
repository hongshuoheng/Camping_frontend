import React, { useState, useEffect } from "react"
import Layout from "@/components/Layouts/Layout"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useRouter } from "next/router"
import Link from "next/link"

export default function TestPage() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(data2.length / itemsPerPage)

  const updateBrowse = async (articleId) => {
    await fetch(`http://localhost:3003/discussion/articlelist?id=${articleId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("瀏覽人數更新成功:", data)
      })
      .catch((error) => {
        console.error("瀏覽人數更新失敗:", error)
      })
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const ch = (text) => {
    let newdata = data.filter((v) => v.categoryname === text)
    setData2(newdata)
  }

  const browse = () => {
    let borwsevl = [...data]
    borwsevl.sort((a, b) => b.browse - a.browse)
    setData2(borwsevl)
  }

  const getAllarticle = async () => {
    await fetch("http://localhost:3003/discussion/msgs")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setData2(json)
      })
  }

  useEffect(() => {
    getAllarticle()
  }, [])

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItems = data2.slice(firstItemIndex, lastItemIndex)
  console.log(currentItems)

  return (
    <Layout pageTitle={"pageForTest"} contentTitle={"文章列表"}>
      <div
        className="category-labels"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "-30px"
        }}
      >
        <button
          className={`category-text ${selectedCategory === "熱門" ? "selected" : ""
            }`}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "16px"
          }}
          onClick={() => {
            browse()
          }}
        >
          熱門 |
        </button>
        <button
          className={`category-text ${selectedCategory === "心情" ? "selected" : ""
            }`}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "16px"
          }}
          onClick={() => {
            ch("討論")
          }}
        >
          討論 |
        </button>
        <button
          className={`category-text ${selectedCategory === "心情" ? "selected" : ""
            }`}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "16px"
          }}
          onClick={() => {
            ch("心情")
          }}
        >
          教學 |
        </button>
        <button
          className={`category-text ${selectedCategory === "分享" ? "selected" : ""
            }`}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "16px"
          }}
          onClick={() => {
            ch("分享")
          }}
        >
          心情 |
        </button>
        <button
          className={`category-text ${selectedCategory === "教學" ? "selected" : ""
            }`}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "16px"
          }}
          onClick={() => {
            ch("教學")
          }}
        >
          分享
        </button>
        <button
          className="member_btn"
          style={{
            //   width: "100%",
            //   maxWidth: "200px",
            marginTop: "12px",
            marginBottom: "20px",
            //   padding: "12px 0",
            //   backgroundColor: "rgba(0, 0, 0, 0.5)",
            //   color: "var(--color--less-w)",
            //   fontSize: "var(--text-md)",
            marginLeft: "10px"
          }}
          onClick={() => {
            router.push("/discussion/post")
          }}
        >
          發布文章
        </button>
      </div>

      <div className="content">
        <div className="article-list" style={{ marginTop: "-55px" }}>


          {currentItems.map((article, index) => (
            <div key={index} className="card_kevin">
              <Link
                href={`/discussion/${article.id}`}
                onClick={() => updateBrowse(article.id)}
              >
                <div>
                  <img className="cardimg_kevin" src={article.img} />
                </div>
              </Link>
              <div className="flex_kevin">
                <div className="flex_kevin1">
                  <Link
                    href={`/discussion/${article.id}`}
                    onClick={() => updateBrowse(article.id)}
                  >
                    <div className="title_kevin">{article.title}</div>
                  </Link>
                </div>
                <div className="flex_kevin2">
                  <div className="flex_kevin3">
                    <div className="flex_kevin4">
                      <div>
                        <VisibilityIcon />
                      </div>
                      <div className="views_kevin"> {article.browse} views</div>
                    </div>
                    <div className="flex_kevin5">
                      <div>
                        <FavoriteBorderIcon />
                      </div>
                      <div className="likes_kevin">4311 likes</div>
                    </div>
                  </div>
                  <div className="flex_kevin6">
                    <div className="flex_kevin7">
                      <img
                        className="avatar"
                        src={`http://localhost:3003/member/${article.user_img ? article.user_img : "no_img.png"
                          }`}
                      />
                    </div>
                    <div className="flex_kevin8">
                      <div className="flex_kevin9">
                        <div className="username_kevin">
                          {article.user_name}
                        </div>
                      </div>
                      <div className="flex_kevin10">
                        <div className="releasetime_kevin">
                          {Date(article.createTime)}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ marginRight: "50px" }}>
          <button className='member_btn' onClick={handlePrevPage} disabled={currentPage === 1}>
            上一頁
          </button>
        </div>
        <div>
          <button className='member_btn'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            下一頁
          </button>
        </div>
      </div>
    </Layout>
  )
}
