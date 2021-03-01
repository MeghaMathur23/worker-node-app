import express from 'express';
import { SuccessMsgResponse, NoContentResponse } from '../../../core/ApiResponse';
import WorkerEventRepo from '../../../database/repository/WorkerEventRepo';
import WorkerEvent from '../../../database/model/WorkerEvent';
import asyncHandler from '../../../helpers/asyncHandler';
import { getAccessTokenForWorker, getResultFromServer } from '../../../core/ApiCallForWorker'
import {ResponseStatus} from '../../../helpers/httpStatus'
import Logger from '../../..//core/Logger';

const router = express.Router();
const interval = 15000
/**
 * Function for calling result api and add to database
 * @param bearerToken 
 * @param email 
 */
const tryOrReattempt = async (bearerToken:string,email:string) => {
  return new Promise((resolve, reject) => {
    //Call server_result api with bearer token 
     getResultFromServer(bearerToken).then(async(response) => {
      let resultObject = response.data
      //Call workerevent repo for inserting result in database
       await WorkerEventRepo.create({
      event: resultObject.event,
      time:resultObject.time,
      horse:resultObject.horse,
      email:email
    } as WorkerEvent);
    
     if(!response){ //Check if response is not coming then set timeout of 15sec and throw no data error
      setTimeout(function() {
        throw new NoContentResponse('NoDataError');
      }, interval);
     }
    Logger.info("inserting data in db")
    return resolve(await tryOrReattempt(bearerToken,email))
      
    })
    .catch(async function (error) {
     
      if (error.response && error.response.status === ResponseStatus.UNAUTHORIZED) {
        Logger.info("re-authenticating again")
        const newbearerToken = await getAccessTokenForWorker(email)
       return await tryOrReattempt(newbearerToken,email)
      } else if (error.response && error.response.status === ResponseStatus.NO_CONTENT) {
        Logger.info("no content or 204 status")
        return await tryOrReattempt(bearerToken,email)
      } else {
        return await tryOrReattempt(bearerToken,email)
      }
    });
  })
}

router.post(
  '/event',
  asyncHandler(async (req, res) => {
   //Call Server_Auth API for token
    const bearerToken = await getAccessTokenForWorker(req.body.email)
   //first attempt of promise call 
    await tryOrReattempt(bearerToken,req.body.email)

   return new SuccessMsgResponse('WorkerEvent inserted successfully').send(res);
  }),
);



export default router;
