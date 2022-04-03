import { Request, Response } from 'express';
import { createSession, findSession, updateSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utlis';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate User Password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or Password");
    }

    // create a session
    const session = await createSession(user._id, req.get('userAgent') || "");

    //create JWT token 


    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
    );

    // create a refresh token
    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("refreshToeknTtl") } // 15 minutes
    );
    return res.send({ accessToken, refreshToken });


}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const session = await findSession({ user: userId, valid: true })
    return res.send(session);

}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}