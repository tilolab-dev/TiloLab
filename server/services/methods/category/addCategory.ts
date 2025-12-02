import { readMultipartFormData } from "h3";
import supabase from '@/utils/supabase'
import { prisma } from '@/prisma/prisma'

async function addCategory(event: any) {

    const formData = await readMultipartFormData(event);

    if (!formData) {
        return { message: 'No data received!' };
    }

    // return formData

    const textField = formData.find((field) => field.name === 'data');

    if (!textField) {
        return {message: 'No category data found'}
    }

    const productData = JSON.parse(textField.data.toString());

    const lastCategory = await prisma.category.findFirst({
        orderBy: { listPosition: 'desc' },
    });

    const newListPosition = lastCategory ? lastCategory.listPosition + 1 : 1;


    try {

        const newCategory = await prisma.category.create({
            data: {
                group: productData.group,
                listPosition: newListPosition,
                visible: productData.visible,
                translations: {
                    create: productData.translations.map((translation: any) => ({
                        language: translation.language,
                        title: translation.title,
                        groupText: translation.description,
                    }))
                },
                categoryImg: productData.categoryImg
            }
        })

        return {
            tooltipStatus: 'success',
            message: 'Категорія створена успішно',
            category: newCategory
        }
        
    } catch (error) {
        return {
            message: `Something went wrong, ${error}`
        }
    }

}

export default addCategory;
