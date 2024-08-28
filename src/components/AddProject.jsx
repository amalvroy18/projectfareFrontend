import React, { useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';


function AddProject() { 
  const [show, setShow] = useState(false); 
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImg: ""
  });
  const [preview, setPreview] = useState("");
  const [key ,setKey] = useState(false)
  const {setAddResponse} =useContext(addResponseContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(projectDetails);

  const handleFile = (e) => {
    setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] });
  };

  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg));
    }
  }, [projectDetails.projectImg]);

  const handleClose1 =()=>{
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
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

  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImg } = projectDetails;
  
    if (!title || !language || !github || !website || !overview || !projectImg) {
      toast.info('Please fill the form completely');
    } else {
      const reqBody = new FormData();
  
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      reqBody.append("projImg", projectImg);
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `bearer ${token}`
        }
        const result = await addProjectApi(reqBody, reqHeader);
        /* console.log(result); */
        if(result.status == 200){
          setAddResponse(result.data)
          toast.success('project added successfully')
          handleClose()
        
        }else{
          toast.error("something went wrong")

        }
        
       
      }
    }
  }
  

  return (
    <>
      <button className='btn btn-warning rounded-0' onClick={handleShow}>Add Project</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <label htmlFor='ProjImg'>
                <input type="file" id='ProjImg' style={{ display: 'none' }}key={key} onChange={(e)=>handleFile(e)} />
                <img src={preview ? preview : "https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_1280.png"} alt="Preview" className='w-100' />
              </label>
            </div>

            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input type="text" placeholder='Title' className='form-control w-100' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Language' className='form-control w-100' value={projectDetails.language}  onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Github' className='form-control w-100' value={projectDetails.github}  onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Website' className='form-control w-100' value={projectDetails.website}  onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>
              <div className="mb-3">
                <textarea type="text" rows={5} placeholder='Overview' className='form-control w-100' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
              Add
          </Button>

        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  );
}

export default AddProject;
