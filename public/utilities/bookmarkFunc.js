import Swal from "sweetalert2"

const test=()=>{
  Swal.fire({
    title: "訊息",
    text: "r.msg",
    icon: "error"})
}

async function addBookmark_product(product_id,token){
  await fetch(process.env.API_SERVER + "/member/bookmark_product", {
    method: "POST",
    body: JSON.stringify({ product_id: product_id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        Swal.fire({
          backdrop: false,
          title: "訊息",
          text: r.msg,
          icon: "success"
        })
        // console.log(r)
      } else {
        Swal.fire({
          backdrop: false,
          title: "訊息",
          text: r.msg,
          icon: "error"
        })
      }
    })
    .catch((ex) => {
      Swal.fire({
        backdrop: false,
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })
}
async function delBookmark_product(product_id,token){
  await fetch(process.env.API_SERVER + "/member/bookmark_product", {
    method: "DELETE",
    body: JSON.stringify({ product_id: product_id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        Swal.fire({
          backdrop: false,
          title: "訊息",
          text: r.msg,
          icon: "success"
        })
        // console.log(r)
      } else {
        Swal.fire({
          backdrop: false,
          title: "訊息",
          text: r.msg,
          icon: "error"
        })
      }
    })
    .catch((ex) => {
      Swal.fire({
        backdrop: false,
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })
}
async function addBookmark_camp(campGroundID,token){ 
  await fetch(process.env.API_SERVER + "/member/bookmark_camp", {
    method: "POST",
    body: JSON.stringify({ campGroundID: campGroundID }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        console.log(r)
      } else {
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: "error"
        })
      }
    })
    .catch((ex) => {
      Swal.fire({
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })

}
async function delBookmark_camp(campGroundID,token){
  await fetch(process.env.API_SERVER + "/member/bookmark_camp", {
    method: "DELETE",
    body: JSON.stringify({ campGroundID: campGroundID }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        console.log(r)
      } else {
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: "error"
        })
      }
    })
    .catch((ex) => {
      Swal.fire({
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })
}
async function toggle_Bookmark_article(msg_id,token){
  await fetch(process.env.API_SERVER + `/member/toggle_bookmark_article?msg_id=${msg_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        console.log(r)
      } else {
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: "error"
        })
      }
    })
    .catch((ex) => {
      Swal.fire({
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })
}
async function addBookmark_event(events_id,token){ 
  
 const res = await fetch(process.env.API_SERVER + "/member/bookmark_event", {
  method: "POST",
  body: JSON.stringify({ events_id: events_id, }),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
  })
  .then((res) => {
   
    return res.json()
  })
  .then((r) => {
    if ((r.code == 200)) {
      return r
    } else {
      Swal.fire({
        title: "訊息",
        text: r.msg,
        icon: "error"
      })
    }
  })
  .catch((ex) => {
    Swal.fire({
      title: "訊息",
      text: ex,
      icon: "error"
    })
  })

return res
}
async function delBookmark_event(events_id,token){
  //加res為了要接awit結束的參數
const res = await fetch(process.env.API_SERVER + "/member/bookmark_event", {
    method: "DELETE",
    body: JSON.stringify({ events_id: events_id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        //return  r結果回傳
         return r
        
      } else {
        Swal.fire({
          title: "訊息",
          text: r.msg,
          icon: "error"
        })
      }
    })
    .catch((ex) => {
      Swal.fire({
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })
    //最後回傳函數結果
    return res
}

async function getReply(msg_id,setState){
  await fetch(process.env.API_SERVER + `/member/getPostReply?msg_id=${msg_id}`)
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      if ((r.code == 200)) {
        setState(r.data) 
      } 
    })
    .catch((ex) => {
      Swal.fire({
        title: "訊息",
        text: ex,
        icon: "error"
      })
    })
  
}

async function delPostArticle(msg_id,token){
  await fetch(process.env.API_SERVER + `/member/delPostArticle?msg_id=${msg_id}`,{method:"DELETE",headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }})
  .then((res) => {
    return res.json()
  })
  .then((r) => {
    if ((r.code !== 200)) {
      Swal.fire({
        title: "訊息",
        text: r.msg,
        icon: "error"
      })
    }
  })
  .catch((ex) => {
    Swal.fire({
      title: "訊息",
      text: ex,
      icon: "error"
    })
  })
}

async function delPostReply(msg_id,token){
  await fetch(process.env.API_SERVER + `/member/delPostReply?reply_id=${msg_id}`,{method:"DELETE",headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }})
  .then((res) => {
    return res.json()
  })
  .then((r) => {
    if ((r.code !== 200)){
      Swal.fire({
        title: "訊息",
        text: r.msg,
        icon: "error"
      })
    }
  })
  .catch((ex) => {
    Swal.fire({
      title: "訊息",
      text: ex,
      icon: "error"
    })
  })
}
export {addBookmark_product,delBookmark_product,addBookmark_camp,delBookmark_camp,addBookmark_event,delBookmark_event,toggle_Bookmark_article,getReply,delPostArticle,delPostReply}