import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { allprojectApi } from '../services/allApi';

function Project() {
  const [isToken, setIsToken] = useState('');
  const [allproject, setAllProject] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const getAllProject = async (searchKey) => {
    const result = await allprojectApi(searchKey || '');
    setAllProject(result.data);
  };

  useEffect(() => {
    getAllProject(searchKey);
  }, [searchKey]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsToken(sessionStorage.getItem('token'));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid bg-success">
        <h2 className="text-center mt-0">All Projects</h2>
        {isToken ? (
          <div>
            <div className="row my-4">
              <div className="col-md-4 my-5"></div>
              <div className="col-md-4 my-5 d-flex">
                <input
                  type="text"
                  placeholder="Technologies"
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="form-control"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  rotation={90}
                  style={{ marginTop: '12px', marginLeft: '-30px', color: 'lightgray' }}
                />
              </div>
              <div className="col-md-4 my-5"></div>
            </div>

            <div className="row my-5">
              {allproject?.length > 0 ? (
                allproject?.map((item) => (
                  <div className="col-md-4 p-4" key={item.id}>
                    <ProjectCard project={item} />
                  </div>
                ))
              ) : (
                <p className="text-danger ms-5">No Project to Show</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 w-100 row">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex my-5 justify-content-center align-items-center flex-column">
              <img
                className="rounded"
                src="https://i.pinimg.com/originals/4c/33/ef/4c33ef1f0c28efb56b49fb948d86ec49.gif"
                alt=""
                width={'70%'}
                height={'100%'}
              />
              <h4 className="mt-5 text-center">
                Please <Link to={'/Login'} className="text-danger">Login</Link> to Explore more Projects
              </h4>
            </div>
            <div className="col-md-4"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Project;
