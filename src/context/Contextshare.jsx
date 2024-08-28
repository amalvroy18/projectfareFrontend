import React, { children,useState } from 'react'
import { createContext } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const isLoginAuthContext = createContext(true)

function Contextshare({children}) {

    //children is a predefined props to share data

    const [addResponse , setAddResponse] = useState({})
    const [editResponse,setEditResponse] = useState({})
    const [isLoginStatus , setIsLoginStatus] = useState(true)

  return (
    <addResponseContext.Provider value={{addResponse , setAddResponse}}>
        {/* provider tag to share that data - where shared datas should placed inside the value attribute as key:value pairs */}
        <editResponseContext.Provider value={{editResponse , setEditResponse}}>
          <isLoginAuthContext.Provider value={{isLoginStatus , setIsLoginStatus}}>
            {children}
          </isLoginAuthContext.Provider>
        </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default Contextshare