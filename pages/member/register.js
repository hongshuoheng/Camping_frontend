import Layout from "@/components/Layouts/Layout"
import MemberTextInput from "@/components/MemberComponents/MemberTextInput"
// import MemberMailInput from "@/components/MemberComponents/MemberMailInput"
import MemberPswInput from "@/components/MemberComponents/MemberPswInput"
import MemberRadioInput from "@/components/MemberComponents/MemberRadioInput"
import cityData from "@/data/CityCountyData"
import { useState } from "react"
import Swal from "sweetalert2"
import { useRouter } from "next/router"

export default function Register() {
  const router = useRouter()
  const mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  const quickFill = () => {
    setRegisterData({
      first_name: "Jenny",
      last_name: "Lobster",
      user_name: "珍妮蘿蔔汁",
      user_mail: "steventu2021@gmail.com",
      password: "12345",
      password2: "12345",
      gender: 0,
      user_phone: "0258986358",
      city: "臺中市",
      area: "北屯區",
      postal_code: 406,
      user_address: "祥順六街28號"
    })
  }
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    user_mail: "",
    password: "",
    password2: "",
    gender: 0,
    user_phone: "",
    city: "",
    area: "",
    postal_code: "",
    user_address: ""
  })
  const [validMsg, setValidMsg] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    user_mail: "",
    password: "",
    password2: "",
    gender: "",
    user_phone: "",
    city: "",
    area: "",
    postal_code: "",
    user_address: ""
  })
  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value })
  }
  const handleGenderInput = (e) => {
    setRegisterData({ ...registerData, gender: e.target.value })
  }
  const handleCity = (e) => {
    setRegisterData({ ...registerData, city: e.target.value, area: "" })
  }
  const handleArea = (e) => {
    const zipData = cityData
      .filter((filterV) => {
        return filterV.CityName == registerData.city
      })[0]
      .AreaList.filter((filterV2) => {
        return filterV2.AreaName == e.target.value
      })[0].ZipCode
    setRegisterData({
      ...registerData,
      area: e.target.value,
      postal_code: zipData
    })
  }
  const register = async () => {
    await fetch(process.env.API_SERVER + "/member/register", {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((j) => {
        Swal.fire({
          title: "訊息",
          text: j.msg,
          icon: j.code == 200 ? "success" : "error"
        }).then(function () {
          if (j.code == 200) {
            router.push("/member/login")
          }
        })
      })
  }

  const handleSunbmit = (e) => {
    e.preventDefault()
    const newValidMsg = {
      first_name: "",
      last_name: "",
      user_name: "",
      user_mail: "",
      password: "",
      password2: "",
      gender: "",
      user_phone: "",
      city: "",
      area: "",
      postal_code: "",
      user_address: ""
    }
    let validFlag = true
    //email驗證
    if (!registerData.user_mail.trim()) {
      newValidMsg.user_mail = "*電子郵件為必填項目"
      validFlag = false
    } else if (!mailRegex.test(registerData.user_mail)) {
      newValidMsg.user_mail = "*電子郵件格式錯誤"
      validFlag = false
    }
    //密碼驗證
    if (!registerData.password.trim()) {
      newValidMsg.password = "*密碼未填"
      validFlag = false
    }
    if (registerData.password !== registerData.password2) {
      newValidMsg.password2 = "*確認密碼不相符"
      validFlag = false
    }
    if (!registerData.first_name.trim()) {
      newValidMsg.first_name = "姓氏未填寫"
      validFlag = false
    }
    if (!registerData.last_name.trim()) {
      newValidMsg.last_name = "名字未填寫完全"
      validFlag = false
    }
    if (!registerData.user_name.trim()) {
      newValidMsg.user_name = "暱稱為空白"
    }
    if (registerData.gender === "") {
      newValidMsg.gender = "*性別未選擇"
      validFlag = false
    }
    if (!registerData.user_phone.trim()) {
      newValidMsg.user_phone = "*連絡電話未填寫"
      validFlag = false
    }
    if (!registerData.city) {
      newValidMsg.city = "*縣市未選擇"
      validFlag = false
    }
    if (!registerData.area) {
      newValidMsg.area = "*地區未選擇"
      validFlag = false
    }
    if (!registerData.user_address.trim()) {
      newValidMsg.user_address = "*地址未填寫"
      validFlag = false
    }

    setValidMsg({ ...newValidMsg })
    if (validFlag) {
      register()
    }
  }

  return (
    <>
      <Layout pageTitle="註冊" contentTitle="會員註冊">
        <div className="member_content">
          <div className="register_content">
            <span onClick={quickFill}>★</span>
            <form className="member_form" onSubmit={handleSunbmit}>
              <MemberTextInput
                id={"user_mail"}
                name={"user_mail"}
                label={"電子郵件"}
                value={registerData.user_mail}
                handleChang={handleInput}
                validMsg={validMsg.user_mail}
              ></MemberTextInput>
              <MemberPswInput
                id={"password"}
                name={"password"}
                value={registerData.password}
                label={"密碼"}
                validMsg={validMsg.password}
                handleChang={handleInput}
              ></MemberPswInput>
              <MemberPswInput
                id={"password2"}
                name={"password2"}
                value={registerData.password2}
                label={"確認密碼"}
                validMsg={validMsg.password2}
                handleChang={handleInput}
              ></MemberPswInput>
              <div className="member_input_box">
                <label className="member_label" htmlFor="firstName">
                  姓名
                </label>
                <div className="member_address_box">
                  <div className="member_select_box">
                    <input
                      id="first_name"
                      type="text"
                      className="member_select"
                      name="first_name"
                      value={registerData.first_name}
                      placeholder="請輸入姓氏"
                      onChange={handleInput}
                    />

                    <input
                      id="last_name"
                      style={{ margin: 0 }}
                      type="text"
                      name="last_name"
                      value={registerData.last_name}
                      className="member_select"
                      placeholder="請輸入名字"
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="member_input_box">
                <span className="valid_msg">{validMsg.first_name}</span>
              </div>
              <MemberTextInput
                id={"user_name"}
                name={"user_name"}
                value={registerData.user_name}
                label={"暱稱"}
                handleChang={handleInput}
                validMsg={validMsg.user_name}
              ></MemberTextInput>
              <div className="member_input_box">
                <label className="member_label">性別</label>
                <div className="member_address_box">
                  <div className="member_select_box">
                    <MemberRadioInput
                      label={"男性"}
                      id={"male"}
                      name={"gender"}
                      value={1}
                      checked={parseInt(registerData.gender) === 1}
                      handleChange={handleGenderInput}
                    ></MemberRadioInput>
                    <MemberRadioInput
                      label={"女性"}
                      id={"female"}
                      name={"gender"}
                      value={0}
                      checked={parseInt(registerData.gender) === 0}
                      handleChange={handleGenderInput}
                    ></MemberRadioInput>
                  </div>
                </div>
              </div>
              <div className="member_input_box">
                <span className="valid_msg"> {validMsg.gender}</span>
              </div>
              <MemberTextInput
                id={"user_phone"}
                name={"user_phone"}
                label={"電話"}
                value={registerData.user_phone}
                handleChang={handleInput}
                validMsg={validMsg.phone}
              ></MemberTextInput>
              <div className="member_input_box">
                <label className="member_label" htmlFor="address">
                  地址
                </label>

                <div className="member_address_box">
                  <div className="member_select_box">
                    <div
                      className="member_select"
                      style={{ marginRight: "12px" }}
                    >
                      <select value={registerData.city} onChange={handleCity}>
                        <option value="" disabled>
                          請選擇縣市
                        </option>
                        {cityData.map((v) => {
                          return (
                            <option key={v.CityEngName} value={v.CityName}>
                              {v.CityName}
                            </option>
                          )
                        })}
                      </select>
                      <div className="member_input_box">
                        <span className="valid_msg_select">
                          {validMsg.city}
                        </span>
                      </div>
                    </div>
                    <div
                      className="member_select"
                      style={{ marginLeft: "12px" }}
                    >
                      <select value={registerData.area} onChange={handleArea}>
                        <option value="" disabled>
                          請選擇地區
                        </option>
                        {registerData.city &&
                          cityData
                            .filter((filterV) => {
                              return filterV.CityName == registerData.city
                            })[0]
                            .AreaList.map((v) => {
                              return (
                                <option key={v.AreaEngName} value={v.AreaName}>
                                  {v.AreaName}
                                </option>
                              )
                            })}
                      </select>
                      <input
                        id="postal_code"
                        type="hidden"
                        name="postal_code"
                        value={registerData.postal_code}
                      />
                      <div className="member_input_box">
                        <span className="valid_msg_select">
                          {validMsg.area}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="member_input_box">
                      <input
                        id="user_address"
                        type="text"
                        className="member_input"
                        name="address"
                        value={registerData.user_address}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="member_input_box">
                      <span className="valid_msg">{validMsg.user_address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="member_btn">註冊</button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}
