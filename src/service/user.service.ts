import { DocumentDefinition, FilterQuery } from 'mongoose'
import userModel, { UserDocument } from '../models/user.models';
import { omit } from 'lodash';


export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createAt' | 'updateAt' | 'comparePassword'>>) {
    try {
        const user = await userModel.create(input);
        return omit(user.toJSON(), 'password');

    } catch (e: any) {
        throw new Error(e);
    }

}

export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await userModel.findOne({ email });
    if (!user) {
        return false;
    }
    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), 'password');

}

export async function findUser (query :FilterQuery<UserDocument>){
    return userModel.findOne(query).lean();
}


