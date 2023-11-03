import Layout from "@/components/Layouts/Layout"
import MemberTextInput from "@/components/MemberComponents/MemberTextInput"
import MemberPswInput from "@/components/MemberComponents/MemberPswInput"
import styles from "@/pages/member/memberPage.module.css"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Swal from "sweetalert2"
import AuthContext from "@/context/AuthContext"

export default function Login() {
  const { auth } = useContext(AuthContext)
  const mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [mail, setMail] = useState("")
  const quickLogin = () => {
    setMail("steventu2021@gmail.com")
  }
  const [resetPsw, setResetPsw] = useState({ password: "", resetCode: "" })
  const [valid, setValid] = useState("")
  const handleMailChang = (e) => {
    setMail(e.target.value)
  }
  const handleResetChang = (e) => {
    setResetPsw({ ...resetPsw, [e.target.id]: e.target.value })
  }
  const getCode = async () => {
    const sendmail = async () => {
      fetch(process.env.API_SERVER + "/member/forgotpsw", {
        method: "POST",
        body: JSON.stringify({ user_mail: mail }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((r) => {
          Swal.fire({
            title: "訊息",
            text: r.msg,
            icon: r.code == 200 ? "success" : "error"
          }).then(function () {
            if (r.code == 200) {
              setStep(2)
            }
          })
        })
    }
    sendmail()
  }
  const restPassword = async () => {
    const reset = async () => {
      fetch(process.env.API_SERVER + "/member/resetPswByResetCode", {
        method: "POST",
        body: JSON.stringify({
          user_mail: mail,
          resetCode: resetPsw.resetCode,
          password: resetPsw.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((r) => {
          Swal.fire({
            title: "訊息",
            text: r.msg,
            icon: r.code == 200 ? "success" : "error"
          }).then(function () {
            if (r.code == 200) {
              router.push("/member/login")
            }
          })
        })
    }
    reset()
  }

  useEffect(() => {
    if (auth.user_id || auth.user_name) {
      router.push("/member")
    }
  }, [auth])
  return (
    <Layout
      pageTitle="忘記密碼"
      contentTitle="忘記密碼"
      bread={"會員/忘記密碼"}
    >
      <div className="forget_password_content">
        <div className="member_form">
          {step == 1 ? (
            <>
              <h2 className="member_title">請輸入電子郵件以傳送驗證碼<span onClick={quickLogin}>★</span></h2>
              <div className="member_form_body">
                <MemberTextInput
                  id={"user_mail"}
                  label={"電子郵件"}
                  name={"user_mail"}
                  value={mail}
                  validMsg={valid}
                  handleChang={handleMailChang}
                ></MemberTextInput>
                <button className="member_btn" onClick={getCode}>
                  傳送驗證碼
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="member_title">重設密碼</h2>
              <div className="member_form_body">
                <MemberPswInput
                  id={"password"}
                  label={"請輸入新密碼"}
                  name={"password"}
                  value={resetPsw.password}
                  validMsg={valid}
                  handleChang={handleResetChang}
                ></MemberPswInput>
                <MemberTextInput
                  id={"resetCode"}
                  label={"請輸入驗證碼"}
                  name={"resetCode"}
                  value={resetPsw.resetCode}
                  validMsg={valid}
                  handleChang={handleResetChang}
                ></MemberTextInput>
                <div className={styles.btn_box}>
                  <button
                    className="member_btn"
                    onClick={() => {
                      setStep(1)
                    }}
                  >
                    回上一步
                  </button>
                  <button className="member_btn" onClick={restPassword}>
                    重設密碼
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
