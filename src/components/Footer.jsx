import { faFacebook, faInstagram, faLinkedinIn, faStackOverflow, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
faLinkedinIn

function Footer() {
  return (
    <>
    <div className="container-fluid bg-success p-5">
        <div className="row">
            <div className="col-md-4">
                <h2 className='text-center '><FontAwesomeIcon icon={faStackOverflow} className='me-4'/>Project Fair</h2>
                <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id deserunt doloremque sequi totam omnis temporibus, quaerat aliquid laboriosam voluptatem dolores aperiam deleniti veniam, autem pariatur accusamus! Numquam exercitationem debitis ratione?</p>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center align-items-center flex-column">
                <div>
                    <h4 className=' text-white'>Links</h4>
                    <Link to={'/'}><p className='text-dark'>Home</p></Link>
                    <Link to={'/project'}><p className='text-dark'>Projects</p></Link>
                    <Link to={'/dashboard'}><p className='text-dark'>DashBoard</p></Link>
                </div>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center align-items-center flex-column px-5">
            <div>
                <h4 className='text-white'>Guides</h4>
                        <p>React</p>
                        <p>React Bootstrap</p>
                        <p>Bootswatch</p>
            </div>
            </div>
            <div className="col-md-4 ">
                <h4 className='text-center'>Contact Us</h4>
                <div className='d-flex'>
                <input type="text" placeholder='E-mail ID' className='form-control rounded-0' />
                <button className='btn btn-warning rounded-0'>Subscribe</button>
                </div>
                <div className='d-flex justify-content-between mt-4'>
                <FontAwesomeIcon icon={faFacebook} className='fa-2x' />
                <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
                <FontAwesomeIcon icon={faTwitter} className='fa-2x' />
                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x' />
                <FontAwesomeIcon icon={faLinkedinIn} className='fa-2x' />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer