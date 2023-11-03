import React from "react";
import styles from "@/styles/SimpleLoadingDot.module.css";

export default function SimpleLoadingDot() {
  return (
    <div className={styles.screen}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
