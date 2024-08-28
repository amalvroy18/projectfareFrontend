import React, { useContext, useEffect, useState } from 'react';
import AddProject from '../components/AddProject';
import EditProject from '../components/EditProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { removeUserProjectApi, userProjectApi } from '../services/allApi';
import { Link } from 'react-router-dom';
import { addResponseContext, editResponseContext } from '../context/Contextshare';

function MyProject() {
    const { addResponse } = useContext(addResponseContext);
    const { editResponse } = useContext(editResponseContext);
    const [userProject, setUserProject] = useState([]);

    const getuserProject = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await userProjectApi(reqHeader);
            if (result.status === 200) {
                setUserProject(result.data);
            } else {
                console.error('Failed to fetch projects:', result.data || result.message);
                alert('Failed to fetch projects. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert('An unexpected error occurred while fetching projects.');
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        
        try {
            const result = await removeUserProjectApi(id);
            console.log('Delete Result:', result);

            if (result.status === 200) {
                setUserProject(prevProjects => prevProjects.filter(project => project._id !== id));
                alert('Project deleted successfully');
            } else {
                console.error('Failed to delete project:', result.data || result.message);
                alert(`Failed to delete project: ${result.data?.message || result.message}`);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('An unexpected error occurred while deleting the project.');
        }
    }

    useEffect(() => {
        getuserProject();
    }, [addResponse, editResponse]);

    return (
        <div className='shadow p-3 bg-dark'>
            <div className='d-flex mt-4'>
                <h4 className='text-white me-auto'>My Projects</h4>
                <AddProject />
            </div>

            {userProject.length > 0 ? (
                userProject.map((item) => (
                    <div key={item._id} className='p-3 mt-4 rounded-2' style={{ backgroundColor: 'lightblue' }}>
                        <h5>{item.title}</h5>
                        <div className='d-flex align-items-center'>
                            <div className='ms-auto d-flex align-items-center'>
                                <EditProject project={item} />
                                {item.website && (
                                    <a href={item.website} target='_blank' rel='noopener noreferrer'>
                                        <FontAwesomeIcon icon={faGlobe} className='ms-3 text-warning' />
                                    </a>
                                )}
                                {item.github && (
                                    <a href={item.github} target='_blank' rel='noopener noreferrer'>
                                        <FontAwesomeIcon icon={faGithub} className='ms-3 text-success' />
                                    </a>
                                )}
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className='ms-3 text-danger cursor-pointer'
                                    onClick={() => handleDelete(item._id)}
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-danger'>No Projects Yet included</p>
            )}
        </div>
    );
}

export default MyProject;
