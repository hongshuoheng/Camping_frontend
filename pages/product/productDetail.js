import React from "react"
import styles from "@/styles/productDetail.module.css"
import Image from "next/image"
import { GoHeart } from "react-icons/go"
import LayoutNoTitle from "@/components/Layouts/LayoutNoTitle"

export default function ProductDetail() {
  return (
    <>
      <LayoutNoTitle
        pageTitle={"全部商品"}
        contentTitle={"全部商品"}
        bread={""}
      >
        <div className={styles.detailContainer}>
          <div className={styles.productDetail}>
            <div className={styles.tagTitle}>
              <div className={styles.tag}>NEW</div>
              <div className={styles.title}>KRAKEN TENT SHELTER</div>
            </div>
            <div className={styles.price}>
              NTD 16800 <GoHeart size={24} />
            </div>
            <div className={styles.bookmarkProduct}></div>

            <table className={styles.optionContainer}>
              <tbody>
                <tr className={styles.option}>
                  <td className={styles.optionName}>尺寸：</td>
                  <td className={styles.optionMenuContainer}>
                    <select
                      className={styles.optionMenu}
                      name={""}
                      id={""}
                      // onChange={(e) => {
                      //   setSelect(e.target.value)
                      // }}
                    >
                      <option value={"S"}>S</option>
                      <option value={"M"}>M</option>
                      <option value={"L"}>L</option>
                      <option value={"XL"}>XL</option>
                    </select>
                  </td>
                </tr>
                <tr className={styles.option}>
                  <td className={styles.optionName}>顏色：</td>
                  <td className={styles.optionMenuContainer}>
                    <select className={styles.optionMenu} name="" id="">
                      <option value="黑">黑</option>
                      <option value="白">白</option>
                      <option value="灰">灰</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.btnContainer}>
              <div className={styles.buyBtn}>
                <p className={styles.buyBtnText}>立即購買</p>
              </div>
              <div className={styles.addToCart}>
                <p className={styles.addToCartText}>加入購物車</p>
              </div>
            </div>

            <div className={styles.specMainContainer}>
              <div className={styles.spec}>
                <p className={styles.specText}>規格 SPEC</p>
              </div>
              <div className={styles.specDetail}>
                <div className={styles.specContainer}>
                  <div className={styles.specTitle}>顏色: </div>
                  <div className={styles.specItem}>黑色</div>
                </div>
                <div className={styles.specContainer}>
                  <div className={styles.specTitle}>重量: </div>
                  <div className={styles.specItem}>13.4 KG</div>
                </div>
                <div className={styles.specContainer}>
                  <div className={styles.specTitle}>材質: </div>
                  <div className={styles.specItem}>尼龍</div>
                </div>
              </div>
            </div>
            <div className={styles.descContainer}>
              <h4 className={styles.descTitle}>產品敘述</h4>
              <p className={styles.desc}>
                KRAKEN特大型蒙古帳篷，其特點是內部空間大，這是圓頂形蒙古帳的最大特點，並且具有非常堅固的測地線結構。它不僅可以作為餐廳，還可以使用內帳篷（單獨出售）作為臥室。
              </p>
            </div>
            <div className={styles.buyBtn}>
              <p className={styles.buyBtnText}>分享此商品</p>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              className="pImage"
              src={"/images/pimg1.png"}
              alt="product-image"
            ></img>
            <img
              className="pImage"
              src={"/images/pimg2.png"}
              alt="product-image"
            ></img>
            <img
              className="pImage"
              src={"/images/pimg3.png"}
              alt="product-image"
            ></img>
            <img
              className="pImage"
              src={"/images/pimg4.png"}
              alt="product-image"
            ></img>
          </div>
        </div>
      </LayoutNoTitle>
    </>
  )
}
