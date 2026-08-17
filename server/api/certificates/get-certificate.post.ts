import { defineEventHandler, readBody } from "h3";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const { certificateCode } = await readBody(event);

  if (!certificateCode) {
    throw createError({
      statusCode: 400,
      data: {
        message: "Відсутній код сертифіката"
      }
    });
  }

  try {
    const certificate = await prisma.giftCertificate.findUnique({
      where: { code: certificateCode }
    });

    if (!certificate) {
      throw createError({
        statusCode: 404,
        data: {
          message: "Сертифікат не знайдено"
        }
      });
    }

    if (certificate.status === "USED") {
      throw createError({
        statusCode: 405,
        data: {
          message: "Сертифікат вже використано"
        }
      });
    }

    console.log(certificate, "certificate");

    return {
      statusCode: 200,
      statusMessage: "Certificate found",
      data: {
        code: certificate.code,
        amount: certificate.amount,
        status: certificate.status
      }
    };
  } catch (error: any) {
    // console.error("Error fetching certificate:", error);
    // const message = error instanceof Error ? error.message : String(error);

    console.error("Error fetching certificate:", error);

    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});
