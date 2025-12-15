import { readMultipartFormData } from "h3";
import path from "path";
import { prisma } from '@/prisma/prisma';
import supabase from '@/utils/supabase'

interface IOptions {
    optionImg: string,
    optionPrice: number,
    translations: {
        language: string,
        title: string,
        description: string,
        productColor: string,
        productMaterial: string,
    }
}

async function addProduct(event: any) {

    const body = await readBody<{
        categoryId: number,
        visibility: boolean,
        img: string[] ,
        productPrice: number,
        stockState: boolean,
        stockValue: number,
        discountPercent: number,
        productSize: string,
        translations: any
        options: IOptions[]
    }>(event);

    console.log(body, 'body');
    // return;

      if (!body) {
        return { 
            statusCode: 400,
            message: 'No data received!' 
        };
    }

    const { categoryId, visibility, productPrice, stockState, stockValue, discountPercent, productSize, translations } = body;

    if (
        categoryId === undefined ||
        !visibility ||
        productPrice === undefined ||
        stockValue === undefined ||
        stockState === undefined ||
        discountPercent === undefined ||
        !productSize || 
        !translations ||
        typeof visibility !== "boolean" ||
        typeof stockState !== "boolean"
    ) {

        // if (categoryId === undefined) {
        //     console.log('categoryId is undefined');
        // }
        // if (productPrice === undefined) {
        //     console.log('productPrice is undefined');
        // }
        // if (stockValue === undefined) {
        //     console.log('stockValue is undefined');
        // }
        // if (discountPercent === undefined) {
        //     console.log('discountPercent is undefined');
        // }
        // if (!productSize) {
        //     console.log('productSize is undefined');
        // }
        // if (!translations) {
        //     console.log('translations is undefined');
        // }
        // if (typeof visibility !== "boolean") {
        //     console.log('visibility is not a boolean');
        // }
        // if (typeof stockState !== "boolean") {
        //     console.log('stockState is not a boolean');
        // }


        return { 
            statusCode: 400,
            message: 'Missing required fields!' 
        };
    }







    try{


        // const formData = await readMultipartFormData(event);

        // if (!formData) {
        //     return { message: 'No data received!' };
        // }


        // const textField = formData.find((field) => field.name === 'data');

        // if (!textField) {
        //     return {message: 'No product data found'}
        // }

        // const productData = JSON.parse(textField.data.toString());

        // console.log(productData)
// return
        const newProduct = await prisma.product.create({
            data: {
                categoryId: Number(body.categoryId),
                visible: Boolean(body.visibility),
                productPrice: Number(body.productPrice),
                stockState: Boolean(body.stockState),
                stockValue: Number(body.stockValue),
                discountPercent: Number(body.discountPercent),
                productSize: String(body.productSize),

                translations: {
                    
                    create: body.translations.map((t: any) => ({
                        language: t.language,
                        title: t.title,
                        productDescription: t.description,
                        productColor: t.productColor,
                        productMaterial: t.productMaterial,

                    })),

                },

                img: {
                    create: body.img.map((imgPath: string) => ({
                        path: imgPath,
                    }))
                },

                options: {

                    create: body.options.map((option: any) => (
                        {
                        
                        optionImg: option.fileImg[0],
                        optionPrice: Number(option.optionPrice),

                        translations: {
                            create: option.translations.map((tr: any) => ({
                                language: tr.language,
                                optionInfo: tr.optionInfo,
                                productDescription: tr.description,
                                productColor: tr.productColor,
                                productMaterial: tr.productMaterial
                            })),
                        }
                    }
                ))
                }

            }
        })



        console.log(newProduct, 'log product')

        return {
            // data: jsonData
            statusCode: 200,
            message: 'Product created successfully',
            product: newProduct,
        }

        // for (const item of files) {

            // console.log(item, 'item api')
        //     return {response: item}

            // if (item.type) {
            //     // uploadedFiles.push(item);

            // }
            //  else if (item.name) {
            //     textFields[item.name] = item.data.toString();
            // } else {
            //     console.log('Item without a name:', item);
            // }
        // }

        // const getFiles = uploadedFiles[0]





    } catch (error) {
        return {
            statusCode: 500,
            message: `${error} something went wrong` 
        }
    }

}

export default addProduct