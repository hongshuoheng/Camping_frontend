import { useState, useContext } from "react"
import { BiSearch } from "react-icons/bi"
import Link from "next/link"
import { useRouter } from "next/router"
import AuthContext from "@/context/AuthContext"
import Image from "next/image"

export default function Menu({ auth, menuShow, unique }) {
  const { cartCount } = useContext(AuthContext)
  const router = useRouter()
  const [show, setShow] = useState({ product: false, camp: false })

  const handleP = () => {
    const newStatue = !show.product
    setShow({ ...show, product: newStatue })
  }

  const handleC = () => {
    const newStatue = !show.camp
    setShow({ ...show, camp: newStatue })
  }

  const handleE = () => {
    const newStatue = !show.event
    setShow({ ...show, event: newStatue })
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      router.push(`/product/product?search=${e.target.value}`)
    }
  }
  return (
    <>
      <div className={`menu${menuShow ? "" : " menu_hide"}`} style={unique}>
        <div className="search_bar">
          <BiSearch className="srch_icon" />
          <input
            className="menu_search_input"
            type="text"
            onKeyUp={handleSearch}
          />
          {/* <span>search</span> */}
        </div>
        <div className={"menu_utility"}>
          <ul>
            <li>
              <span onClick={handleP}>商品</span>
              <ul
                className={`menu_inner ${
                  show.product ? "" : "menu_inner_hide"
                }`}
              >
                <li>
                  <Link href="/product/product?catetory=帳篷">帳篷</Link>
                </li>
                <li>
                  <Link href="/product/product/product?category=篷布">
                    篷布
                  </Link>
                </li>
                <li>
                  <Link href="/product/product?category=露營工具">
                    露營工具
                  </Link>
                </li>
                <li>
                  <Link href="/product/product?category=露營用品">
                    戶外折疊傢俱
                  </Link>
                </li>
                <li>
                  <Link href="/product/product?category=onsale">折扣商品</Link>
                </li>
              </ul>
            </li>
            <li>
              <span onClick={handleC}>營地</span>
              <ul
                className={`menu_inner ${show.camp ? "" : "menu_inner_hide"}`}
              >
                <li>
                  <Link href="/campSite/list?postion=north">北區</Link>
                </li>
                <li>
                  <Link href="/campSite/list?postion=west">中西區</Link>
                </li>
                <li>
                  <Link href="/campSite/list?postion=south">南區</Link>
                </li>
                <li>
                  <Link href="/campSite/list?postion=east">東區</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/discussion/articlelist">討論區</Link>
            </li>
            <li>
              <Link href="/offevent/category">活動</Link>
            </li>
            <li>
              <Link href="/Q&A">常見問答</Link>
            </li>
          </ul>
        </div>
        <div style={{ paddingTop: "20px" }} className="menu_member">
          {auth.user_name && auth.user_id && (
            <div className="m_li">
              <Link href="/member">
                <Image
                  height={50}
                  width={50}
                  src={`http://localhost:3003/member/${
                    auth.user_img ? auth.user_img : "no_img.png"
                  }`}
                  alt=""
                ></Image>
              </Link>
              <Link className="m_name" href="/member">
                {auth.user_name}
              </Link>
            </div>
          )}
          <ul>
            {auth.user_name && auth.user_id ? (
              <>
                <li>
                  <Link href="/member/logout">登出</Link>
                </li>
                <li>
                  <Link href="/product/cart">
                    購物車{cartCount ? `(${cartCount})` : ""}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={
                      router.pathname == "/member/login" ||
                      router.pathname == "/member/logout"
                        ? router.asPath
                        : "/member/login?url=" + router.pathname
                    }
                  >
                    登入
                  </Link>
                </li>
                <li>
                  <Link href="/member/register">註冊</Link>
                </li>
                <li>
                  <Link href="/product/cart">購物車</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
