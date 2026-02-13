import { prisma } from "@/prisma/prisma";
import NovaPoshtaApi from "@/server/services/novaPostApi";

interface IBodyType {
  cost: any;
  weight: any;
  citySender: any;
  cityRecipient: any;
  orderId: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.nova_post_api);

  const body = await readBody(event);
  const {
    // cost, weight, citySender, cityRecipient,
    orderId
  } = body as IBodyType;

  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order) {
    throw createError({ statusCode: 404, message: "Order not found" });
  }

  if (order.deliveryTtn) {
    throw createError({ statusCode: 400, message: "TTN already exist" });
  }

  if (!body) {
    return {
      statusCode: 404,
      message: "Body dont recieved"
    };
  }

  const payload = {
    PayerType: "Recipient",
    PaymentMethod: "Cash",
    CargoType: "Parcel",
    Weight: "1",
    ServiceType: "WarehouseWarehouse",
    SeatsAmount: "1",
    Description: "Online order",

    Cost: order.totalPrice,

    CitySender: "",
    Sender: "",
    SenderAdress: "",
    ContactSender: "",
    SendersPhone: "",

    FirstName: "",
    LastName: "",
    Phone: "",

    CityRecipient: "",
    RecipientAddress: ""
  };
  try {
    const ttnData = await np.getTtn(payload);

    console.log(ttnData);

    if (!ttnData.success) {
      throw createError({
        statusCode: 400,
        message: `Nova Poshta Error ${ttnData.error ?? ""}`
      });
    }

    // ORDER UPDATE

    return {
      statusCode: 200,
      message: "TTN Recieved",
      data: ttnData
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`
    };
  }
});
