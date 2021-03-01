
import { AuthFailureError, InternalError } from '../core/ApiError';
import axios from 'axios'
export const getAccessTokenForWorker = async (email?: string) => {
  
  if(!email) throw new AuthFailureError('Invalid Email');
  const data = {
    email: email,
    password: process.env.SERVER_PWD
  }
 const token =  await axios.post(`${process.env.SERVER_AUTHLINK}`, data).then(function (response) {
    let responseToken = response.data.token
    return responseToken
  })
  .catch(function (error) {
    throw new AuthFailureError('Auth Link is not working')
  });
  return token
  
};

export const getResultFromServer = async (token?: string) => {
  
  if(!token) throw new AuthFailureError('Token is missing');
  const result =  await axios.get(`${process.env.SERVER_RESULTLINK}`, { headers: { Authorization: `Bearer ${token}` } })
  
  return result

}
