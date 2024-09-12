import React, { useEffect , useState } from 'react'
import '../assets/Styles/Videos.css'
import AOS from 'aos'
import "aos/dist/aos.css";

// Image Import
import ApexLogo from '../assets/img/ApexLogo.jpg'
import Dota2Logo from '../assets/img/Dota2Logo.jpg'
import DungeonborneLogo from '../assets/img/DungeonborneLogo.jpg'
import RainbowSixLogo from '../assets/img/RainbowSixLogo.jpg'
import { BrowserRouter, Routes } from 'react-router-dom'

const Videos = () => {
  const Games = [
    {
      img:ApexLogo,
      name:'Apex',
      category:'Battle Royale'
    },
    {
      img:RainbowSixLogo,
      name:'Rainbow Six Siege',
      category:'Battle Royale'
    },
    {
      img:Dota2Logo,
      name:'Dota 2',
      category:'Moba'
    },
    {
      img:DungeonborneLogo,
      name:'Dungeonborne',
      category:'Extractions'
    },
  ]
  useEffect(()=>{
    AOS.init();
    AOS.refresh();

    const apexTag = RecentVideos.filter(tag => tag.tag ==  "Apex")
    const Dota2Tag = RecentVideos.filter(tag => tag.tag ==  "Dota2")
    const RainbowSixTag = RecentVideos.filter(tag => tag.tag ==  "RainbowSix")

    setApexTag(apexTag)
    setDota2(Dota2Tag)
    setRainbow(RainbowSixTag)
  },[])
  const RecentVideos = [
    {
      title:"[HON] - Highlight by Acttivate",
      src: "https://www.youtube.com/embed/e-nhbLz_RcQ",
      tag:"Hon"
    },
    {
      title:"Hon - swiftblade[Gameplay]",
      src: "https://www.youtube.com/embed/Ks2B5187NDk",
      tag:"Hon"
    },
    {
      src: "https://www.youtube.com/embed/jc-wxPnRJiE" ,
      title: "R6 -Test Bitrate 10000 Nvidia on Stream",
      tag:"RainbowSix"
    },
    {
      src: "https://www.youtube.com/embed/_-ITVpoCirM" ,
      title: "Test Bitrate on Stream",
      tag:"Apex"
    },
    {
      src: "https://www.youtube.com/embed/oqFtaK-TQJ4" ,
      title:"Dota 2 - เปิดไมค์อะยางงง",
      tag:"Dota2"
    },
  ]
  const [tag , setTag] = useState('')
  const [Apextag , setApexTag] = useState([])
  const [Dota2tag , setDota2]= useState([])
  const [Rainbowtag ,setRainbow] = useState([])
  const [DBtag ,setDBTAG] = useState([])
  console.log(Apextag)
  return (
    <div className='Videos-Container'>
      <div className="Videos-Header">
        <div className="Videos-Cats">
        </div>
      </div>
      <div className="Videos-Body">
        <div className=''>
          <h1 className='text-4xl font-bold font-mono ml-10 mt-10'>Games</h1>
          <div className='flex gap-10 mt-5 ml-10'>
            {Games.map((Game , index)=>(
              <div key={index} className='Games-Cards' data-aos={"zoom-in"}>
                <img className='Games-IMG' src={Game.img} alt="" width={150}/>
                {/* <p className='Games-Name'>Name : <span>{Game.name}</span></p>
                <p className='Games-Catscard'>Cate : <span>{Game.category}</span></p> */}
              </div>
            ))}
          </div>
          <div className='Recent-Videos' data-aos="fade-up">
            <p className='text-4xl font-bold font-mono'>Recents Videos</p>
            <div className='mt-4'>
              {RecentVideos.length > 0 ? (
                <div className='flex gap-10'>
                  {RecentVideos.map((vdo,index)=>(
                    <div className='' key={index}>
                      <iframe className='rounded-2xl' width="350" height="250" src={vdo.src} title={vdo.title} allow="fullscreen" data-aos="fade-left">   
                      </iframe>
                    </div>
                  ))}
                </div>
              ):(
                <div className='text-4xl text-red-500 font-bold ml-5'>No Recents Videos</div>
              )}
            </div>
          </div>
          <div className="Apex-Container mt-5 ml-10" data-aos="fade-up">
          <p className='text-4xl font-bold font-mono'>Apex Legend Videos</p>
            <div className='mt-4'>
              {Apextag.length > 0 ? (
                <div>
                  {Apextag.map((apex,index)=>(
                    <div key={index}>
                      <iframe className='rounded-2xl' width="350" height="250" src={apex.src} title={apex.title} allow="fullscreen" data-aos="fade-left">   
                      </iframe>
                    </div>
                  ))}
                </div>
              ):(
                <div className='text-4xl text-red-500 font-bold ml-5'>Not Found Videos</div>
              )}
            </div>
          </div>
          <div className="Dota2-Container mt-5 ml-10" data-aos="fade-up">
            <p className='text-4xl font-bold font-mono'>Dota2 Videos</p>
            <div className='mt-4'>
              {Dota2tag.length > 0 ? (
                <div>
                  {Dota2tag.map((dota,index)=>(
                    <div key={index}>
                      <iframe className='rounded-2xl' width="350" height="250" src={dota.src} title={dota.title} allow="fullscreen" data-aos="fade-left">   
                      </iframe>
                    </div>
                  ))}
                </div>
              ):(
                <div className='text-4xl text-red-500 font-bold ml-5'>Not Found Videos</div>
              )}
            </div>
          </div>
          <div className="RainbowSix-Container mt-5 ml-10" data-aos="fade-up">
            <p className='text-4xl font-bold font-mono'>RainbowSix Videos</p>
            <div className='mt-4'>
              {Rainbowtag.length > 0 ? (
                <div>
                  {Rainbowtag.map((R6,index)=>(
                    <div key={index}>
                      <iframe className='rounded-2xl' width="350" height="250" src={R6.src} title={R6.title} allow="fullscreen" data-aos="fade-left">   
                      </iframe>
                    </div>
                  ))}
                </div>
              ):(
                <div className='text-4xl text-red-500 font-bold ml-5'>Not Found Videos</div>
              )}
            </div>
          </div>
          <div className="Dungeonborne-Container mt-5 ml-10" data-aos="fade-up">
            <p className='text-4xl font-bold font-mono'>Dungeonborne Videos</p>
            <div className='mt-4'>
              {DBtag.length > 0 ? (
                <div>
                  
                </div>
              ):(
                <div className='text-4xl text-red-500 font-bold ml-5'>Not Found Videos</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="Videos-Footer"></div>
    </div>
  )
}

export default Videos