export default function MenuBtn({ handleClick, menuShow, unique = {} }) {
  return (
    <>
      <div
        className="menu_btn"
        onClick={handleClick}
        aria-hidden="true"
        style={unique}
      >
        <>
          <span
            style={
              menuShow
                ? {
                    transform: "rotateZ(45deg)",
                    position: "absolute",
                    backgroundColor: "white"
                  }
                : { marginTop: "0px", backgroundColor: "#e8e8e8" }
            }
            className="menu_icon_line"
          ></span>
          <span
            style={
              menuShow
                ? {
                    transform: "rotateZ(-45deg)",
                    position: "absolute",
                    backgroundColor: "white"
                  }
                : { backgroundColor: "#e8e8e8" }
            }
            className="menu_icon_line"
          ></span>
        </>
      </div>
    </>
  )
}
