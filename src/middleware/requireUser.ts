import { Request, Response, NextFunction } from "express";

async function requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    if (!user) {
        
        res.sendStatus(400);
    }
    console.log(user);
    return next();
}

export default requireUser;