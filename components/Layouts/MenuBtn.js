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
                : { marginTop: "0px" }
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
                : {}
            }
            className="menu_icon_line"
          ></span>
        </>
      </div>
    </>
  )
}
