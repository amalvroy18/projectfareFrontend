import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFount() {
  return (
    <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center' }}>
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 d-flex justify-content-center align-items-center flex-column">
            <img src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Page.gif" alt="404 Error" width={'800px'} height={'400px'} className='mt-4 rounded-5' />
        <h2 className='mt-3'>Looks like Your lost</h2>
        <h4 className='mt-2'>Page Your looking is unavailable</h4>
        <Link to={'/'}><button className='btn btn-success mt-3 rounded-0'>Back Home</button></Link>
            </div>
            <div className="col-md-1"></div>
        

        </div>
    </div>
  )
}

export default PageNotFount