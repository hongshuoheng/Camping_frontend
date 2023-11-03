// ScrollTopButton.js

import React, { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { PiCaretUpLight } from "react-icons/pi"
import style from "./ScrollTopButton.module.css"
const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 3.5) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`scroll-top-wrapper ${isVisible ? "show" : ""}`}
      style={{
        right: "50px",
        bottom: "28px",
        position: "fixed",
        zIndex: "999",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      <Link
        to="top"
        smooth={true}
        duration={400}
        spy={true}
        offset={-50}
        isDynamic={true}
      >
        <div className={style.scrolltopbutton} onClick={handleTopClick}>
          <PiCaretUpLight
            style={{
              cursor: "pointer"
            }}
          />
        </div>
      </Link>
    </div>
  )
}

export default ScrollTopButton
