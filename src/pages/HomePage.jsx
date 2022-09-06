import React from 'react'
import ChatFeed from '../components/ChatFeed'
import SideBar from '../components/SideBar'

const HomePage = () => {
  return (
    <div className='homepage'>
      <div className="container">
        <SideBar/>
        <ChatFeed/>
      </div>
    </div>
  )
}

export default HomePage;