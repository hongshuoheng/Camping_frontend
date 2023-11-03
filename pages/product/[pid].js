import styles from "@/styles/productDetail.module.css"
import Layout from "@/components/Layouts/Layout"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  FreeMode
} from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { GoHeart } from "react-icons/go"
import { GoHeartFill } from "react-icons/go"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import LayoutNoTitle from "@/components/Layouts/LayoutNoTitle"
import { useState, useRef, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import {
  addBookmark_product,
  delBookmark_product
} from "@/public/utilities/bookmarkFunc"
import AuthContext from "@/context/AuthContext"
import Swal from "sweetalert2"
import BasicModal from "./BasicModal"
import ProductCard from "./ProductCard"
import SimpleLoadingDot from "./SimpleLoadingDot"

export default function ProductDetail() {
  const { auth, getToken, getCartCount } = useContext(AuthContext)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  //useState Hook
  const [data, setData] = useState([])
  const [relatedData, setRelatedData] = useState([])
  //useRef Hook
  const swiperRef = useRef() // useRef Hook 讓在swiper外的按鈕可以操控swiper

  //Basic Modal Hook
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //獲取商品ID;
  console.log(router.query.pid)

  //useEffect Hook (Fetch)
  useEffect(() => {
    if (router.isReady) {
      const { pid } = router.query
      fetchProductDetail(pid).then(() => {
        setIsLoading(true)
      })

      fetchRelatedProducts()
    }
  }, [router.isReady]) //router.isReady必加，不然抓不到

  /*
  useEffect(() => {
    if (data && data.data && relatedData.length > 0) {
      const cID = relatedData.filter(
        (v) => v.category_name === data.data[0].category_name
      )
      console.log(cID)
    }
  }, [data, relatedData])
*/
  // useEffect Hook (setTimeOut)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [data, relatedData])

  const fetchProductDetail = async (pid) => {
    console.log(`http://localhost:3003/product/${router.query.pid}`)
    const res = await fetch(`http://localhost:3003/product/${pid}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    setData(await res.json())
  }
  console.log(data)

  const fetchRelatedProducts = async () => {
    console.log(`http://localhost:3003/product/`)
    const res = await fetch(`http://localhost:3003/product/`)
    setRelatedData(await res.json())
  }
  console.log(relatedData)

  //加入購物車
  const addProductToCart = async () => {
    let token = getToken()
    await fetch("http://localhost:3003/product/addProductToCart", {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        color_spec: data.data[0].color_spec,
        size_spec: data.data[0].size_spec,
        material_spec: data.data[0].material_spec,
        product_id: data.data[0].product_id
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((r) => {
        console.log(r)
        if (r.success) {
          getCartCount()
          Swal.fire({
            title: "訊息",
            text: r.msg,
            icon: "success"
          }).then(() => {
            router.push("/product/cart")
          })
        } else {
          Swal.fire({
            title: "訊息",
            text: r.msg,
            icon: "error"
          }).then(() => {
            if (r.msg == "請先登入") {
              router.push("/member/login")
            }
          })
        }
      })
  }

  let cID
  //if (data && data.data && data.data.length)
  if (data?.data?.length) {
    cID = relatedData.filter((v) => {
      return v.category_name === data?.data[0].category_name
    })
  }

  console.log(cID)

  return (
    data.length !== 0 && (
      <>
        {isLoading ? (
          <SimpleLoadingDot />
        ) : (
          <LayoutNoTitle
            pageTitle={`商品 | ${data.data[0].product_name}`}
            bread={""}
          >
            <div className={styles.detailContainer}>
              <div className={styles.productDetail}>
                <div className={styles.tagTitle}>
                  {!data.data[0].discount ? (
                    (new Date() - new Date(data.data[0].last_update)) /
                      1000 /
                      60 /
                      60 /
                      24 <=
                    15 ? (
                      <span className={styles.tag}>新上架</span>
                    ) : (
                      ""
                    )
                  ) : (
                    <span className={styles.discountTag}>
                      {100 * data.data[0].discount + "% OFF"}
                    </span>
                  )}

                  {data.data[0].STOCK <= 5 ? (
                    data.data[0].STOCK === 0 || !data.data[0].STOCK ? (
                      <span className={styles.tag}>已售罄</span>
                    ) : (
                      <span className={styles.tag}>即將售罊</span>
                    )
                  ) : (
                    ""
                  )}

                  <div className={styles.title}>
                    {data.data[0].product_name}
                  </div>
                </div>

                <div className={styles.price}>
                  {!data.data[0].discount ? (
                    <span>
                      NTD
                      {(1 - data.data[0].discount) * data.data[0].unit_price}
                    </span>
                  ) : (
                    <>
                      <span className={styles.strikeThrough}>
                        NTD {data.data[0].unit_price}
                      </span>
                      <span>
                        NTD
                        {parseInt(
                          (1 - data.data[0].discount) * data.data[0].unit_price
                        )}
                      </span>
                    </>
                  )}

                  {/* 收藏功能開始 */}
                  {!data.data[0].favorite ? (
                    <GoHeart
                      className={styles.heartIcon}
                      size={24}
                      onClick={() => {
                        if (auth.token) {
                          addBookmark_product(
                            data.data[0].product_id,
                            auth.token
                          )
                          let newData = { ...data }
                          newData.data[0].favorite = true
                          setData(newData)
                        } else {
                          router.push("/member/login")
                        }
                      }}
                    />
                  ) : (
                    <GoHeartFill
                      className={styles.heartIconFill}
                      size={24}
                      onClick={() => {
                        delBookmark_product(data.data[0].product_id, auth.token)
                        let newData = { ...data }
                        newData.data[0].favorite = false
                        setData(newData)
                      }}
                    />
                  )}
                </div>

                <table className={styles.optionContainer}>
                  <tbody>
                    <tr className={styles.option}>
                      <td className={styles.optionName}>尺寸：</td>
                      <td className={styles.optionMenuContainer}>
                        <select
                          className={styles.optionMenu}
                          value={data.data[0].size_spec}
                          name={""}
                          id={""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              data: [
                                { ...data.data[0], size_spec: e.target.value }
                              ]
                            })
                          }}
                        >
                          {data.sizeSpec.map((v, i) => {
                            return (
                              <option key={"size" + i} value={v.size_spec}>
                                {v.spec_name}
                              </option>
                            )
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr className={styles.option}>
                      <td className={styles.optionName}>顏色：</td>
                      <td className={styles.optionMenuContainer}>
                        <select
                          className={styles.optionMenu}
                          name=""
                          id=""
                          value={data.data[0].color_spec}
                          onChange={(e) => {
                            setData({
                              ...data,
                              data: [
                                { ...data.data[0], color_spec: e.target.value }
                              ]
                            })
                          }}
                        >
                          {data.colorSpec.map((v, i) => {
                            return (
                              <option key={"color" + i} value={v.color_spec}>
                                {v.spec_name}
                              </option>
                            )
                          })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles.quantity}>
                  庫存數量: {data.data[0].quantity}
                </div>
                <div className={styles.btnContainer}>
                  <div className={styles.buyBtn} onClick={addProductToCart}>
                    <p className={styles.buyBtnText}>加入購物車</p>
                  </div>
                </div>

                <div className={styles.specMainContainer}>
                  <div className={styles.spec}>
                    <p className={styles.specText}>規格 SPEC</p>
                  </div>
                  <div className={styles.specDetail}>
                    <div className={styles.specContainer}>
                      <div className={styles.specTitle}>顏色: </div>
                      <div className={styles.specItem}>
                        {data.colorSpec.map((v) => v.spec_name).join("/")}
                      </div>
                    </div>
                    <div className={styles.specContainer}>
                      <div className={styles.specTitle}>尺寸: </div>
                      <div className={styles.specItem}>
                        {data.sizeSpec.map((v) => v.spec_name).join("/")}
                      </div>
                    </div>
                    <div className={styles.specContainer}>
                      <div className={styles.specTitle}>材質: </div>
                      <div className={styles.specItem}>
                        {" "}
                        {data.materialSpec.map((v) => v.spec_name).join("/")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.descContainer}>
                  <h4 className={styles.descTitle}>產品敘述</h4>
                  <p className={styles.desc}>
                    {data.data[0].product_description}
                  </p>
                </div>
                <div className={styles.addToCart} onClick={handleOpen}>
                  <p className={styles.addToCartText}>分享此商品</p>
                </div>
              </div>
              <div className={styles.imageContainer}>
                {data.data[0].list_img
                  .split(",")
                  .slice(1)
                  .map((v, i) => {
                    return (
                      <img
                        key={i}
                        className={styles.pImage}
                        src={`/images/pimg/${v}`}
                        alt="product-image"
                      ></img>
                    )
                  })}
              </div>
            </div>
            <div className={styles.relatedTitleContainer}>
              <div className={styles.relatedTitle}>相關商品</div>
              <div className={styles.swiperControls}>
                <MdKeyboardArrowLeft
                  className={styles.prevButton}
                  onClick={() => {
                    swiperRef.current.slidePrev()
                  }}
                  size={40}
                />
                <MdKeyboardArrowRight
                  className={styles.nextButton}
                  onClick={() => {
                    swiperRef.current.slideNext()
                  }}
                  size={40}
                />
              </div>
            </div>
            <div className={styles.relatedProduct}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }} // 用useRef抓取swiper按鈕控制Swiper
                style={{
                  "--swiper-pagination-color": "#ffffff"
                }}
                freeMode={true}
                spaceBetween={30}
                navigation={false}
                pagination={false}
                loop={false}
                slidesPerView={4}
                modules={
                  (Autoplay, Pagination, Navigation, EffectFade, FreeMode)
                }
                className="mySwiper"
              >
                {cID.map((v, i) => {
                  return (
                    <SwiperSlide key={"related" + i}>
                      <ProductCard
                        pName={v.product_name}
                        pPrice={v.unit_price}
                        inventory={v.STOCK}
                        img={v.list_img.split(",")[0]}
                        onShelves={v.last_update}
                        pid={v.product_id}
                        pDiscount={v.discount}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <BasicModal
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          </LayoutNoTitle>
        )}
      </>
    )
  )
}
