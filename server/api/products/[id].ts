import { getProductById } from "@/server/services/productsServices";

export default defineEventHandler((event) => {

    const id = getRouterParam(event, 'id');


    // console.log(id, 'id');
    // return {
    //     statusCode: 200,
    //     data: 'data'
    // };

    if (!id) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Product id is required' 
        });
    }




    return getProductById(id)
})