import Layout from "@/components/Layouts/Layout"
import AuthContext from "@/context/AuthContext"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"

export default function Logout() {
  const router = useRouter()
  const { logout, auth } = useContext(AuthContext)
  const [time, setTime] = useState(5)
  // if (auth.user_name && auth.user_id) {
  //   logout()
  // } else {
  //   router.push("/member/login")
  // }
  useEffect(() => {
    logout()
  }, [])
  useEffect(() => {
    const count = setInterval(() => {
      setTime(time - 1)
    }, 1000)
    if (time <= 0) {
      clearInterval(count)
      router.push("/product/product")
    }

    return () => clearInterval(count)
  }, [time])
  return (
    <Layout pageTitle="登出" contentTitle="會員登出">
      <div style={{ marginTop: "45px" }} className="flex_center_column">
        <h2>
          登出成功,將於
          <span style={{ fontSize: "28px" }}> {time} </span>
          秒後跳轉
        </h2>
        <button
          style={{ width: "250px", marginTop: "32px" }}
          className="member_btn"
          onClick={() => {
            router.push("/product/product")
          }}
        >
          回商品首頁
        </button>
      </div>
    </Layout>
  )
}
