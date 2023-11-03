import { useEffect, useState } from "react"
import { useRouter } from "next/router"
export default function Auth() {
  const router = useRouter()
  const [auth] = useState("")
  useEffect(() => {
    if (!auth) {
      router.push("member/login")
    }
  }, [auth, router])

  return <></>
}
