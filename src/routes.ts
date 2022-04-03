import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource"
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from './schema/session.schema'
import requireUser from './middleware/requireUser';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
function routes(app: Express) {

    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })
    //
    app.post('/api/createUser', validateResource(createUserSchema), createUserHandler);
    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        createUserSessionHandler
      );

    app.get('/api/sessions',requireUser ,getUserSessionHandler);
    app.delete('/api/deleteSession',requireUser ,deleteSessionHandler);
    
    app.post('/api/product',[requireUser, validateResource(createProductSchema)], createProductHandler);
    app.put('/api/product:/productId',[requireUser, validateResource(updateProductSchema)], updateProductHandler);
    app.get('/api/product/:productId',[validateResource(getProductSchema)], getProductHandler);
    app.delete('/api/product/:productId',[requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default routes;