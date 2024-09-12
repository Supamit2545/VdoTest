import React, { useEffect, useState,useRef,useContext } from 'react'
import Profile from "../assets/img/myprofile.jpg"
import '../assets/Styles/Live.css'
import io from 'socket.io-client'
import axios from 'axios'
import LiveStream from '../Components/Live/LiveComponnet'
const SOCKET_SERVER_URL = "http://localhost:3001";

const Live = () => {
  const [isLive , setIslive] = useState(false)
  const [Games , setGame] = useState("")
  const inputRef = useRef(null);
  const [usernames , setUsername] = useState("")
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null); // Ref สำหรับ auto scroll down
  const [messages, setMessages] = useState([]);
  

  const fetchUser = async () => {
    try{
      const response = await axios.get('http://localhost:3001/auth/current-user', {
        withCredentials: true, // สำคัญสำหรับการใช้งาน session
      });
      setUsername(response.data.displayName);
      console.log(usernames)
    }catch{
      console.log("Error")
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(usernames == 'Anonymous'){
      alert('Please Login First')
    }else{
      if (socketRef.current) {
        const message = inputRef.current.value;
        console.log(usernames,`:`, message);
        socketRef.current.emit('new_message', { message });
        inputRef.current.value = '';
      }
    }
  };

  const getChat = () =>{
    if(socketRef.current){
      const listChat = document.getElementById('showchat')
      socketRef.current.off('receive_message');
      socketRef.current.on('receive_message', data =>{
        console.log(data)
        const addListChat = document.createElement('li')
        addListChat.textContent = data.username +" : "+data.message;
        listChat.appendChild(addListChat)
        setMessages([data]); // เพิ่มข้อความใหม่ใน state
      })
    }
  }

  getChat()
  
  useEffect(()=>{
    fetchUser()
  },)
  
  useEffect(() => {
    // เลื่อน scroll ให้ลงไปยังด้านล่างสุดของข้อความทุกครั้งที่มีข้อความใหม่
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[messages]); 
  
  useEffect(() => {
    localStorage.setItem('username', usernames);
    // ดึง username จาก localStorage ถ้ามี
    const savedUsername = localStorage.getItem('username') || 'Anonymous';
    setUsername(savedUsername);
    
    // สร้าง Socket connection
    socketRef.current = io(SOCKET_SERVER_URL);
    
    // ส่ง username ไปยัง server เมื่อเชื่อมต่อ
    socketRef.current.on('connect', () => {
      console.log(`Connecting with username: ${savedUsername}`); // ตรวจสอบค่า username ที่ถูกส่ง
      socketRef.current.emit('change_username', { username: savedUsername });
    });
    
    socketRef.current.on('receive_message', (data) => {
      console.log('Received message:', data.message);
    });

    console.log(messages)
    
    // Cleanup connection เมื่อ component ถูก unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }); // ทำงานครั้งเดียวเมื่อ component mount 
  const videoRef = useRef(null);
  // console.log(user)
  
  const startCapture = async () => {
    try {
      // ขออนุญาตและเริ่มจับภาพหน้าจอ
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always" // จับภาพเคอร์เซอร์ด้วย
        },
        audio: false // ถ้าต้องการจับเสียงให้ตั้งเป็น true
      });

      // แสดงสตรีมในวิดีโอท้องถิ่น
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      // จัดการการหยุดการจับภาพ
      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        console.log('Screen sharing stopped');
      });

    } catch (err) {
    }
  };


  return (
    <div className='Live-Container mt-10'>
      <div className='Live-body'>
        <div className="Live-Video">
          {/* <video className='Live' ref={videoRef} autoPlay/> */}
          <LiveStream/>
        </div>
        <div className="Live-Profile">
          {/* <img className='ProfileIMG' src={Profile} alt="" /> */}
          {/* <p className='text-4xl '> Name : <span className='font-bold'>Supamit Phappusa</span></p> */}
          <div className='text-4xl flex'>Status : <span className='text-'>{isLive ? (
            <p className='font-bold text-green-500 font-mono'>Live!</p>
          ):(
            <p className='font-bold text-red-500 font-mono'>Offline!</p>
          )}</span></div>
          <p className='text-4xl font-bold my-2'>Topic : {Games}</p>
          <div className='Live-Chat'>
            <div className='Chats'>
              <ul className='showchat' id='showchat'>
              </ul>
              <div ref={messagesEndRef} /> {/* ใช้ ref ที่นี่เพื่อทำ auto scroll */}
            </div>
            <form className='Input-Chat'>
              <input className='Input' type='text' name="" id="inputsend" placeholder='Type here...' ref={inputRef}></input>
              <button id='sendBtn' className='SubmitButton text-center' onClick={handleSendMessage}>Send</button>
            </form>
            {/* <button className=' bg-red-500 font-mono font-bold border-2 border-black px-2 py-1 text-white mt-5' onClick={startCapture}>Start Screen Capture</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Live