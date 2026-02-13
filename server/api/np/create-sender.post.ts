import { prisma } from "@/prisma/prisma";

interface ISender {
  name: string;
  surname: string;
  family: string;
  phoneNumber: string;
  senderPostomat?: string | null;
  senderPostOffice?: string | null;
}
export default defineEventHandler(async (event) => {
  const body = await readBody<ISender>(event);

  const { name, surname, family, phoneNumber, senderPostomat, senderPostOffice } = body;

  if (!name) {
    return {
      statusCode: 400,
      message: "Missed name value"
    };
  }

  if (!surname) {
    return {
      statusCode: 400,
      message: "Missed surname value"
    };
  }
  if (!family) {
    return {
      statusCode: 400,
      message: "Missed family value"
    };
  }
  if (!phoneNumber) {
    return {
      statusCode: 400,
      message: "Missed phone number"
    };
  }
  if (!senderPostomat && !senderPostOffice) {
    return {
      statusCode: 400,
      message: "Missed post office or postomat number"
    };
  }

  try {
    const createSenderRes = await prisma.adminSender.create({
      data: {
        name: name,
        surname: surname,
        family: family,
        phoneNumber: phoneNumber,
        postOffice: senderPostOffice,
        postomat: senderPostomat
      }
    });
    console.log(createSenderRes);
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Something wewnt wrong ${err}`
    };
  }
});
