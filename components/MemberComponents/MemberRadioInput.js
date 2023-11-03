export default function MemberTextInput({
  id,
  label,
  name,
  value,
  checked,
  handleChange
}) {
  return (
    <div className="member_radio_box">
      <input
        id={id}
        name={name}
        className="member_radio_input"
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <label className="member_radio_label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
