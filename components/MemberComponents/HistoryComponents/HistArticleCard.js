import styles from "@/pages/member/bookmark/bookmark.module.css"
import Image from "next/image"
import Link from "next/link"
import { useState, useContext } from "react"
import { FiMessageSquare } from "react-icons/fi"
import { AiFillEye } from "react-icons/ai"
import { getReply, delPostReply } from "@/public/utilities/bookmarkFunc"
import dayjs from "dayjs"
import AuthContext from "@/context/AuthContext"
import parse from "html-react-parser"
export default function HistArticleCard({
  msg_id,
  img,
  title,
  content,
  user_img,
  createTime,
  user_name,
  replies,
  browse,
  handleDelete
}) {
  const [repliesCount, setRepliesCount] = useState(replies)
  const [reply, setReply] = useState([])
  const { auth } = useContext(AuthContext)
  const handleReply = () => {
    getReply(msg_id, setReply)
  }

  const handleDelPostReply = (e) => {
    delPostReply(e.target.getAttribute("reply_id"), auth.token)
    setReply(reply.filter((v) => v.id != e.target.getAttribute("reply_id")))
    setRepliesCount(replies - 1)
  }
  return (
    <>
      <div key={msg_id} className={styles.article_card}>
        <div className={styles.article_card_inner}>
          <Link href={`/discussion/${msg_id}`}>
            <div>
              <img className={styles.article_img} src={img} alt="" />
            </div>
          </Link>
          <div className={styles.article_content}>
            <div>
              <Link href={`/discussion/${msg_id}`}>
                <div className={styles.article_title}>{title}</div>
              </Link>
              <div className={styles.article_text}>
                {parse("<p>" + content + "</p>")}
              </div>
            </div>
            <div>
              <div className={styles.article_author}>
                <img
                  className={styles.avatar}
                  src={`http://localhost:3003/member/${
                    user_img ? user_img : "no_img.png"
                  }`}
                  alt=""
                />
                <div>
                  <div className={styles.article_author_name}>{user_name}</div>
                  <div>{dayjs(createTime).format("YYYY/MM/DD HH:mm:ss")}</div>
                </div>
              </div>
              <div className={styles.article_icon}>
                <span>
                  <AiFillEye /> {browse}
                </span>
                <span>
                  <FiMessageSquare /> {repliesCount}
                </span>
                {replies ? (
                  <span className={styles.openReply} onClick={handleReply}>
                    查看回覆
                  </span>
                ) : (
                  <></>
                )}
                <span
                  article_id={msg_id}
                  className={styles.openReply}
                  onClick={handleDelete}
                >
                  刪除文章
                </span>
              </div>
            </div>
          </div>
        </div>
        {reply.length > 0 &&
          reply.map((v) => {
            return (
              <div key={v.id} className={styles.article_reply_card}>
                <div>
                  <Image
                    width={75}
                    height={75}
                    src={`http://localhost:3003/member/${
                      v.user_img ? v.user_img : "no_img.png"
                    }`}
                    alt={v.user_img}
                  />
                </div>
                <div className={styles.article_reply_content}>
                  <div className={styles.article_reply_time}>
                    {dayjs(v.createTime).format("YYYY/MM/DD 時間--hh:mm:ss")}
                  </div>
                  <div>
                    <div className={styles.article_reply_username}>
                      {v.user_name}
                    </div>
                  </div>
                  <div>{v.replycontent}</div>
                </div>
                <div className={styles.article_reply_del}>
                  <div
                    reply_id={v.id}
                    className={styles.openReply}
                    onClick={handleDelPostReply}
                  >
                    刪除回覆
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
