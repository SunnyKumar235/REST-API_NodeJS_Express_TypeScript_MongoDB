import {object, string, TypeOf } from 'zod'
import { createUserHandler } from '../controller/user.controller'
export const createUserSchema = object({
    body:object({name : string ({
        required_error : "Name is required"
    }),
    password :string ({
        required_error : "password is required"
    }).min(6,"Password is to short"),
    passwordConformation : string ({
        required_error : "Password Conformation is required"
    }),
    email:string({
        required_error: "Email is required"
    }).email("Must is valid email")
}).refine((data)=> data.password === data.passwordConformation,{
    message: "Password do not match",
    path:["passwordConformation"]
}),    
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConformation">