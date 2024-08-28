import Project from "../pages/Project"
import { commonApi } from "./commonApi"
import {serverUrl} from "./serverUrl"


//register
export const registerApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//add project
/* export const addProjectApi = async(reqbody, reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/projects`,reqbody,reqHeader)
   } */

    // services/allApi.js
export const addProjectApi = async(reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-project`, reqBody, reqHeader);
}

// The commonApi function should be something like:
/* const commonApi = async (method, url, body, headers) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: body,
            headers: headers
        });
        return response;
    } catch (error) {
        console.error('API call error:', error);
        return error.response || { status: 500, data: 'Internal Server Error' };
    }
}
 */
//home project
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`,"","")
}

//all-project
export const allprojectApi = async(searchKey)=>{
    //syntac - url?key=value
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"","")
}

//api for user Project

export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

//api to remove a project
export const removeUserProjectApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-userProject/${id}`,{},"")
 }

//api to edit userProject
export const editUserProjectApi = async(id , reqBody ,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/edit-project/${id}`,reqBody,reqHeader)
}

//api to update profile
export const profileUpdateApi = async(id , reqBody,reqHeader)=>{
    return await commonApi ('PUT',`${serverUrl}/update-profile `,reqBody,reqHeader)
}