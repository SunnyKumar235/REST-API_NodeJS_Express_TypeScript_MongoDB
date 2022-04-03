import { Request, Response, NextFunction } from "express";
import { get } from 'lodash';
import { refreshToken } from "../service/session.service";
import { verifyJWT } from '../utils/jwt.utlis';
async function  deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );
    //return 0;

    const refreshToken = get(req, "headers.x-refresh");
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = verifyJWT(accessToken);
    console.log(decoded);
    if (decoded) {
        res.locals.user = decoded;
        next();
    };

    if(expired && refreshToken){
        const newAccessToken = refreshToken(refreshToken);
        console.log("new access token");
        if(newAccessToken){
            res.setHeader('x-access-token', newAccessToken);
        }

        const result = await verifyJWT(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }
   

}
export default deserializeUser;