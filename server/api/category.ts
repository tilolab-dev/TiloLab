import { defineEventHandler } from "h3";
import  {
    addCategory, 
    addSubCategory, 
    getAllCategories, 
    getCategoriesWithProducts,
    getCategoryWithProducts,
    deleteCategory
}  from '@/server/services/categoryServices'

export default defineEventHandler(async (event) => {

    const method = event.node.req.method;

    const query = getQuery(event);


    const offset = query.offset;
    
 
    switch (method) {
        case 'GET': 
            if (query.category === 'all') {
                console.log(offset, 'offset from controller')
                return await getCategoriesWithProducts(offset);
            } else if (query.categoryId) {
                return await getCategoryWithProducts(Number(query.categoryId));
            } else {
                return await getAllCategories();
            }
        break;
        case 'POST':
            return await addCategory(event);
        // return await addUser();
        break;
        case 'PATCH':
            // return await updateUser();
        break;
        case 'DELETE':
            return await deleteCategory(event)
            // return await deleteUser();
        break;
        default: 
        return { message: "Method not defined"}
    }
});