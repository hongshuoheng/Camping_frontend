import { useState } from "react"

export default function TEST() {
  const [data, setData] = useState(1)
  const handleChange = (e) => {
    console.log(132)
    setData(e.target.value)
  }

  return (
    <div>
      <input
        type="radio"
        name="a"
        checked={parseInt(data) === 1}
        value={1}
        onChange={handleChange}
      ></input>
      <input
        type="radio"
        name="a"
        checked={parseInt(data) === 2}
        value={2}
        onChange={handleChange}
      ></input>
      <input
        type="radio"
        name="a"
        checked={parseInt(data) === 3}
        value={3}
        onChange={handleChange}
      ></input>
    </div>
  )
}
