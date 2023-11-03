import { useEffect, useState, useContext } from "react"
import Layout from "@/components/Layouts/Layout"
import styles from "../css/registration-form.module.css"
import { BsBrowserSafari, BsFillCameraFill } from "react-icons/bs"
import { useRouter } from "next/router"
import AuthContext from "@/context/AuthContext"

import Swal from "sweetalert2"
export default function RegistrationForm() {
  const router = useRouter()
  const [data, setData] = useState([])
  const { auth, getToken } = useContext(AuthContext)
  const [people, setPeople] = useState([])
  const [registration, setRegistration] = useState({
    email: "",
    people: "",
    contactperson: "",
    phone: ""
  })
  const [inputRefs, setInputRefs] = useState({
    email: null,
    people: null,
    contactperson: null,
    phone: null
  })
  const [validMsg, setValidMsg] = useState({
    email: "",
    people: "",
    contactperson: "",
    phone: ""
  })
  const quickFill = () => {
    setRegistration({
      email: "wait455231@gmail.com",
      people: "2",
      contactperson: "洪碩",
      phone: "0953808781"
    })
  }
  const handleInput = (e) => {
    setRegistration({ ...registration, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newValidMsg = {
      email: "",
      people: "",
      contactperson: "",
      phone: ""
    }
    let validFlag = true
    let firstErrorInputRef = null // 參考第一個有錯誤的輸入欄位
    //email驗證
    const mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    if (!registration.email.trim()) {
      validFlag = false
      newValidMsg.email = "請填寫電子郵件"
    } else if (!mailRegex.test(registration.email)) {
      validFlag = false
      newValidMsg.email = "電子郵件格式錯誤"
    }
    //人數驗證
    if (!registration.people.trim()) {
      validFlag = false
      newValidMsg.people = "報名人數未填，請填數字"
    }
    const numberRegex = new RegExp(/^\d+$/)
    if (!numberRegex.test(registration.people)) {
      validFlag = false
      newValidMsg.people = "請填阿拉伯數字"
    }
    if (parseInt(registration.people) > people[1].remaining_slots) {
      validFlag = false
      newValidMsg.people = `超過報名上限剩${people[1].remaining_slots}人`
    }

    if (!registration.contactperson.trim()) {
      validFlag = false
      newValidMsg.contactperson = "最少2個字，請用中文或英文"
    } else if (registration.contactperson.length < 2) {
      validFlag = false
      newValidMsg.contactperson = "最少2個字"
    } else {
      const nameRegex = /^[A-Za-z\u4e00-\u9fa5]+$/
      if (!nameRegex.test(registration.contactperson)) {
        validFlag = false
        newValidMsg.contactperson = "請輸入英文或中文並不包含任意符號"
      }
    }

    const phoneRegex = /^09\d{8}$/
    if (registration.phone === "") {
      validFlag = false
      newValidMsg.phone = "請填寫手機號碼"
    }
    if (!phoneRegex.test(registration.phone)) {
      validFlag = false
      newValidMsg.phone = "請填09開頭的手機號碼"
    }
    Object.keys(newValidMsg).forEach((field) => {
      if (newValidMsg[field] !== "" && !firstErrorInputRef) {
        firstErrorInputRef = inputRefs[field]
      }
    })
    setValidMsg({ ...newValidMsg })
    if (validFlag) {
      add()
    } else if (firstErrorInputRef) {
      firstErrorInputRef.focus() // 設置焦點到第一個有錯誤的輸入欄位
    }
  }
  const handleBlur = (field, fieldName) => {
    const newValidMsg = { ...validMsg }
    let validFlag = true
    switch (field) {
      case "email": {
        // ... // 驗證 email
        // 驗證 email
        const mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
        if (!registration.email.trim()) {
          validFlag = false
          newValidMsg.email = "請填寫電子郵件"
        } else if (!mailRegex.test(registration.email)) {
          validFlag = false
          newValidMsg.email = "電子郵件格式錯誤"
        }
        break
      }
      case "people": {
        // ... // 驗證人數
        if (!registration.people.trim()) {
          validFlag = false
          newValidMsg.people = "報名人數未填，請填數字"
        }
        const numberRegex = new RegExp(/^\d+$/)
        if (!numberRegex.test(registration.people)) {
          validFlag = false
          newValidMsg.people = "請填阿拉伯數字"
        }
        if (parseInt(registration.people) > people[1].remaining_slots) {
          validFlag = false
          newValidMsg.people = `超過報名上限剩${people[1].remaining_slots}人`
        }
        break
      }
      case "contactperson": {
        // ... // 驗證緊急聯絡人
        if (!registration.contactperson.trim()) {
          validFlag = false
          newValidMsg.contactperson = "最少2個字，請用中文或英文"
        } else if (registration.contactperson.length < 2) {
          validFlag = false
          newValidMsg.contactperson = "最少2個字"
        } else {
          const nameRegex = /^[A-Za-z\u4e00-\u9fa5]+$/
          if (!nameRegex.test(registration.contactperson)) {
            validFlag = false
            newValidMsg.contactperson = "請輸入英文或中文並不包含任意符號"
          }
        }

        break
      }
      case "phone": {
        // ... // 驗證電話號碼
        const phoneRegex = /^09\d{8}$/
        if (registration.phone === "") {
          validFlag = false
          newValidMsg.phone = "請填寫手機號碼"
        }
        if (!phoneRegex.test(registration.phone)) {
          validFlag = false
          newValidMsg.phone = "請填09開頭的手機號碼"
        }
        break
      }
      default:
        break
    }

    setValidMsg(newValidMsg)
    // 如果通過驗證，將錯誤訊息隱藏
    if (validFlag) {
      setValidMsg({ ...newValidMsg, [fieldName]: "" })
    }
  }
  // 新增 handleEnterKey 函數
  const handleEnterKey = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault()
      // 切換焦點到下一個欄位
      if (inputRefs[nextField]) {
        inputRefs[nextField].focus()
      }
    }
  }
  //!========================抓資料==============================
  const fetchEventDetail = async (eid) => {
    try {
      const res = await fetch(`http://localhost:3003/event/${eid}`)
      const data1 = await res.json()
      setData(data1.sql)
      setPeople(data1.peoplesql)
    } catch (error) {
      console.error("Error fetching event details:", error)
    }
  }
  useEffect(() => {
    if (router.isReady) {
      const { eid } = router.query
      fetchEventDetail(eid)
    }
  }, [router.isReady])

  //!======================送入點擊次數============================
  const add = () => {
    fetch("http://localhost:3003/event/registration_form", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        events_id: data[0].events_id,
        user_id: auth.user_id, // 這部分可能需要更改，視你的需求而定
        email: registration.email,
        number_of_applicants: parseInt(registration.people),
        emergency_contact: registration.contactperson,
        phone: registration.phone
      })
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("失敗哭哭")
        }
        // 可以處理成功提交後的操作
      })
      .then(
        Swal.fire({
          title: "報名成功",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: '<i class="far fa-check-circle fs-5"></i>確定'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          router.push("/offevent/category")
        })
      )
      .catch((error) => {
        console.error("Error submitting form:", error)
      })
  }

  return (
    data.length !== 0 && (
      <>
        <Layout pageTitle={"活動報名表"} contentTitle={"活動報名表"}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formbody}>
                <label className={styles.lable}>
                  活動<span onClick={quickFill}>*</span>
                </label>
                <input
                  id="event"
                  name="event"
                  className={styles.input}
                  type="text"
                  value={data[0].title}
                  disabled
                />
              </div>
              <div className={styles.formbody}>
                <label className={styles.lable}>活動地址</label>
                <input
                  id="account"
                  name="account"
                  className={styles.input}
                  type="text"
                  value={data[0].location}
                  disabled
                />
              </div>
              <div className={styles.formbody}>
                <label className={styles.lable}>活動日期</label>
                <input
                  id="event_start"
                  name="event_start"
                  className={styles.input}
                  type="text"
                  value={data[0].event_start}
                  disabled
                />
              </div>
              <div className={styles.formbody}>
                <label className={styles.lable}>電子郵件</label>
                <input
                  id="email"
                  name="email"
                  ref={(input) => (inputRefs.email = input)}
                  className={`${styles.input} ${
                    validMsg.email ? styles.error : ""
                  }`}
                  type="email"
                  value={registration.email}
                  onChange={handleInput}
                  onBlur={() => handleBlur("email", "email")}
                  onKeyDown={(e) => handleEnterKey(e, "people")} // 這裡傳遞下一個欄位的名稱
                />
                <span className={styles.span}>{validMsg.email}</span>
              </div>
              <div className={styles.formbody}>
                <label className={styles.lable}>報名人數</label>
                <input
                  id="people"
                  name="people"
                  ref={(input) => (inputRefs.people = input)}
                  className={`${styles.input} ${
                    validMsg.people ? styles.error : ""
                  }`}
                  type="text"
                  value={registration.people}
                  onChange={handleInput}
                  onBlur={() => handleBlur("people", "people")}
                  onKeyDown={(e) => handleEnterKey(e, "contactperson")} // 這裡傳遞下一個欄位的名稱
                />
                <span className={styles.span}>{validMsg.people}</span>
              </div>
              <div className={styles.formbody}>
                <label className={styles.lable}>緊急聯絡人</label>
                <input
                  id="contactperson"
                  name="contactperson"
                  ref={(input) => (inputRefs.contactperson = input)}
                  className={`${styles.input} ${
                    validMsg.contactperson ? styles.error : ""
                  }`}
                  type="text"
                  value={registration.contactperson}
                  onChange={handleInput}
                  onBlur={() => handleBlur("contactperson", "contactperson")}
                  onKeyDown={(e) => handleEnterKey(e, "phone")} // 這裡傳遞下一個欄位的名稱
                />
                <span className={styles.span}>{validMsg.contactperson}</span>
              </div>
              <div className={styles.formbody}>
                <label className={styles.lable}>緊急連絡電話</label>
                <input
                  id="phone"
                  name="phone"
                  ref={(input) => (inputRefs.phone = input)}
                  className={`${styles.input} ${
                    validMsg.phone ? styles.error : ""
                  }`}
                  type="tel"
                  value={registration.phone}
                  onChange={handleInput}
                  onBlur={() => handleBlur("phone", "phone")}
                />
                <div className={styles.span}>{validMsg.phone}</div>
              </div>
              <div>
                <button
                  className={styles.button}
                  // onClick={() => handleSubmit()}
                >
                  送出
                </button>
              </div>
            </form>
            <div className={styles.imgcontainer}>
              <div className={styles.iconScope}>
                <img
                  src={`/eventsimg/${data[0].img_file}`}
                  alt=""
                  className={styles.img}
                />
              </div>

              <div className={styles.box}>
                <div>
                  <div className={styles.imgtext}>
                    <p>活動地址:</p>
                    <p>{data[0].location}</p>
                  </div>
                  <div className={styles.imgtext}>
                    <p>活動日期 :</p>
                    <p>{data[0].event_start}</p>
                  </div>
                  <div className={styles.imgtext}>
                    <p>活動時間 :</p>
                    <p>{data[0].evets_time}</p>
                  </div>
                </div>
                <div>
                  <div className={styles.icon}>
                    <BsFillCameraFill className={styles.icon} />
                    <p>@camplife_taipei101</p>
                  </div>
                  <div className={styles.icon}>
                    <BsBrowserSafari className={styles.icon} />
                    <p>https://goo.gl/maps/XwaNtWB4q8bMZGS28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.line}>
            <div className={styles.line1}></div>
          </div>
        </Layout>
      </>
    )
  )
}
