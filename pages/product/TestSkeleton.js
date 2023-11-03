import React, { useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function TestSkeleton() {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      <SkeletonTheme color="#202020" highlightColor="lightgray">
        <div
          style={{
            marginLeft: "200px",
            width: "250px",
            border: "1px solid #333",
            padding: "12px"
          }}
        >
          <h1>{<Skeleton duration={3} /> || "props.title"}</h1>
          <img style={{ width: "250px" }} src={"/images/pimg1.png"}></img>
          <p>Paragraph1 lorem ipsum</p>
          <p>Paragraph2 lorem ipsum</p>
          <p>Paragraph3 lorem ipsum</p>
        </div>
      </SkeletonTheme>
    </>
  )
}
