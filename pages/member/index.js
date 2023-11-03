import Layout from "@/components/Layouts/Layout"
import styles from "@/pages/member/memberPage.module.css"
import Image from "next/image"
import Link from "next/link"
import cityData from "@/data/CityCountyData"
import { GoFileMedia } from "react-icons/go"
import { useState, useEffect, useRef, useContext } from "react"
import AuthContext from "@/context/AuthContext"
import Swal from "sweetalert2"
import { useRouter } from "next/router"

// const data = {
//   first_name: "石",
//   last_name: "龍蝦",
//   user_name: "大隻龍蝦",
//   user_mail: "tom@gg.vom",
//   user_img: "img1.png",
//   gender: 0,
//   user_phone: "0251956358",
//   city: "臺北市",
//   area: "大安區",
//   postal_code: 100,
//   user_address: "OO路XX巷00號"
// }

export default function Member() {
  const router = useRouter()
  const { getToken, resetMemberImg } = useContext(AuthContext)
  const user_mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  const uploadInput = useRef(null)
  const [editmode, setEditMode] = useState(false)
  const [editImg, setEditImg] = useState("")
  const [uploadImg, setUploadImg] = useState("")
  //原始資料
  const emptyData = {
    first_name: "",
    last_name: "",
    user_name: "",
    user_mail: "",
    user_img: "",
    gender: null,
    user_phone: "",
    city: "",
    area: "",
    postal_code: null,
    user_address: ""
  }
  const [origin, setOrigin] = useState(emptyData)
  //編輯後資料
  const [editData, setEditData] = useState(emptyData)
  //錯誤訊息
  const [validMsg, setValidMsg] = useState({
    name: "",
    user_name: "",
    user_mail: "",
    gender: "",
    user_phone: "",
    city: "",
    area: "",
    postal_code: "",
    user_address: ""
  })

  //按鈕功能
  const handleMode = () => {
    setEditMode(!editmode)
    setEditData(origin)
    setValidMsg({
      name: "",
      user_name: "",
      user_mail: "",
      gender: "",
      user_phone: "",
      city: "",
      area: "",
      postal_code: "",
      user_address: ""
    })
  }
  const handlefileInput = () => {
    uploadInput.current.click()
  }

  const editMember = async () => {
    let token = getToken()
    await fetch(process.env.API_SERVER + "/member/update", {
      method: "PUT",
      body: JSON.stringify(editData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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
            setEditMode(false)
            getMemberData()
          }
        })
      })
  }
  const handleImgUpload = (e) => {
    setEditImg(URL.createObjectURL(e.target.files[0]))
    setUploadImg(e.target.files[0])
  }
  const editMemberImg = async () => {
    let token = getToken()
    const formdata = new FormData()
    formdata.append("file", uploadImg)
    await fetch(process.env.API_SERVER + "/member/updateImg", {
      method: "PUT",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((r) => {
        if (r.code == 200) {
          setEditImg(null)
          setUploadImg(null)
          resetMemberImg()
        }
      })
  }

  const handleEdit = () => {
    // e.preventDefault()
    const newValidMsg = {
      name: "",
      user_name: "",
      user_mail: "",
      gender: "",
      user_phone: "",
      city: "",
      area: "",
      postal_code: "",
      user_address: ""
    }
    let validFlag = true
    //euser_mail驗證
    if (!editData.user_mail.trim()) {
      newValidMsg.user_mail = "*電子郵件為必填項目"
      validFlag = false
    } else if (!user_mailRegex.test(editData.user_mail)) {
      newValidMsg.user_mail = "*電子郵件格式錯誤"
      validFlag = false
    }
    //其他驗證
    if (!editData.first_name.trim() || !editData.last_name.trim()) {
      newValidMsg.name = "*姓名未填寫完全"
    }
    if (!editData.user_name.trim()) {
      newValidMsg.user_name = "*暱稱為空白"
    }
    if (editData.gender != 1 && editData.gender != 0) {
      newValidMsg.gender = "*性別未選擇"
      validFlag = false
    }
    if (!editData.user_phone.trim()) {
      newValidMsg.user_phone = "*連絡電話未填寫"
      validFlag = false
    }
    if (!editData.city) {
      newValidMsg.city = "*縣市未選擇"
      validFlag = false
    }
    if (!editData.area) {
      newValidMsg.area = "*地區未選擇"
      validFlag = false
    }
    if (!editData.user_address.trim()) {
      newValidMsg.user_address = "*地址未填寫"
      validFlag = false
    }

    setValidMsg({ ...newValidMsg })
    if (validFlag) {
      if (uploadImg) {
        editMemberImg()
      }
      editMember()
    }
  }
  //input狀態管理
  const handleInput = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value })
  }
  const handleGender = (e) => {
    setEditData({ ...editData, gender: e.target.value })
  }
  const handleCity = (e) => {
    setEditData({ ...editData, city: e.target.value, area: "" })
  }
  const handleArea = (e) => {
    const zipData = cityData
      .filter((filterV) => {
        return filterV.CityName == editData.city
      })[0]
      .AreaList.filter((filterV2) => {
        return filterV2.AreaName == e.target.value
      })[0].ZipCode

    setEditData({ ...editData, area: e.target.value, postal_code: zipData })
  }
  const getMemberData = async () => {
    let token = getToken()

    if (token) {
      await fetch(process.env.API_SERVER + "/member", {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`
        })
      })
        .then((res) => {
          return res.json()
        })
        .then((j) => {
          setOrigin(j.data)
        })
    }
  }

  useEffect(() => {
    getMemberData()
  }, [])

  return (
    <>
      <Layout
        pageTitle="會員資料"
        contentTitle="會員資料"
        bread={"會員/使用者資料"}
      >
        {/* <Auth></Auth> */}
        <div className={styles.member_content}>
          <div className={styles.member_content_inner}>
            {!editmode ? (
              <>
                <h2 className={styles.member_title}>會員資料</h2>
                <div className={styles.member_header}>
                  <div className={styles.member_img}>
                    <Image
                      src={`http://localhost:3003/member/${
                        origin.user_img ? origin.user_img : "no_img.png"
                      }`}
                      width={150}
                      height={150}
                      alt=""
                    />
                    <div className={styles.member_username}>
                      {origin.user_name}
                    </div>
                  </div>

                  <div className={styles.member_nav_bar}>
                    <Link href="member/bookmark">
                      <div className={styles.member_nav}>收藏夾</div>
                    </Link>
                    <Link href="member/history">
                      <div className={styles.member_nav}>會員歷程</div>
                    </Link>
                  </div>
                </div>

                <div className={styles.member_data}>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>姓名:</div>
                    <div className={styles.md_value}>
                      {origin.first_name + origin.last_name}
                    </div>
                  </div>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>電子郵件:</div>
                    <div className={styles.md_value}>{origin.user_mail}</div>
                  </div>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>連絡電話:</div>
                    <div className={styles.md_value}>{origin.user_phone}</div>
                  </div>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>性別:</div>
                    <div className={styles.md_value}>
                      {parseInt(origin.gender) === 1 ? "男性" : "女性"}
                    </div>
                  </div>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>地址:</div>
                    <div className={styles.md_value}>
                      {origin.city + origin.area + origin.user_address}
                    </div>
                  </div>
                  <div className={styles.btn_box}>
                    <button
                      className={styles.member_btn}
                      onClick={() => {
                        router.push("/member/change-password")
                      }}
                    >
                      修改密碼
                    </button>
                    <button className={styles.member_btn} onClick={handleMode}>
                      修改個人資料
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className={styles.member_title}>編輯會員資料</h2>
                <div className={styles.member_header}>
                  <div className={styles.member_img}>
                    <Image
                      id="user_img"
                      src={
                        editImg
                          ? editImg
                          : `http://localhost:3003/member/${
                              origin.user_img ? origin.user_img : "no_img.png"
                            }`
                      }
                      width={150}
                      height={150}
                      alt=""
                    />
                    <div className={styles.icon_box} onClick={handlefileInput}>
                      <GoFileMedia className={styles.upload_icon}></GoFileMedia>
                      <span className={styles.upload_icon_tooltip}>
                        上傳新圖片
                      </span>
                    </div>
                    <input
                      ref={uploadInput}
                      type="file"
                      hidden
                      onChange={handleImgUpload}
                    />
                    <input
                      id="user_name"
                      className={styles.member_username}
                      value={editData.user_name}
                      onChange={handleInput}
                    />
                    <span style={{ margin: 0 }} className={styles.valid_msg}>
                      {validMsg.user_name}
                    </span>
                  </div>
                </div>
                <div className={styles.member_data}>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>姓名:</div>

                    <input
                      id="first_name"
                      style={{ marginRight: "12px", maxWidth: "200px" }}
                      className={styles.md_value}
                      value={editData.first_name}
                      onChange={handleInput}
                    />
                    <input
                      id="last_name"
                      style={{ marginRight: "12px", maxWidth: "200px" }}
                      className={styles.md_value}
                      value={editData.last_name}
                      onChange={handleInput}
                    />
                  </div>
                  <span className={styles.valid_msg}>{validMsg.name}</span>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>電子郵件:</div>
                    <input
                      id="user_mail"
                      className={styles.md_value}
                      value={editData.user_mail}
                      onChange={handleInput}
                    />
                  </div>
                  <span className={styles.valid_msg}>{validMsg.user_mail}</span>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>連絡電話:</div>
                    <input
                      id="user_phone"
                      className={styles.md_value}
                      value={editData.user_phone}
                      onChange={handleInput}
                    />
                  </div>
                  <span className={styles.valid_msg}>
                    {validMsg.user_phone}
                  </span>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>性別:</div>
                    <div className={styles.md_value}>
                      <div className={styles.member_radio_box}>
                        <input
                          type="radio"
                          className={styles.member_radio}
                          name="gender"
                          value={1}
                          checked={parseInt(editData.gender) === 1}
                          onChange={handleGender}
                        />
                        <label className={styles.member_lebal}> 男性</label>
                        <input
                          type="radio"
                          name="gender"
                          className={styles.member_radio}
                          value={0}
                          checked={parseInt(editData.gender) === 0}
                          onChange={handleGender}
                        />
                        <label className={styles.member_lebal}>女性</label>
                      </div>
                    </div>
                  </div>
                  <span className={styles.valid_msg}>{validMsg.gender}</span>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}>地址:</div>
                    <select
                      className={styles.md_value}
                      value={editData.city}
                      onChange={handleCity}
                    >
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
                    <select
                      className={styles.md_value}
                      value={editData.area}
                      onChange={handleArea}
                    >
                      <option value="" disabled>
                        請選擇地區
                      </option>
                      {editData.city &&
                        cityData
                          .filter((filterV) => {
                            return filterV.CityName == editData.city
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
                      type="hidden"
                      name="postal_code"
                      value={editData.postal_code}
                    />
                  </div>
                  <span className={styles.valid_msg}>
                    {validMsg.city}
                    {validMsg.area}
                  </span>
                  <div className={styles.md_row}>
                    <div className={styles.md_label}></div>
                    <input
                      id="user_address"
                      className={styles.md_value}
                      value={editData.user_address}
                      onChange={handleInput}
                    />
                  </div>
                  <span className={styles.valid_msg}>
                    {validMsg.user_address}
                  </span>
                </div>
                <div>
                  <div className={styles.btn_box}>
                    <button className={styles.member_btn} onClick={handleMode}>
                      取消
                    </button>
                    <button className={styles.member_btn} onClick={handleEdit}>
                      確定編輯
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
