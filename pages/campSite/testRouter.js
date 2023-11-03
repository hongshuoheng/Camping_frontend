import React, { useEffect, useState } from "react"

export default function TestRouter() {
  const [rou, setRou] = useState(["資料還沒出現哦~"])
  console.log(rou)
  useEffect(() => {
    fetch("http://localhost:3003/campSite")
      .then((res) => res.json())
      .then((ABC) => setRou(ABC))
      .catch((error) => console.log(error))
  }, [])
  return <div>{rou[0].campgroundName}</div>
}
