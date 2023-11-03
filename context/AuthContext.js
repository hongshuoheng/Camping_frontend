import { useRouter } from "next/router"
import { useState, useEffect, createContext } from "react"
const AuthContext = createContext({})

export default AuthContext

export function AuthContextProvide({ children }) {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [auth, setAuth] = useState({
    user_id: "",
    user_name: "",
    token: ""
  })

  const logout = () => {
    localStorage.removeItem("member_auth")
    setAuth({
      user_img: "",
      user_id: "",
      user_name: "",
      token: ""
    })
    setCartCount(0)
  }

  const getToken = () => {
    if (localStorage.getItem("member_auth")) {
      try {
        return JSON.parse(localStorage.getItem("member_auth")).token
      } catch (ex) {
        console.log("無法取得本地用戶暫存資料")
      }
    } else {
      // router.push("/member/login")
    }
  }
  const getCartCount = async () => {
    await fetch(process.env.API_SERVER + "/member/getCartCount", {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${getToken()}`
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((j) => {
        if (j.code == 200) {
          setCartCount(j.data)
        }
      })
  }
  const resetMemberImg = async () => {
    await fetch(process.env.API_SERVER + "/member/getMemberImg", {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${getToken()}`
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((j) => {
        if (j.code == 200) {
          console.log(j)
          let newAuth = { ...auth, user_img: j.data.user_img }
          localStorage.setItem("member_auth", JSON.stringify(newAuth))
          setAuth(newAuth)
        }
      })
  }
  useEffect(() => {
    if (localStorage.getItem("member_auth")) {
      try {
        setAuth(JSON.parse(localStorage.getItem("member_auth")))
      } catch (ex) {
        console.log("無法取得本地用戶暫存資料")
      }
    }
  }, [])
  useEffect(() => {
    if (localStorage.getItem("member_auth")) {
      try {
        getCartCount()
      } catch (ex) {
        console.log(ex)
      }
    }
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logout,
        getToken,
        getCartCount,
        cartCount,
        resetMemberImg
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
