import supabase from "~/utils/supabase";
import { readMultipartFormData } from "h3";
async function checkVerifyPass(event: any) {

    const data = await readMultipartFormData(event);

    if (!data) {
        return {
            status: 404,
            message: 'No data received'
        }
    }


    // const parsedData = JSON.parse(data?.[0]?.data?.toString());
    const parsedData = JSON.parse(
        data?.[0]?.data?.toString() ?? '{}'
    )


    const {email, token} = JSON.parse(data?.[0]?.data?.toString() ?? '{}');


    try{

        // const {email, token} = await readBody(event);

        const { data, error } = await supabase.auth.verifyOtp({ 
            email,
            token,
            type: 'email',
        });

        if (error) {
            throw createError({ 
                status: 400, 
                statusMessage: 'Password does not match'
            });
        }

        return {
            status: 200,
            message: 'Enter successfully',
            session: data.session
        }

    } catch (err) {

        return {
            status: 400,
            message: 'Something went wrong'
        }

    }

}

export default checkVerifyPass;