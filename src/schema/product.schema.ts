import { object, string, number, TypeOf } from "zod";

const payload = {
    body:object({
        title: string({
            required_error: "Title is requied",
        }),
        description : string({
            required_error: "descritpion is requied",
        }).min(120, "Descritpion should be be 120 characters"),
        price : number({
            required_error: "price is requied",
        }),
        image : string({
            required_error: "image is requied",
        })

    })
}

const params = {
    params : object({
        productId : string ({
            required_error: "product Id is requied",
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
})
export const getProductSchema = object({
    ...params
})
export const deleteProductSchema = object({
    ...params
})

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type GetProductInput = TypeOf<typeof getProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>