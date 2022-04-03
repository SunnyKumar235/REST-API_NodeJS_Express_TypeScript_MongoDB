import { FilterQuery, UpdateQuery } from 'mongoose';
import { decode } from 'querystring';
import sessionModel from '../models/sessoin.model';
import SessionModel, { SessionDocument } from '../models/sessoin.model'
import { signJwt, verifyJWT } from '../utils/jwt.utlis';
import { get } from 'lodash'
import { findUser } from './user.service';
import config from 'config';

export async function createSession(userId: string, userAgent: string) {

    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
}
export async function findSession(query: FilterQuery<SessionDocument>) {
    console.log(query);
    return sessionModel.find(query).lean();
}
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

export async function refreshToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJWT(refreshToken);
    if (!decoded || !get(decoded,"session"))return false;

    const session = await sessionModel.findById(get(decoded, "session"));
    if(!session || !session.valid) return false;

    const user = await findUser({_Id: session.user})

    if(!user) return false ;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
    );

    return accessToken;

}