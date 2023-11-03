import AuthContext from "@/context/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

export default function NavMemberBg({ auth }) {
  const { cartCount } = useContext(AuthContext)
  if (!auth.user_name || !auth.user_id) {
    return (
      <>
        <nav>
          <ul className="nav_member nav_member_bg">
            <li>
              <Link href="/member/login">登入</Link>
            </li>
            <li>
              <Link href="/member/register">註冊</Link>
            </li>
            <li>
              <Link href="/member/login">購物車</Link>
            </li>
          </ul>
        </nav>
      </>
    )
  } else {
    return (
      <>
        <nav>
          <ul className="nav_member nav_member_bg">
            <li>
              <Link href="/member/logout">登出</Link>
            </li>
            <li>
              <Link href="/member/notice">通知</Link>
            </li>
            <li>
              <Link href="/product/cart">
                購物車
                <span className="mention_cart">
                  {cartCount ? `(${cartCount})` : ""}
                </span>
              </Link>
            </li>
            <li className="m_li">
              <Image
                height={50}
                width={50}
                src={`http://localhost:3003/member/${
                  auth.user_img ? auth.user_img : "no_img.png"
                }`}
                alt=""
              ></Image>
              <Link className="m_name" href="/member">
                {auth.user_name}
              </Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
