import { readBody } from 'h3';
import supabase from '@/utils/supabase'
import { prisma } from '@/prisma/prisma'


const deleteCategory = async (event: any) => {
    try{

        const body = await readBody(event);

        if (!body.id) {
            throw new Error('category Id is required')
        }

        await prisma.category.delete({
            where: {id: body.id}
        })

        return {
            message: `Category with ${body.name} deleted successfully`,
            name: body.name
        }

    } catch (error) {
        if (error) {
            return { error: error || 'Failed to delete category' };

        }
    }
}

export default deleteCategory
