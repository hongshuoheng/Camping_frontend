import * as React from "react"
import { useRef } from "react"
import { useRouter } from "next/router"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import {
  LineShareButton,
  LineIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "next-share"

import { BsFillShareFill } from "react-icons/bs"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none"
}

export default function BasicModal({ open, handleOpen, handleClose }) {
  const router = useRouter()
  const currentUrl = router.asPath
  console.log(currentUrl)

  // 用useRef抓input 類似documentGetElementById
  const inputRef = useRef(null)

  //複製input的value
  const copyToClipboard = () => {
    if (inputRef.current) {
      const links = inputRef.current.value
      navigator.clipboard.writeText(links)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "72px",
              marginBottom: "20px"
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "600" }}>分享</div>{" "}
            <BsFillShareFill size={20} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <LineShareButton url={`http://localhost:3000${currentUrl}`}>
              <LineIcon />
            </LineShareButton>
            <FacebookShareButton url={`http://localhost:3000${currentUrl}`}>
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton
              url={"https://github.com/next-share"}
              title={
                "next-share is a social share buttons for your next React apps."
              }
            >
              <TwitterIcon />
            </TwitterShareButton>
            <EmailShareButton url={"https://github.com/next-share"}>
              <EmailIcon />
            </EmailShareButton>
          </div>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>複製連結 :</p>
            <div class="field">
              <i class="url-icon uil uil-link"></i>
              <input
                style={{
                  width: "100%",
                  height: "28px",
                  padding: "8px",
                  borderRadius: "0px",
                  marginBottom: "20px",
                  boxSizing: "border-box"
                }}
                ref={inputRef}
                type="text"
                readonly
                value={`http://localhost:3000${currentUrl}`}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={copyToClipboard}
                  sx={{
                    backgroundColor: "#333",
                    color: "#e8e8e8",
                    padding: "8px",
                    width: "120px",
                    borderRadius: "0px",
                    boxShadow: "none",
                    "&:hover": {
                      opacity: "0.95",
                      transition: "0.3",
                      backgroundColor: "#333"
                    }
                  }}
                >
                  複製
                </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
