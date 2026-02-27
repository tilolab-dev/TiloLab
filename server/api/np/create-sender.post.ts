import { prisma } from "@/prisma/prisma";

interface ISender {
  name: string;
  surname: string;
  family: string;
  phoneNumber: string;
  senderCity: string;
  senderPostOffice?: string | null;
  senderPostomat?: string | null;
  cityId: string;
  counterPartyId: string;
  contactPersonId: string;
  postAddressId: string;
}
export default defineEventHandler(async (event) => {
  const body = await readBody<ISender>(event);

  const {
    name,
    surname,
    family,
    phoneNumber,
    senderCity,
    senderPostOffice,
    senderPostomat,
    cityId,
    // counterPartyId,
    // contactPersonId,
    postAddressId
  } = body;

  const config = useRuntimeConfig();

  const counterPartyId = config.nova_post_sender_ref;

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
  if (!senderCity) {
    return {
      statusCode: 400,
      message: "Sender city required"
    };
  }
  if (!senderPostOffice) {
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
        city: senderCity,
        phoneNumber: phoneNumber,
        postOffice: senderPostOffice,
        postomat: senderPostomat,
        NPcityId: cityId,
        NPsenderId: counterPartyId,
        NPsenderAddressId: postAddressId,
        NPcontactSenderId: counterPartyId
      }
    });
    console.log(createSenderRes);

    return {
      statusCode: 200,
      message: "Success"
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`
    };
  }
});
