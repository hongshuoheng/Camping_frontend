import Head from "next/head"
// import styles from "./layout.module.css"
import Link from "next/link"
import NavPage from "./NavPage"
import NavMember from "./NavMember"
import MenuBtn from "./MenuBtn"
import Menu from "./Menu"
import { useState, useContext } from "react"
import AuthContext from "@/context/AuthContext"

export default function Layout({
  pageTitle = "未命名網頁",
  contentTitle = "未命名內容標題",
  bread = null,
  children
}) {
  const { auth, logout } = useContext(AuthContext)
  const [menuShow, setMenuShow] = useState(false)
  const handleMenu = () => {
    setMenuShow(!menuShow)
  }

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
      </Head>

      <section className="main_section">
        <div>
          <div className="section_content">
            <Link href={"/"}>
              <div className="nav_logo">
                <div className="title_box">露營生活</div>
              </div>
            </Link>
            <NavPage></NavPage>
            <NavMember auth={auth}></NavMember>
          </div>
        </div>
      </section>
      <div className="container">
        <div>
          <div className="main_title">
            <div className="content_title">
              <div className="title_box">
                <p>{contentTitle}</p>
              </div>
            </div>
            {bread && <div className="bread">{bread}</div>}
          </div>
          <div className="main_content">
            <div className="content">{children}</div>
          </div>
        </div>
      </div>
      <Menu auth={auth} menuShow={menuShow} />
      <MenuBtn handleClick={handleMenu} menuShow={menuShow} />
    </>
  )
}
