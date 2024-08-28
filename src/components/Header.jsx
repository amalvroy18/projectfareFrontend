import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isLoginAuthContext } from '../context/Contextshare';

function Header() {
  const navigate = useNavigate()
  const [token,setToken] = useState("")
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const logout =()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsLoginStatus(false)
    navigate("/")
  
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
    <div>
      <Navbar className="bg-success">
          <Navbar.Brand className='text-white fs-3'>
            <Link to={'/'} className='text-white' style={{textDecoration:'none'}} ><h3 className=' ms-5'><FontAwesomeIcon icon={faStackOverflow} className='fa-2x' />Project Fare</h3></Link>
            </Navbar.Brand>

            { token && <button onClick={logout} className='btn btn-warning rounded ms-auto me-5'><FontAwesomeIcon icon={faPowerOff} className='me-2' />Log Out</button>}
        
      </Navbar>
    </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex"></div>
        <div className="col-md-4"></div>
      </div>
    </div>
    </>
  )
}

export default Header