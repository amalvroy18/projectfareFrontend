import axios from "axios";

export const commonApi = async (reqmethod, url, reqbody, reqHeader) => {
    const reqConfig = {
        method: reqmethod,
        url,
        data: reqbody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    };

    try {
        const result = await axios(reqConfig);
        return result;
    } catch (error) {
        // Handle the error appropriately
        if (error.response) {
            // The request was made, and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response;
        } else if (error.request) {
            // The request was made but no response was received
            return error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            return { message: error.message };
        }
    }
};
