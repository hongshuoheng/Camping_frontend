import { useState } from "react"

export default function TestComp({ ob }) {
  const [s, setD] = useState(
    ob.map((v) => {
      return { name: v.name, count: 0 }
    })
  )
  console.log(s)
  return (
    <>
      {s.map((v, i) => (
        <>
          <p>{v.name}</p>

          <button
            onClick={() => {
              // setD( newS[i].count -= 1) //???
              let newS = [...s]
              newS[i].count -= 1
              setD(newS)
            }}
          >
            -
          </button>
          <span> {v.count} </span>
          <button
            onClick={() => {
              let newS = [...s]
              newS[i].count += 1
              setD(newS)
            }}
          >
            +
          </button>
        </>
      ))}
    </>
  )
}
