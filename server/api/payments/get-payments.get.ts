import { defineEventHandler } from "h3";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  //   console.log("GET PAYMENTS");
  try {
    const getPayments = await prisma.payment.findMany();

    // console.log(getPayments, "getPayments");
    return {
      statusCode: 200,
      data: getPayments
    };
  } catch (err) {
    console.error("ERROR PAYMENTS FETCHING", err);
    return createError({
      statusCode: 500,
      statusMessage: "Error fetching payments"
    });
  }
});
