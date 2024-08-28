import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileUpdateApi } from '../services/allApi';


function Profile() { 
  const [open, setOpen] = useState(false);
  /* const [key ,setKey] = useState(false) */
  const [userDetails , setUserDetails] = useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkedin:"",
    profile:""

  })
  const[existingImage , setExistingImage] = useState("")
  const[preview , setPreview] = useState("")
  const [UpdateStatus,setUpdateStatus] =useState({})
  

  const handleFile = (e) => {
    setUserDetails({...userDetails, profile: e.target.files[0] });
  };

  useEffect(()=>{
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  },[userDetails.profile])
  console.log(preview);

  const handleUpdate = async()=>{
    const {username ,email , password , github ,linkedin , profile} = userDetails
    if(!github || !linkedin ){
      toast.info('Please fill the form completely')
    }
    else{

      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        if(preview){
          const reqHeader = {
             "Content-Type": "multipart/form-data",
              "Authorization": `bearer ${token}`
          }
          const result = await profileUpdateApi(reqBody, reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('Profile Updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
          }
          else{
            toast.error('something went wrong')
          }
          
        }
        else{
          const reqHeader = {
            "Content-Type": "multipart/form-data",
             "Authorization": `bearer ${token}`
         }
         const result = await profileUpdateApi(reqBody, reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('Profile Updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
          }
          else{
            toast.error('something went wrong')
          }
        }
      }

    }
      
  }


  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:user.profile})
    }
  },[UpdateStatus]);
  

  return (
    <>
    <div className='p-4 shadow bg-white rounded-3 mb-4' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <div className='d-flex mt-3'>
        <h3 className='text-dark fw-bolder'>Profile</h3>
        <div className='ms-auto'>
          <button className='btn btn-outline-secondary me-2' onClick={()=> setOpen(!open)}>{open?<FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</button>
         
        </div>
      </div>

     <Collapse in={open}>
       <div>
          <div className='d-flex justify-content-center align-items-center'>
            <label htmlFor='ProfileImg'>
            <input type="file" id='ProfileImg'onChange={(e)=>handleFile(e)} style={{display:'none'}} />
              {
                existingImage==""?
                <img  src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&s"} alt="no image" width={'180px'} height={'180px'} style={{borderRadius:'50%'}}/>:
                <img  src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt="no image" width={'180px'} height={'180px'} style={{borderRadius:'50%'}}/>
              }
              </label>
              
         </div>
         <div className="mb-3 mt-4">
          <input type="text" placeholder='Github' value={userDetails.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} className='form-control' />
         </div>
         <div className="mb-3">
          <input type="text" placeholder='LinkedIn' value={userDetails.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} className='form-control' />
         </div>
         <div className="mb-3">
          <button className='btn btn-success w-100' onClick={handleUpdate }>Update</button>
         </div>
        </div>
     </Collapse>

     </div>
     <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default Profile