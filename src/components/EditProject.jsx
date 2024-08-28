import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';


function EditProject({project}) {
  const {setEditResponse} = useState(editResponseContext)
  /* console.log(project); */
  const [key , setKey] = useState(false);
  
  const [projectDetails,setProjectDetails] = useState({
    title: project.title,
    language: project.language,
    github:project.github,
    website: project.website,
    overview: project.overview,
    projectImg: ""
  })
  
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () =>{setShow(false),handleClose1 ()};
  const handleShow = () => {setShow(true);}

  const handleFile = (e) => {
    setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] });
  };

  const handleClose1 =()=>{
    setProjectDetails({
      title: project.title,
    language: project.language,
    github:project.github,
    website: project.website,
    overview: project.overview,
    projectImg: ""
    })
    setPreview("")
    if(key==false){
      setKey(true)
    }
    else{
      setKey(false)
    }
  }

  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg));
    }
  }, [projectDetails.projectImg]);

   /* setPreview("")
    if(key==false){
      setKey(true)
    }
    else{
      setKey(false)
    } */

      const handleEdit = async()=>{
      const {title , language , github , website , overview , projectImg} = projectDetails

        if(!title || !language ||!github || !website || !overview){
          toast.info('please fill the form completely')
        }else{
         const reqBody = new FormData()
         reqBody.append("title", title)
         reqBody.append("language", language)
         reqBody.append("github", github)
         reqBody.append("website", website)
         reqBody.append("overview", overview)
         preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImage)

         const token = sessionStorage.getItem("token")
         if (token) {
          if(preview){
            const reqHeader = {
              "Content-Type": "multipart/form-data",
              "Authorization": `bearer ${token}`
            }
            const result = await editUserProjectApi(project._id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success('Edited successfully')
              handleClose()
              setEditResponse(result.data)
            }
            else{
              toast.error('something went wrong')
              handleClose( )
            }
            
          } else{
            const reqHeader = {
              "Content-Type": "application/json",
              "Authorization": `bearer ${token}`
            }
            const result = await editUserProjectApi(project._id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success('Edited successfully')
              handleClose()
              setEditResponse(result.data)
            
            }/* else{
              toast.error('something went wrong')
              handleClose()
            } */         
          }

        }
      }
    }

      
  
  return (
    <>
    <FontAwesomeIcon icon={faPenToSquare} className='text-info' onClick={handleShow}/>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <label htmlFor='ProjImg'>
                <input type="file" id='ProjImg' style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)} />
                <img src={preview?preview:`${serverUrl}/uploads/${project?.projectImage}`}  alt="no image" className='w-100' /></label>
            </div>

            <div className="col-md-6">
              <div className="mb-3 mt-3">
              <input type="text" placeholder='Title' className='form-control w-100 ' value={projectDetails.title} onChange={(e)=>setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Language' className='form-control w-100' value={projectDetails.language} onChange={(e)=>setProjectDetails({ ...projectDetails, language: e.target.value }) }/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Github' className='form-control w-100' value={projectDetails.github} onChange={(e)=>setProjectDetails({ ...projectDetails, github: e.target.value })}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Website' className='form-control w-100' value={projectDetails.website} onChange={(e)=>setProjectDetails({ ...projectDetails, website: e.target.value })}/>
              </div>
              <div className="mb-3">
              <textarea type="text" rows={5} placeholder='Title' className='form-control  w-100' value={projectDetails.overview} onChange={(e)=>
                setProjectDetails({ ...projectDetails, overview: e.target.value })}/>
              </div>              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default EditProject