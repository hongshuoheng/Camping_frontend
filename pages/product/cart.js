import styles from "@/styles/cart.module.css"
import Image from "next/image"
import { MdAddCircleOutline } from "react-icons/md"
import { MdRemoveCircleOutline } from "react-icons/md"
import Layout from "@/components/Layouts/Layout"
import { useEffect, useState, useContext, useRef } from "react"
import AuthContext from "@/context/AuthContext"
import { useShip711StoreOpener } from "@/hooks/use-ship-711-store"
import Link from "next/link"
import Swal from "sweetalert2"
import { useRouter } from "next/router"

export default function Cart() {
  const { auth, getToken, getCartCount } = useContext(AuthContext)
  const router = useRouter()
  //useState Hook
  const [data, setData] = useState([])
  const payment = useRef("")
  const [total, setTotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)

  //useShipp711StoreOpener hook的第一個參數是彈出視窗選取門市後的後端網址(接門市資料)
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    "http://localhost:3003/product/cart/711",
    {
      title: "7-11運送店家選擇視窗", //跳出視窗標題
      h: 680, //跳出視窗高度
      w: 1209, //跳出視窗寬度
      autoCloseMins: 5, //自動關閉
      enableLocalStorage: true, //是否didMount時要讀取localStorage中資料
      keyLocalStorage: "store711" // localStorage中的key
    }
  )

  //async/await接資料
  const func = async () => {
    const res = await fetch("http://localhost:3003/product/cart", {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    setData(await res.json())
  }

  //useEffect Hook
  // useEffect(() => {
  //   // 检查元素是否存在
  //   const formElement = document.getElementById("_form_aiochk")
  //   if (formElement) {
  //     formElement.submit() // 在组件加载后触发提交
  //   }
  // }, [])

  useEffect(() => {
    func()
  }, [])
  const updateCart = async (inventory_id, value) => {
    await fetch(
      `http://localhost:3003/product/updateProductCart?value=${value}&inventory_id=${inventory_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    )
      .then((res) => {
        return res.json()
      })
      .then((r) => {})
  }
  const updateCount = (inventory_id, value) => {
    updateCart(inventory_id, value)
    func()
    getCartCount()
    // const updateData = data.map((v, i) => {
    //   if (v.inventory_id === inventory_id) {
    //     return { ...v, pcs_purchased: value }
    //   } else {
    //     return { ...v }
    //   }
    // })
    // setData(updateData)
  }
  const ecpay = async () => {
    try {
      const response = await fetch(process.env.API_SERVER + "/product/ecpay", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((res_data) => {
          console.log(res_data)
          document.querySelector("#A1").innerHTML = res_data
          document.querySelector("form").submit()
        })

      if (response.ok) {
        // 处理成功的响应
      } else {
        // 处理请求失败的情况
      }
    } catch (error) {
      // 捕获其他可能的错误
      console.error(error)
    }
  }

  const purchase = async () => {
    await fetch(process.env.API_SERVER + "/product/purchase", {
      method: "POST",
      body: JSON.stringify({ payment_id: payment.current.value }),
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((r) => {
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: r.code == 200 ? "success" : "error"
        }).then(function () {
          if (r.code == 200) {
            getCartCount()
            router.push("/member/history")
          }
        })
      })
  }
  const handlePurchase = (event) => {
    // purchase()
    event.preventDefault()
    ecpay()
  }

  console.log(data)
  const calculateTotal = () => {
    const subtotal = data.reduce(
      (acc, v) => acc + v.unit_price * v.pcs_purchased,
      0
    )
    const shippingFee = 60

    const total = subtotal + shippingFee
    setTotal(total)

    return { subtotal, shippingFee, total }
  }

  const calc = () => {
    let total = 0
    data.forEach((v) => {
      total += v.pcs_purchased * v.unit_price
    })

    return total
  }
  console.log(total)
  return (
    <>
      <Layout pageTitle="商品購物車" contentTitle="購物車 | 商品">
        <div className={styles.nav}>
          <div className={styles.main}>
            <div className={styles.frame}>
              <div className={styles.productCartText}>商品購物車</div>
            </div>
            <div className={styles.divWrapper}>
              <Link href="/campSite/cart">
                <div className={styles.div}>營地預定</div>
              </Link>
            </div>
          </div>
          <div className={styles.frame2} />
        </div>
        <div className={styles.outerBox}>
          {/* <div className={styles.cartTitle}>
            <div className={styles.pImgTitle}>商品圖片</div>
            <div className={styles.pNameTitle}>商品名稱</div>
            <div className={styles.pCountTitle}>數量</div>
            <div className={styles.pSubtotalTitle}>小計</div>
          </div> */}
          {/* Item Starts Here */}
          {data.length ? (
            data.map((v, i) => {
              return (
                <div key={"cart" + i} className={styles.productItem}>
                  <div className={styles.pImg}>
                    <div className={styles.imgContainer}>
                      <img
                        className={styles.imgItem}
                        src={`/images/pimg/${v.list_img.split(",")[0]}`}
                      ></img>
                    </div>
                  </div>
                  <div className={styles.pName}>{v.product_name}</div>

                  <div className={styles.pSpec}>
                    規格: {v.SIZE}, {v.COLOR}, {v.MATERIAL}
                  </div>
                  <div className={styles.pCount}>
                    <MdRemoveCircleOutline
                      className={styles.iconRemove}
                      onClick={() => {
                        if (v.pcs_purchased === 0) return
                        updateCount(v.inventory_id, v.pcs_purchased - 1)
                      }}
                    />
                    <p className={styles.pCountNumber}> {v.pcs_purchased} </p>
                    <MdAddCircleOutline
                      className={styles.iconAdd}
                      onClick={() => {
                        calculateTotal()
                        updateCount(v.inventory_id, v.pcs_purchased + 1)
                      }}
                    />
                  </div>
                  <div className={styles.pSubtotal}>
                    NTD {+v.pcs_purchased * +v.unit_price}
                  </div>
                </div>
              )
            })
          ) : (
            <h3
              style={{ width: "100%", textAlign: "center", paddingTop: "10px" }}
            >
              目前購物車內沒有商品
            </h3>
          )}

          {/* Item Ends Here */}
          <div className={styles.checkOutSection}>
            {/* delivery starts here */}
            <div className={styles.deliveryContainer}>
              <div className={styles.optionContainer}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px"
                  }}
                >
                  物流方式:
                </span>
                <span>
                  <select
                    className={styles.optionMenu}
                    onChange={(e) => {
                      setDeliveryFee(parseInt(e.target.value))
                    }}
                  >
                    <option value={0}>請選擇</option>
                    <option value={60}>超商取貨</option>
                    <option value={100}>宅配到府</option>
                  </select>
                </span>
              </div>
              {/*  */}
              {deliveryFee == "60" ? (
                <>
                  <div
                    className={styles.selectShipStore}
                    onClick={() => {
                      openWindow()
                    }}
                  >
                    選擇門市
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ fontSize: "14px" }}>門市名稱:</div>
                    <input type="text" value={store711.storename} disabled />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ fontSize: "14px" }}>門市地址:</div>
                    <input type="text" value={store711.storeaddress} disabled />
                  </div>
                </>
              ) : (
                ""
              )}

              {/*  */}
              {/* ----------------- */}
              <div className={styles.optionContainer}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px"
                  }}
                >
                  付款方式:
                </span>

                <span>
                  <select ref={payment} className={styles.optionMenu}>
                    <option value={""}>請選擇</option>
                    <option value={6}>線上支付</option>
                    <option value={1}>LinePay付款</option>
                  </select>
                </span>
              </div>
            </div>
            {/* grandtotal starts here */}
            <div className={styles.grandTotalContainer}>
              <div className={styles.grandTotal}>
                <span>總計</span>
                <span style={{ width: "200px", textAlign: "right" }}>
                  NTD {calc()}
                </span>
              </div>
              <div className={styles.deliveryFee}>
                <span style={{ justifyContent: "space-between" }}>運費</span>
                <span style={{ width: "100px", textAlign: "right" }}>
                  NTD {deliveryFee}
                </span>
              </div>
              <div className={styles.grandTotal}>
                <span
                  style={{
                    fontSize: "20px"
                  }}
                >
                  合計
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    width: "200px",
                    textAlign: "right"
                  }}
                >
                  NTD {calc() + parseInt(deliveryFee)}
                </span>
              </div>
              <div className={styles.checkOutButton} onClick={handlePurchase}>
                結帳
              </div>
            </div>
          </div>
        </div>
        <div id="A1" style={{ display: "none" }}></div>
      </Layout>
    </>
  )
}
