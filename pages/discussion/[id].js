import Layout from "@/components/Layouts/Layout"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import ForwardIcon from '@mui/icons-material/Forward';
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Link from 'next/link';
import parse from 'html-react-parser';
import { getReply } from "@/public/utilities/bookmarkFunc";
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




export default function testPage() {

  const [rp, setrp] = useState([])
  const router = useRouter()
  const [data, setData] = useState([])
  const [getslides, setslides] = useState([])
  const fetcharticleDetail = async (id) => {
    const res = await fetch(`http://localhost:3003/discussion/${id}`)
    setData(await res.json())
  }
  // const SlideShow = () => { }
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      imgSrc: '{https://hips.hearstapps.com/hmg-prod/images/camping-ideas-1561136670.jpg}',
      title: '童子軍紮營趣',
    },
    {
      imgSrc: 'https://cdn.prod.v2.camping.info/media/campsites/scout-camp-poznan/cMurLXB38Y2i.jpg',
      title: '童子軍紮營趣',
    },
    {
      imgSrc: 'https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg',
      title: '童子軍紮營趣',
    },
  ];


  const getTOP5 = async () => {
    await fetch("http://localhost:3003/discussion/TOP5")
      .then((res) => res.json())
      .then((json) => {
        setslides(json);
      });



  };



  const handleClick = () => {

    setCurrentSlide((currentSlide + 1) < getslides.length - 2 ? currentSlide + 1 : 0);

  };

  // function createMarkup() {
  //   return { __html: `${forum[0].art_content}` }
  // }
  useEffect(() => {
    getTOP5();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query
      console.log(router.query.id)
      fetcharticleDetail(id)
      getReply(router.query.id, setrp)

    }
  }, [router.isReady, router]) //router.isReady必加，不然抓不到

  console.log(rp)
  return (
    <Layout pageTitle="" contentTitle={data.title}>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",alignItems:"center" }}>
        <div className="flex2" style={{ display: 'flex', justifyContent: 'center',width:"100%" }}>
          <img className="imgtitle" style={{ display: 'flex', justifyContent: 'center' }} src={data.img} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>{data.title}</div>
          <div style={{ marginBottom: '10px' }}>發布於{data.createTime}</div>
          {/* <p dangerouslySetInnerHTML={createMarkup()}></p> */}

          <div style={{ textAlign: 'center', maxWidth: '800px', lineHeight: '1.6' }}>
            {parse("<p>" + data.content + "</p>")}
          </div>
        </div>
      </div>
      <div className="flex20">
        <Link href={`/discussion/reply?id=${router.query.id}`}>
          <div className="flex21">
            <div className="flex22">
              <div className="flex23">
                <div><ModeCommentIcon /></div>
              </div>
            </div>
            <div className="flex26">


              <div className="replyicon">
                回覆
              </div>

            </div>
          </div>
        </Link>
        <div className="flex33">
          <div className="flex34">
            <div className="flex35">
              <div><ShareIcon /></div>
            </div>
          </div>
          <div className="flex38">
            <div className="shareicon">分享</div>
          </div>
        </div>
      </div>


      <div className="flex39">
        {rp.map((v, i) => (
          <div className="flex40">
            <div className="flex41">
              <div className="flex42">
                <div className="flex43">
                  <img
                    className="avatar"
                    src={`http://localhost:3003/member/${v.user_img ? v.user_img : "no_img.png"
                      }`}
                    alt={v.user_img}
                  />
                </div>
              </div>
            </div>
            <div className="flex44">

              <>
                <div className="flex45">
                  <div className="username">{v.user_name}</div>
                  <div className="releasedate1">{v.createTime}</div>
                </div>
                <div className="rearticle">{v.replycontent}</div></>
            </div>
          </div>))}
      </div>
      <div className="flex67">
        <div className="flex68">
          <div className="flex69">
            <div className="flex70">精選文章</div>
          </div>
        </div>
        <div className="flex58">
          {getslides.map((slide, index) => (
            <Link href={`/discussion/${slide.id}`} key={index}>
              <div className="flex59" style={{ display: (index === currentSlide || index === currentSlide + 1 || index === currentSlide + 2) ? 'block' : 'none' }}>
                <img className="morearticle" src={slide.img} />
                <div className="flex60">
                  <div className="flex61">
                    <div className="moretitle">{slide.title}</div>
                  </div>
                  <div className="flex62">
                    <div className="flex63">
                      <div className="flex64">More</div>
                      <div className="flex65">
                        <TrendingFlatIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex71" onClick={handleClick}>
            <ForwardIcon style={{ color: 'black' }} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

