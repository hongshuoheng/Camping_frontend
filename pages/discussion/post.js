import React, { useState, useContext, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic'; // 引入 dynamic
// import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
})
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



import Layout from "@/components/Layouts/Layout";
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';

// const WysiwygEditor = dynamic(
//   () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//   { ssr: false } // 這裡設置 ssr: false，確保只在客戶端使用
// );

export default function CreatePost() {
  const { getToken } = useContext(AuthContext)
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([])
  const [title, setTitle] = useState("");
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const categories = ["討論", "教學", "心情", "分享"];

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const editor = useRef(null);
  const [content, setContent] = useState('');

  // const config = useMemo(
  //   {
  //     readonly: false,
  //     placeholder: placeholder || 'Start typings...'
  //   },
  //   [placeholder]
  // );


  const handleSubmit = (e) => {
    e.preventDefault();
    // const content = editorState.getCurrentContent().getPlainText();
    // 在這裡處理發布文章的邏輯，包括標題、內容、類別和圖片
    console.log("標題:", title);
    console.log("內容:", content);
    console.log("選擇的類別:", category);
    console.log("圖片:", image);
    const data = {
      msgcategory: category,
      title: title,
      content: content,
      img: image,
      createTime: new Date().toISOString(),
    };
    const formdata = new FormData()
    formdata.append("img", data.img)
    formdata.append("title", data.title)
    formdata.append("content", data.content)
    formdata.append("msgcategory", data.msgcategory)
    console.log(content)
    fetch("http://localhost:3003/discussion/addMsg", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        router.push(`/discussion/${data.id}`)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3003/discussion/msgcategory")
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data)

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [])

  return (
    <Layout pageTitle={"發文頁面"} contentTitle={"發表新文章"} >
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category">選擇TAG：</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">選擇一個TAG</option>
              {categoryList.map((item, index) => (
                <option key={index} value={item.uid}>
                  {item.categoryname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title">標題：</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div >
            <JoditEditor
              ref={editor}
              value={content}
              // config={config}
              onChange={newContent => { setContent(newContent) }}>
            </JoditEditor>

          </div>
          <div>
            <label htmlFor="image">插入圖片：</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {image && (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="插入的圖片"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          )}
          <div>
            <button
              className='postandre_btn'
              style={{
                width: '100%',
                maxWidth: '200px',
                marginTop: '12px',
                marginBottom: '20px',
                padding: '12px 0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'var(--color--less-w)',
                fontSize: 'var(--text-md)',
                marginLeft: '10px',
              }}
              onClick={() => {

              }}
            >
              發布文章
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
