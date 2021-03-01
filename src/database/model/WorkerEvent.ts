import { model, Schema, Document } from 'mongoose';
import Horse from './Horse';

export const DOCUMENT_NAME = 'WorkerEvent';
export const COLLECTION_NAME = 'workerevents';
export const enum HorseEvent {
  START = 'start',
  FINISH = 'finish'
}
export default interface WorkerEvent extends Document {
  event: string;
  time: number;
  email?: string;
  horse: Horse;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    event: {
      type: Schema.Types.String,
      required: true,
      enum: [HorseEvent.START, HorseEvent.FINISH],
    },
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    time: {
      type: Schema.Types.Number
    },
    horse: { id: String, name: String },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const WorkerEventModel = model<WorkerEvent>(DOCUMENT_NAME, schema, COLLECTION_NAME);
