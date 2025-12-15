
import { prisma } from '@/prisma/prisma'


const getCategoryWithProducts = async (id: number) => {
    // return await prisma.category.findUnique({
    //     where: {
    //         id: id
    //     },
    //     include: {
    //         products: true
    //     }
    // })
    try {

        const products = await prisma.product.findMany({
            where: {
                categoryId: id
            },
            include: {
                img: true,
                options: {
                    include: {
                        translations: true,
                    }
                },
                translations: true
            }
        })



        // const category = await prisma.category.findUnique({
        //     where: {
        //         id: id
        //     },
        //     include: {
        //         subcategories: true,
        //         translations: true,
        //         products: {
        //             include: {
        //                 img: true,
        //                 options: {
        //                     include: {
        //                         translations: true,
        //                     }
        //                 },
        //                 translations: true
        //             }
        //         },
        //     },
        // })

        return {
            data: products,
            message: 'Getting data was successfully'
        }

    } catch (error) {
        return {
            message: `Something went wrong ${error}`,
            error: error
        }
    }
}



export default getCategoryWithProducts;