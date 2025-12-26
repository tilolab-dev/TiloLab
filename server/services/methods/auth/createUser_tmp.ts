import { readMultipartFormData } from "h3";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";

async function createUser(event: any) {
  const data = await readMultipartFormData(event);

  if (!data) {
    return { message: "No data received!" };
  }

  const parsedData = data.map((item) => JSON.parse(item.data.toString()));

  const registeredUsers = await prisma.user.findUnique({
    where: {
      email: parsedData[0].mail,
      role: "CLIENT"
    }
  });

  if (registeredUsers) {
    throw createError({ statusCode: 400, statusMessage: "Email уже используется" });
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData[0].password, 10);

    // const createNewUser = await prisma.user.create({
    //     data: {
    //         username: parsedData[0].userName,
    //         userFamily: parsedData[0].userFamily,
    //         userSurname: parsedData[0].userSurname,
    //         email: parsedData[0].mail,
    //         password: hashedPassword,
    //         role: 'CLIENT'
    //     }
    // });

    const createNewUser = await prisma.user.upsert({
      where: { email: parsedData[0].mail },
      update: {
        username: parsedData[0].userName,
        userFamily: parsedData[0].userFamily,
        userSurname: parsedData[0].userSurname,
        phoneNumber: parsedData[0].phoneNumber,
        password: hashedPassword,
        role: "CLIENT"
      },
      create: {
        username: parsedData[0].userName,
        userFamily: parsedData[0].userFamily,
        userSurname: parsedData[0].userSurname,
        phoneNumber: parsedData[0].phoneNumber,
        email: parsedData[0].mail,
        password: hashedPassword,
        role: "CLIENT"
      }
    });

    return {
      status: 200,
      message: `User ${createNewUser.username} created successfully`
    };
  } catch (err) {
    return {
      status: 500,
      message: "Server error",
      err
    };
  }
}

export default createUser;
