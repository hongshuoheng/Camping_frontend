import Layout from "@/components/Layouts/Layout"
import MemberPswInput from "@/components/MemberComponents/MemberPswInput"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import AuthContext from "@/context/AuthContext"
import Swal from "sweetalert2"

export default function ChangePassword() {
  const { auth, logout } = useContext(AuthContext)

  const router = useRouter()
  const [pswData, setPswData] = useState({
    old_password: "",
    new_password: "",
    new_password2: ""
  })
  const [validMsg, setValidMsg] = useState({
    old_password: "",
    new_password: "",
    new_password2: ""
  })

  const resetPsw = async () => {
    await fetch(process.env.API_SERVER + "/member/resetPsw", {
      method: "POST",
      body: JSON.stringify(pswData),
      headers: new Headers({
        method: "POST",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      })
    })
      .then((res) => res.json())
      .then((r) => {
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: r.code == 200 ? "success" : "error"
        }).then(function () {
          if (r.code == 200) {
            logout()
            router.push("/member/login")
          }
        })
      })
  }

  const handleInput = (e) => {
    setPswData({ ...pswData, [e.target.id]: e.target.value })
  }

  const handleChangePsw = (e) => {
    e.preventDefault()
    setValidMsg({
      old_password: "",
      new_password: "",
      new_password2: ""
    })
    let newValidMsg = { old_password: "", new_password: "", new_password2: "" }
    let flag = true
    if (!pswData.old_password) {
      newValidMsg.old_password = "密碼未填寫"
      flag = false
    }
    if (!pswData.new_password) {
      newValidMsg.new_password = "新密碼未填寫"
      flag = false
    }
    if (pswData.new_password2 !== pswData.new_password) {
      newValidMsg.new_password2 = "密碼不相符"
      flag = false
    }
    setValidMsg(newValidMsg)
    if (flag) {
      resetPsw()
    }
  }
  return (
    <>
      <Layout
        pageTitle="修改密碼"
        contentTitle="修改密碼"
        bread={"會員/修改密碼"}
      >
        <div
          style={{ width: "650px" }}
          className="member_content login_content"
        >
          <form className="member_form" onSubmit={handleChangePsw}>
            <div className="member_form_body">
              <MemberPswInput
                id={"old_password"}
                label={"原密碼"}
                name={"old_password"}
                value={pswData.old_password}
                validMsg={validMsg.old_password}
                handleChang={handleInput}
              ></MemberPswInput>
              <MemberPswInput
                id={"new_password"}
                label={"新密碼"}
                name={"new_password"}
                value={pswData.new_password}
                validMsg={validMsg.new_password}
                handleChang={handleInput}
              ></MemberPswInput>
              <MemberPswInput
                id={"new_password2"}
                label={"確認新密碼"}
                name={"new_password2"}
                value={pswData.new_password2}
                validMsg={validMsg.new_password2}
                handleChang={handleInput}
              ></MemberPswInput>
            </div>
            <button className="member_btn">修改密碼</button>
          </form>
        </div>
      </Layout>
    </>
  )
}
