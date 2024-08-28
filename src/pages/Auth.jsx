import React, { useContext, useState } from 'react';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from '../services/allApi';
import { isLoginAuthContext } from '../context/Contextshare';

function Auth({ register }) {
  const navigate = useNavigate();
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.warning('Please fill the fields completely');
    } else {
      const result = await registerApi(userDetails);
      if (result.status === 200) {
        toast.success('Registration successful');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
        navigate('/login');
      } else {
        toast.error('Something went wrong');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info('Please fill the form completely');
    } else {
      const result = await loginApi({ email, password });
      if (result.status == 200) {
        toast.success('Login successful');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser));
        sessionStorage.setItem('token', result.data.token);
        setIsLoginStatus(true)
        navigate('/');
      } else {
        toast.error('Something went wrong')
        setUserDetails({
          username: '',
          email: '',
          password: '',
        })
      }
    }
  };

  return (
    <>
      <div
        className='bg-success'
        style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className='container w-100'>
          <h4>
            <Link to={'/'} className='text-white' style={{ textDecoration: 'none' }}>
              <FontAwesomeIcon icon={faArrowLeft} className='me-2' />
              Back Home
            </Link>
          </h4>
          <div className='bg-success p-3'>
            <Row className='bg-primary w-100'>
              <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3966/3966194.png'
                  alt=''
                  height={'80%'}
                  width={'80%'}
                />
              </Col>
              <Col md={6} className='p-5 d-flex justify-content-center align-items-center flex-column'>
                <form className='w-100 mx-2 p-5'>
                  <h3 className='text-white text-center'>
                    <FontAwesomeIcon icon={faStackOverflow} className='fa-2x' />
                    Project Fare
                  </h3>
                  {register ? (
                    <h5 className='text-center'>Sign up to your Account</h5>
                  ) : (
                    <h5 className='text-center'>Sign in to your Account</h5>
                  )}
                  {register && (
                    <div className='mb-3'>
                      <input
                        type='text'
                        placeholder='Username'
                        className='form-control rounded-0 mx-5 my-2'
                        onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                      />
                    </div>
                  )}
                  <div className='mb-3'>
                    <input
                      type='text'
                      placeholder='Email Id'
                      className='form-control rounded-0 mx-5 my-2'
                      onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    />
                  </div>
                  <div className='mb-3'>
                    <input
                      type='text'
                      placeholder='Password'
                      className='form-control rounded-0 mx-5 my-2'
                      onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />
                  </div>
                  <div className='mb-3'>
                    {register ? (
                      <div>
                        <button
                          type='submit'
                          className='btn btn-warning w-100 rounded-0 mx-5 my-2 bordered-1'
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                        <p className='mx-5 my-2'>
                          Already a User? Click here to <Link to={'/login'}>Login</Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button
                          type='submit'
                          className='btn btn-warning w-100 rounded-0 mx-5 my-2 bordered-1'
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                        <p className='mx-5 my-2'>
                          New User? Click here to <Link to={'/register'}>Register</Link>
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
        <ToastContainer autoClose={2000} theme='colored' position='top-center' />
      </div>
    </>
  );
}

export default Auth;
