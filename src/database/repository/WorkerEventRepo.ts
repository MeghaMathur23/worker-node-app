import WorkerEvent, { WorkerEventModel } from '../model/WorkerEvent';

export default class WorkerEventRepo {
 
  public static async create(workerEvent: WorkerEvent): Promise<WorkerEvent> {
    const now = new Date(); 
    
    workerEvent.createdAt = now;
    workerEvent.updatedAt = now;
    const createdWorkerEvent = await WorkerEventModel.create(workerEvent);
    return createdWorkerEvent.toObject();
  }

}
