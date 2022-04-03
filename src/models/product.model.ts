import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from './user.models';


const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export interface ProductDocument extends mongoose.Document {
    user: UserDocument['_id'];
    title:string ,
    description : string,
    price : number,
    image : string ,
    createdAt: Date,
    updateAt: Date
}
export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
  }
  
const procuctsSchema = new mongoose.Schema(
    {
      productId : {type: String , required: true, unique: true, default : `productId_${nanoid()}`},  
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      description :{type : String, required : true},
      price :{type : Number, required : true},
      title :{type : String, required : true},
    },
    {
      timestamps: true,
    }
  );

// this is model
const ProductModel = mongoose.model<ProductDocument>('session', procuctsSchema);
export default ProductModel; 
