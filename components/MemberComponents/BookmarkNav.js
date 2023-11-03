import styles from "@/components/MemberComponents/bookmarkNav.module.css"
export default function BookmarkNav({ children, active, handleActive }) {
  return (
    <>
      <div className={styles.bookmark_content}>
        <div className={styles.bookmark_nav_bar}>
          <div
            id="product"
            className={`${styles.bookmark_nav} ${
              active === "product" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            商品收藏
          </div>
          <div
            id="camp"
            className={`${styles.bookmark_nav} ${
              active === "camp" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            喜愛營地
          </div>
          <div
            id="article"
            className={`${styles.bookmark_nav} ${
              active === "article" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            文章收藏
          </div>
          <div
            id="event"
            className={`${styles.bookmark_nav} ${
              active === "event" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            感興趣的活動
          </div>
        </div>
        <div className={styles.bookmark_content}>{children}</div>
      </div>
    </>
  )
}
