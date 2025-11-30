import { setCookie } from "h3";

async function logoutUser(event: any) {

    setCookie(event, 'accessToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 0,
    });

    setCookie(event, 'refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 0,
    });

    return {
        statusCode: 200,
        statusMessage: 'Logout successful',
    }

}

export default logoutUser;