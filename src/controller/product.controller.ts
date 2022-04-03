import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";
export async function createProductHandler (req: Request<{}, {}, CreateProductInput["body"]> , res: Response){
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({ ...body, user: userId });
    return res.send(product);

}
export async function updateProductHandler (req: Request<UpdateProductInput['params']> , res: Response){
    const userId = res.locals.user._id;
    const productId = res.locals.productId;

    const update = req.body;

    const product = await findProduct(productId);
    if(!product){
        return res.sendStatus(404);
    }
    if(!String(product.user) != userId){
        return res.sendStatus(403);
    }
    const updateProduct = await findAndUpdateProduct({productId}, update,{new:true});

    res.send(updateProduct);

    
}
export async function getProductHandler (req: Request<UpdateProductInput['params']> , res: Response){
    const productId = res.locals.productId;
    const product = await findProduct(productId);

    if(!product){
        return res.sendStatus(404);
    }
    return res.send(product);


    
}
export async function deleteProductHandler (req: Request<UpdateProductInput['params']> , res: Response){

    const userId = res.locals.user._id;
    const productId = res.locals.productId;

    const update = req.body;

    const product = await findProduct(productId);
    if(!product){
        return res.sendStatus(404);
    }
    if(!String(product.user) != userId){
        return res.sendStatus(403);
    }
    await deleteProduct({productId});

    res.sendStatus(200);
    
}