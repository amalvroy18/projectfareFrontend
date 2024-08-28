import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'

function Home() {
  const [token ,setToken] = useState("")
   const [homeProject,setHomeProject] = useState([])


  const gethomeProject = async()=>{
    const result =await homeProjectApi()
    setHomeProject(result.data); 

  }

   console.log(homeProject);
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    gethomeProject()
  },[])
  return (
    <>
    <div className='container-fluid bg-success p-4 ' style={{width:'100%',height:'100vh'}}>
      <Row className='p-5'>
        <Col md={6} className='d-flex justify-content-center align-items-center ' >
        <div>
        <h1 className='text 'style={{fontSize:'60px'}}>Project Fare</h1>
        <h4>One stop destination for all software development projects</h4>
       {!token?<Link to={'/login'}> <button className='btn btn-outline-warning mt-4 mb-4 mx-2 fs-5'> Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link> :
        <Link to={'/dashboard'}><button className='btn btn-outline-warning mt-4 mx-2 fs-5'> Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button></Link>}
        </div>
        </Col>
        

        <Col md={6} className='d-flex justify-content-center align-items-center flex-column' >
        <img src={"https://img.freepik.com/premium-photo/working-alone-home-office-with-computer-people-work-from-home-illustration-2d-art_608303-3194.jpg"} alt="no image" width={'80%'}/>
        </Col>
      </Row>

      
    </div>

    <div className="container-fluid bg-success p-4">
      <h1 className='my-5 text-center'>Explore Projects</h1>
      <div className="row mb-5">
        {homeProject?.length>0?
         homeProject?.map((item)=>(
          <div className="col-md-4 d-flex justify-content-center p-3">
          <ProjectCard project = {item} />
          </div>
        )) : null}
        
       
        
        <div>
        <Link to={'/project'} className='text-danger'><h5 className='text-center my-5'>See more project</h5></Link>
        </div>
      </div>
    </div>

    </>
  )
}

export default Home