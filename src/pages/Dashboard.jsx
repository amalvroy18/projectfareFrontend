import React, { useEffect, useState } from 'react'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'
import Header from '../components/Header'

function Dashboard() {
  const[username,setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  })
  return (
    <>
     <Header/>
     <div className="container-fluid bg-success">
      <h3 className='mt-0 ms-3'>Welcome <span className='text-warning'>{username}</span></h3>
      <div className="row mt-5 bg-success">
        <div className="col-md-8 px-5">
        <MyProject/>
        </div>
        <div className="col-md-4 px-5">
        <Profile/>
        </div>
      </div>
     </div>
     </>
  )
}

export default Dashboard