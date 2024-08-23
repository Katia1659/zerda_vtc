import axios from 'axios';
import { BASE_URL, API_GOUV } from './urls/backendURL';
import { getToken } from './service/tokenServices';

/**
 * 
 * @apiBackend axios instance for backend API calls
 * @apiDataGouv axios instance for Data Adresse France gouv API calls
 * @author Lamri Kaouthar
 */

// Axios instance for backend API
const apiBackEnd = axios.create(
    {
        baseURL : BASE_URL,
        withCredentials: true,
    }
);

// apiBackEnd.interceptors.request.use(
//     (request)=>
//     {
//         const token = getToken();
//         if (token) 
//         {
//             request.headers.common['Authorization'] = 'Bearer ' + token;
//             return request;
//         }
//     }
// );

export default apiBackEnd;

// Axios instance for Data Adresse France gouv API
const apiDataGouv = axios.create(
    {
        baseURL : API_GOUV,
    }
);

export {apiDataGouv};





