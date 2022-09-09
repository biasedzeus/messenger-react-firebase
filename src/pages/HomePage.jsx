import React,{useState} from 'react'
import ChatFeed from '../components/ChatFeed'
import SideBar from '../components/SideBar';
import SideBarDrawer from '../components/SideBarDrawer';

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuToggle = () =>{
    setDrawerOpen(!drawerOpen);
  }

  
  return (
    <div className='homepage'>
      <div className="container">
        <SideBar/>
        <ChatFeed handleMenuToggle={handleMenuToggle}/>
        <SideBarDrawer 
          drawerOpen={drawerOpen} 
          handleMenuToggle={handleMenuToggle}/>
      </div>
    </div>
  )
}

export default HomePage;