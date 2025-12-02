import { defineEventHandler, readBody, readMultipartFormData } from "h3";
import { addProduct, getProducts } from "@/server/services/productsServices"



export default defineEventHandler((event) => {

    const method = event.node.req.method;


    switch (method) {
        case 'GET': 
            return getProducts(event)
        break;
        case 'POST':
            return addProduct(event)
        break;
        case 'PATCH':
            // return await updateUser();
        break;
        case 'DELETE':
            // return await deleteUser();
        break;
        default: 
        return { message: "Method not defined"}

    }
});