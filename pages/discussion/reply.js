
import React, { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Layout from "@/components/Layouts/Layout";



export default function ReplyPage() {

  const { getToken } = useContext(AuthContext)
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorState.getCurrentContent().getPlainText();
    console.log("內容:", content);
    const data = {
      content: content,
      article_id: router.query.id
    };
    const formdata = new FormData()
    formdata.append("content", data.content)
    formdata.append("article_id", router.query.id)
    console.log("reply content")
    console.log(data.content)
    console.log("id")
    console.log(router.query.id)
    console.log(formdata)
    console.log("data")
    console.log(data)
    fetch("http://localhost:3003/discussion/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        router.push(`/discussion/${router.query.id}`)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());




  const WysiwygEditor = dynamic(



    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  );



  return (
    <Layout pageTitle={"回覆文章"} contentTitle={"回覆文章"} bread={""}>
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'white', width: '1090px', height: '480px', overflow: 'auto', resize: 'both' }}>
            <label></label>
            <WysiwygEditor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              style={{ zIndex: 1 }}
            />
          </div>
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
              onClick={(e) => {
                handleSubmit(e)

              }}
            >
              回覆文章
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
