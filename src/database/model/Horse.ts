import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Horse';
export const COLLECTION_NAME = 'horses';

export default interface Horse extends Document {
  _id : false;
  id: number;
  name: string;
}

const schema = new Schema(
  {
    id: {
      type: Schema.Types.Number,
      required: true,
      unique: true
    },
    name: {
      type: Schema.Types.String
    }
  },
  {
    versionKey: false,
  },
);

export const HorseModel = model<Horse>(DOCUMENT_NAME, schema, COLLECTION_NAME);
