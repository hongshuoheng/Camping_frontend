import Layout from "@/components/Layouts/Layout"
import MemberTextInput from "@/components/MemberComponents/MemberTextInput"
import MemberPswInput from "@/components/MemberComponents/MemberPswInput"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import AuthContext from "@/context/AuthContext"
import Swal from "sweetalert2"

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext)
  const mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  const router = useRouter()
  const [loginData, setLoginData] = useState({ user_mail: "", password: "" })
  const [validMsg, setValidMsg] = useState({ user_mail: "", password: "" })
  const quickLogin = () => {
    setLoginData({ user_mail: "Tom_Close@campmail.com", password: "12345" })
  }
  const quickLogin2 = () => {
    setLoginData({ user_mail: "steventu2021@gmail.com", password: "12345" })
  }
  const login = async () => {
    await fetch(process.env.API_SERVER + "/member/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.code == 200) {
          setAuth(r.data)
          localStorage.setItem("member_auth", JSON.stringify(r.data))
        }
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: r.code == 200 ? "success" : "error"
        }).then(function () {
          if (r.code == 200) {
            router.push("/member")
          }
        })
      })
  }

  const handleInput = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const newValidMsg = {
      user_mail: "",
      password: ""
    }
    let validFlag = true
    //email驗證
    if (!loginData.user_mail.trim()) {
      newValidMsg.user_mail = "*電子郵件為必填項目"
      validFlag = false
    } else if (!mailRegex.test(loginData.user_mail)) {
      newValidMsg.user_mail = "*電子郵件格式錯誤"
      validFlag = false
    }
    //密碼驗證
    if (!loginData.password.trim()) {
      newValidMsg.password = "*密碼未填"
      validFlag = false
    }
    setValidMsg({ ...newValidMsg })
    if (validFlag) {
      login()
    }
  }

  useEffect(() => {}, [])
  return (
    <>
      <Layout pageTitle="登入" contentTitle="會員登入" bread={"會員/會員登入"}>
        <div className="member_content login_content">
          <form className="member_form" onSubmit={handleLogin}>
            <h2 className="member_title">
              會員登入<span onClick={quickLogin}>★</span>
              <span onClick={quickLogin2}>☆</span>
            </h2>
            <div className="member_form_body">
              <MemberTextInput
                id={"user_mail"}
                label={"電子郵件"}
                name={"user_mail"}
                value={loginData.user_mail}
                validMsg={validMsg.user_mail}
                handleChang={handleInput}
              ></MemberTextInput>
              <MemberPswInput
                id={"password"}
                label={"密碼"}
                name={"password"}
                value={loginData.password}
                validMsg={validMsg.password}
                handleChang={handleInput}
              ></MemberPswInput>
              <div className="member_input_box">
                <div className="forget_password">
                  <Link href="/member/forget-password">忘記密碼</Link>
                </div>
              </div>
            </div>
            <button className="member_btn">登入</button>
          </form>

          <div className="member_form">
            <h2 className="member_title">還沒成為會員？</h2>
            <div className="member_form_body">
              登入會員，儲存您的購物偏好，並能瀏覽您的購物紀錄，並能透過訂閱獲得本店最即時的優惠資訊。
            </div>
            <button
              className="member_btn"
              onClick={() => {
                router.push("/member/register")
              }}
            >
              註冊
            </button>
          </div>
        </div>
      </Layout>
    </>
  )
}
