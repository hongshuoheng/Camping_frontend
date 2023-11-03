import React from "react"
import styles from "@/styles/StepProgress.module.css"

export default function StepProgress() {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.progressbar}>
          <li className={styles.active}>購物車</li>
          <li>流程二</li>
          <li>流程三</li>
        </ul>
      </div>
    </>
  )
}
