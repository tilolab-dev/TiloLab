import { readMultipartFormData } from "h3";
import path from "path";
import { prisma } from '@/prisma/prisma';
import supabase from '@/utils/supabase'



async function addProduct(event: any) {
    try{


        const formData = await readMultipartFormData(event);

        if (!formData) {
            return { message: 'No data received!' };
        }


        const textField = formData.find((field) => field.name === 'data');

        if (!textField) {
            return {message: 'No product data found'}
        }

        const productData = JSON.parse(textField.data.toString());

        // console.log(productData)
// return
        const newProduct = await prisma.product.create({
            data: {
                categoryId: Number(productData.category),
                visible: Boolean(productData.visibility),
                price: Number(productData.price),
                stockState: Boolean(productData.stockState),
                stockValue: Number(productData.stockValue),
                discountPercent: Number(productData.discountPersent),
                wholesalePrice: Number(productData.wholesalePrice),
                wholesaleFrom: Number(productData.wholesaleFrom),
                counterQuantity: Number(productData.counterQuantity),
                packageType: String(productData.packageType),
                wholesaleOnly: Boolean(productData.wholesaleOnly),
                productSize: String(productData.productSize),
                productWeight: String(productData.productWeight),
                productDensity: String(productData.productDensity),
                productCapacity: String(productData.productCapacity),
                packageQuantity: String(productData.productQuantity),
                groupPackQuantity: String(productData.productGroupQuantity),

                translations: {
                    
                    create: productData.translations.map((t: any) => ({
                        language: t.language,
                        title: t.title,
                        productDescription: t.description,
                        wholesaleDescription: t.wholesaleDescription,
                        productColor: t.productColor,
                        groupPackage: t.groupPackage,
                        productMaterial: t.productMaterial,

                    })),

                },

                img: {
                    create: productData.img.map((imgPath: string) => ({
                        path: imgPath,
                    }))
                },

                options: {

                    create: productData.options.map((option: any) => (
                        {
                        
                        optionImg: option.fileImg[0],
                        optionPrice: Number(option.optionPrice),

                        translations: {
                            create: option.translations.map((tr: any) => ({
                                language: tr.language,
                                optionInfo: tr.optionInfo,
                            })),
                        }
                    }
                ))
                }

            }
        })

        // console.log(newProduct, 'log product')

        return {
            // data: jsonData
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
            message: `${error} something went wrong` 
        }
    }

}

export default addProduct