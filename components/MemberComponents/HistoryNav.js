import styles from "@/components/MemberComponents/bookmarkNav.module.css"
export default function HistoryNav({ children, active, handleActive }) {
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
            購買紀錄
          </div>
          <div
            id="camp"
            className={`${styles.bookmark_nav} ${
              active === "camp" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            露營足跡
          </div>
          <div
            id="article"
            className={`${styles.bookmark_nav} ${
              active === "article" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            文章歷史
          </div>
          <div
            id="event"
            className={`${styles.bookmark_nav} ${
              active === "event" ? styles.bookmark_nav_active : ""
            }`}
            onClick={handleActive}
          >
            活動歷程
          </div>
        </div>
        <div className={styles.bookmark_content}>{children}</div>
      </div>
    </>
  )
}
