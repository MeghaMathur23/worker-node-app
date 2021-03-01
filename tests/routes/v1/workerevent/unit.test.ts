import { addHeaders, USER_EMAIL } from './mock';
import WorkerEvent, { WorkerEventModel } from '../../../../src/database/model/WorkerEvent';

import supertest from 'supertest';
import app from '../../../../src/app';
import WorkerEventRepo from '../../../../src/database/repository/WorkerEventRepo';
export const workerEventCreateSpy = jest.spyOn(WorkerEventRepo, 'create');

describe('WorkerEvent route', () => {
  const endpoint = '/v1/worker/event';
  const request = supertest(app);
  beforeAll(async () => {
    await WorkerEventModel.remove({}); // delete all data from WorkerEvent table
    await WorkerEventModel.create({
      event: 'start',
      time:1234,
      horse:{id:1,name:"Starbolt"},
      email:"joe@gmail.com",
      createdAt:new Date(),
      updatedAt:new Date()
    } as WorkerEvent);
  
  });

  afterAll(async () => {
    await WorkerEventModel.remove({}); // delete all data from user table
  });

  beforeEach(() => {
    workerEventCreateSpy.mockClear();
  });

   it('Should send error when empty body is sent', async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/email/i);
  });

  it('Should send error when email is not valid format', async () => {
    const response = await addHeaders(request.post(endpoint).send({ email: '123' }));
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Auth Link is not working/);
   
  });
  
});
 


