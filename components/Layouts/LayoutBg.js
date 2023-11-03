import Head from "next/head"
// import styles from "./layout.module.css"
import Link from "next/link"
import NavPageBg from "./NavPageBg"
import NavMemberBg from "./NavMemberBg"
import MenuBgBtn from "./MenuBgBtn"
import Menu from "./Menu"
import { useState, useContext } from "react"
import AuthContext from "@/context/AuthContext"

export default function LayoutBg({
  pageTitle = "未命名網頁",
  bread = null,
  children
}) {
  const { auth } = useContext(AuthContext)
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
      <div>{children}</div>
      <section
        style={{
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: "10",
          borderRightColor: "white"
        }}
        className="main_section"
      >
        <div>
          <div className="section_content">
            <Link href={"/"}>
              <div className="nav_logo">
                <div style={{ color: "#fff" }} className="title_box">
                  露營生活
                </div>
              </div>
            </Link>
            <NavPageBg></NavPageBg>
            <NavMemberBg auth={auth}></NavMemberBg>
          </div>
        </div>
      </section>
      <Menu auth={auth} menuShow={menuShow} unique={{ zIndex: "10" }} />
      <MenuBgBtn
        unique={{
          position: "fixed",
          top: "0",
          right: "24px",
          zIndex: "10",
          color: "e8e8e8"
        }}
        handleClick={handleMenu}
        menuShow={menuShow}
      />
    </>
  )
}
