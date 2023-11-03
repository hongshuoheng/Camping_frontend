import { useState, useRef } from "react"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
export default function MemberTextInput({
  id,
  label,
  name,
  validMsg,
  value,
  handleChang
}) {
  const psw = useRef()
  const [show, setShow] = useState(false)
  const handleShow = () => {
    setShow(!show)
  }
  return (
    <>
      <div className="member_input_box">
        <label className="member_label" htmlFor={id}>
          {label}
        </label>
        <input
          ref={psw}
          id={id}
          name={name}
          value={value}
          className="member_input member_input_psw "
          type={show ? "text" : "password"}
          onChange={handleChang}
        />
        <div className="psw_icon" onClick={handleShow}>
          {show ? (
            <AiOutlineEye style={{ width: "30px", height: "30px" }} />
          ) : (
            <AiOutlineEyeInvisible style={{ width: "30px", height: "30px" }} />
          )}
        </div>
      </div>
      <div className="member_input_box">
        <span className="valid_msg">{validMsg}</span>
      </div>
    </>
  )
}
