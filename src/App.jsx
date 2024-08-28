import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import { Routes,Route } from 'react-router-dom'
import PageNotFount from './pages/PageNotFount'
import { useContext } from 'react'
import { isLoginAuthContext } from './context/Contextshare'








function App() {
 const {isLoginStatus} = useContext(isLoginAuthContext)
  

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/project' element={<Project/>} />
      <Route path='/register' element={<Auth register/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/dashboard' element={isLoginStatus?<Dashboard/>:<PageNotFount/>} />
      <Route path='/*' element={<PageNotFount/>} />
     </Routes>
    <Footer/>
    </>
  )
}

export default App
