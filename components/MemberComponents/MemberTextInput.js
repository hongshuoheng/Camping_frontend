export default function MemberTextInput({
  id,
  label,
  name,
  validMsg,
  value,
  handleChang
}) {
  return (
    <>
      <div className="member_input_box">
        <label className="member_label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          name={name}
          className="member_input"
          type="text"
          value={value}
          onChange={handleChang}
        />
      </div>
      <div className="member_input_box">
        <span className="valid_msg">{validMsg}</span>
      </div>
    </>
  )
}
