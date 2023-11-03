import styles from "@/components/MemberComponents/memberUtilityNav.module.css"
import Link from "next/link"
import { GrRevert } from "react-icons/gr"
export default function MemberUtilityNav({ active = "bookmark" }) {
  return (
    <div className={styles.u_bar_content}>
      <Link href="/member">
        <div className={styles.u_return_btn}>
          <GrRevert />
          <div>回會員中心</div>
        </div>
      </Link>
      <div className={styles.u_nav_bar}>
        <div
          className={`${styles.u_nav} ${
            active === "bookmark" ? styles.u_nav_active : ""
          }`}
        >
          {active === "bookmark" ? (
            "收藏夾"
          ) : (
            <Link href="/member/bookmark">收藏夾</Link>
          )}
        </div>
        <div
          className={`${styles.u_nav} ${
            active === "history" ? styles.u_nav_active : ""
          }`}
        >
          {active === "history" ? (
            "會員歷程"
          ) : (
            <Link href="/member/history">會員歷程</Link>
          )}
        </div>
      </div>
    </div>
  )
}
