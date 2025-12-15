import { defineEventHandler, readBody, readMultipartFormData } from "h3";
import { addProduct, getProducts, getProductById } from "@/server/services/productsServices"



export default defineEventHandler((event) => {

    const method = event.node.req.method;
    // const query = getQuery(event);
// 
    // console.log(query, 'query')


    switch (method) {
        case 'GET': 

            // if (query.product === 'getProductById') {
            //     console.log('enter getProduct')
            //     return;
            //     // return getProductById(event)
            // } else {
                return getProducts(event)
            // }

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