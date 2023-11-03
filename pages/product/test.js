import React from "react"
import ProductCard from "./ProductCard"

export default function Test() {
  const data = [
    {
      id: "001",
      pName: "KRAKEN TENT SHELTER",
      pPrice: "14000",
      inventory: 0,
      img: "img1.png",
      onShelves: "2023-09-23"
    },
    {
      id: "002",
      pName: "ZIZ CAMPING TENT",
      pPrice: "6900",
      inventory: 10,
      img: "img2.png",
      onShelves: "2023-09-30"
    },
    {
      id: "003",
      pName: "GRANDE CAMPING GEAR",
      pPrice: "3200",
      inventory: 4,
      img: "img3.png",
      onShelves: "2023-09-30"
    },
    {
      id: "004",
      pName: "KRAKEN TENT SHELTER",
      pPrice: "14000",
      inventory: 10,
      img: "img4.png",
      onShelves: "2023-09-15"
    }
  ]
  return (
    <>
      {data.map((v, i) => {
        return (
          <ProductCard
            key={v.id}
            pName={v.pName}
            pPrice={v.pPrice}
            inventory={v.inventory}
            img={v.img}
            onShelves={v.onShelves}
          />
        )
      })}
    </>
  )
}
