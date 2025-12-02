
import { prisma } from '@/prisma/prisma'

// import { encode, decode } from "@msgpack/msgpack";
// import redisClient from "../../../../utils/redisClient";


const getCategoriesWithProducts = async (offset: any) => {
    const cacheKey = `categories_offset_${offset}`;
    const productCountKey = "total_product_count";

    // try {
    //     const pipeline = redisClient.pipeline();
    //     pipeline.getBuffer(cacheKey);
    //     pipeline.getBuffer(productCountKey); 
    //     const execResult = await pipeline.exec();

    //     if (!execResult) return { message: 'Redis error', error: 'Pipeline returned null' };

    //     const [[cacheError, cacheData], [countError, cachedTotalProducts]] = execResult;
        
    //     if (cacheError || countError) return { message: "Redis error", error: cacheError || countError };

    //     let totalProducts: number | null = null;
        
    //     if (typeof cachedTotalProducts === 'string') {
    //         totalProducts = parseInt(cachedTotalProducts, 10);
    //     }

    //     if (totalProducts === null) {
    //         totalProducts = await prisma.product.count();
    //         await redisClient.set(productCountKey, totalProducts.toString(), "EX", 3600);
    //     }

    //     if (cacheData) {
    //         const arrayBuffer = new Uint8Array(Object.values(cacheData)).buffer;
    //         const loadedData = decode(new Uint8Array(arrayBuffer)) as any[];
        
    //         const hasMore = loadedData.some((category: any) => category.products.length === 10);
    //         return { data: loadedData, message: "Data loaded from cache", hasMore };
    //     }

    //     const categoryWithProducts = await prisma.category.findMany({
    //         where: { products: { some: {} } },
    //         select: {
    //             id: true,
    //             group: true,
    //             translations: { select: { language: true, title: true } },
    //             products: {
    //                 take: 10,
    //                 skip: +offset,
    //                 select: {
    //                     id: true,
    //                     productSize: true,
    //                     img: { select: { path: true } },
    //                     price: true,
    //                     wholesalePrice: true,
    //                     counterQuantity: true,
    //                     translations: {
    //                         select: {
    //                             language: true,
    //                             title: true,
    //                             productDescription: true,
    //                             wholesaleDescription: true,
    //                             groupPackage: true,
    //                             productColor: true,
    //                             productMaterial: true
    //                         }
    //                     },
    //                     options: {
    //                         select: {
    //                             id: true,
    //                             translations: { select: { language: true, optionInfo: true } }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });

    //     await redisClient.set(cacheKey, Buffer.from(encode(categoryWithProducts)), "EX", 3600);

    //     return { 
    //         data: categoryWithProducts,
    //         message: 'Data added to cache',
    //         hasMore: categoryWithProducts.some(category => category.products.length === 10)
    //     };
    // } catch (error) {
    //     return { message: 'Something went wrong', error };
    // }
};


export default getCategoriesWithProducts;
