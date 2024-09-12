import React, { useEffect, useState , createContext } from 'react'
import './Navbar.css'
import { Link, redirect } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [active , setActive] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(); // ตั้งค่าตามสถานะผู้ใช้
  const [loginUrl, setLoginUrl] = useState('');
  const UserContext  = createContext(null)
  const [user, setUser] = useState(null);
  const activeTab = (index) =>{
    setActive(index)
    localStorage.setItem('Active' , index)
  }

  function StoreTab(){
    const savetab = localStorage.getItem('Active')
    const setTab = savetab ? parseInt(savetab,10):0;

    setActive(setTab)
  }

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/auth/logout', {
        withCredentials: true, // ใช้กับ cookies และ session
      });
      window.location.reload()
      onLogout(); // ฟังก์ชันเพื่ออัพเดตสถานะการล็อกอินใน front-end
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchUser = async () => {
    const response = await axios.get('http://localhost:3001/auth/current-user', {
      withCredentials: true, // สำคัญสำหรับการใช้งาน session
    });
    setUser(response.data);
  };

  useEffect(()=>{
    StoreTab()
    axios.get('http://localhost:3001/login')
    .then((res)=>{setLoginUrl(res.data.loginUrl)})
    .catch((err)=>{console.log(err)})
    fetchUser()
    if(!user){
      setIsLoggedIn(false)
    }else{
      setIsLoggedIn(true)
    }
  },[])


  return (
    <div className='navbar'>
      <div className='navbar-left my-auto'>
        <p className='text-2xl font-bold font-monospace'>Supamit's Platform</p>
      </div>
      <div className='navbar-center my-auto'>
        <ul className='nav-ul'>
          <Link to={'/'}><li className={`nav-li ${active === 1 ? "active":""}`}><button onClick={(e)=>{activeTab(1)}}>Home</button></li></Link>
          <Link to={'/Live'}><li className={`nav-li ${active === 2 ? "active":""}`}><button onClick={(e)=>{activeTab(2)}}>Live</button></li></Link>
          <Link to={'/Videos'}><li className={`nav-li ${active === 3 ? "active":""}`}><button onClick={(e)=>{activeTab(3)}}>Videos</button></li></Link>
          {/* <Link to={'/Contacts'}><li className={`nav-li ${active === 4 ? "active":""}`}><button onClick={(e)=>{activeTab(4)}}>Contacts</button></li></Link> */}
        </ul>
        <div className='nav-underline'></div>
      </div>
      <div className="navbar-right my-auto">
      {user ? (
        <div className='flex gap-5'>
          <div>
            <img className='rounded-full' src={user.photos[0].value} alt="Profile" width={50}/>
          </div>
          <div>
            <h2>Welcome, <span className='font-bold font-mono text-green-400'>{user.displayName}</span></h2>
            <p>Email: <span className='font-bold font-mono text-green-400'>{user.emails[0].value}</span></p>
          </div>
          <div>
            <button className='bg-red-500 px-9 py-1.5 font-bold text-white rounded-xl border-2 border-black hover:bg-red-700' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <a href={"http://localhost:3001"+loginUrl}><button className='bg-blue-500 px-9 py-1.5 font-bold text-white rounded-xl border-2 border-black hover:bg-blue-700'>Login with google</button></a>
      )}
      </div>
    </div>
  )
}

export default Navbar