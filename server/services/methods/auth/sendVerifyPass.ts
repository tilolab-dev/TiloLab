import supabase from '../../../../utils/supabase'
import prisma from '../../../../prisma/prisma'
import { readMultipartFormData } from 'h3';


async function sendVerifyPass(event: any) {
    try {
        
        const data = await readMultipartFormData(event);

        if (!data) {
            return {
                status: 404,
                message: 'No data received'
            }
        }
        const email = JSON.parse(data?.[0]?.data?.toString() ?? '{}').mail
      
        const checkEmailExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (checkEmailExist) {
            return {
                status: 400,
                message: 'Email already exist'
            }
        }

        const { error } = await supabase.auth.signInWithOtp({ 
            email,
            options: { emailRedirectTo: undefined },
        })

        if (error) {
            throw createError({ statusCode: 400, statusMessage: error.message });

        }
        return {
            status: 200,
            message: 'Email sent successfully'
        }
    } catch (error) {

        return {
            status: 400,
            message: 'Something went wrong'
        }
    }
}

export default sendVerifyPass