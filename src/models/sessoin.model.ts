import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { functions } from 'lodash';
import { boolean } from 'zod';
import { UserDocument } from './user.models';

export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent : string;
    createAt: Date;
    updateAt: Date;
}

// this is schema 
// const sessionSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     valid: { type: Boolean, default: true },
//     userAgent :{ type : String}
// }, {
//     timestamps: true
// })

const sessionSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      valid: { type: Boolean, default: true },
      userAgent: { type: String },
    },
    {
      timestamps: true,
    }
  );

// this is model
const sessionModel = mongoose.model<SessionDocument>('session', sessionSchema);
export default sessionModel; 
