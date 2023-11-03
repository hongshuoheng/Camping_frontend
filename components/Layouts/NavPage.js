import ProductCategory from "@/pages/product/ProductCategory"
import Link from "next/link"
import _debounce from "lodash/debounce" // 请确保已安装 lodash
import { useState } from "react"

export default function NavPage() {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  return (
    <>
      <nav>
        <ul className="nav_page">
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="product">
              <Link href="/product/product">商品</Link>
              {isHovering && (
                <ProductCategory handleMouseOut={handleMouseOut} />
              )}
            </div>
          </li>
          <li>
            <Link href="/campSite/list">營地</Link>
          </li>
          <li>
            <Link href="/discussion/articlelist">討論區</Link>
          </li>
          <li>
            <Link href="/offevent">活動</Link>
          </li>
          <li>
            <Link href="/Q&A">常見問答</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
