import { prisma } from "@/prisma/prisma";
import NovaPoshtaApi from "@/server/services/novaPostApi";

interface IBodyType {
  orderId: string;
  senderCityId: string;
  // senderContactId: string;
  senderAddressId: string;
  // senderId: string;
  senderPhoneNumber: string;
  recipientCityId: string;
  recipientWarehouseId: string;
  recipientName: string;
  recipientLastName: string;
  recipientPhone: string;
  recipientId: string;
  recipientContactId: string;
  orderPrice: string | number;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.new_post_api);

  const configSenderId = config.nova_post_sender_ref;
  const configContactSenderId = config.nova_post_contact_ref;

  const body = await readBody(event);
  const {
    orderId,
    senderCityId,
    // senderContactId,
    senderAddressId,
    // senderId,
    senderPhoneNumber,
    recipientCityId,
    recipientWarehouseId,
    recipientName,
    recipientLastName,
    recipientPhone,
    recipientId,
    recipientContactId,
    orderPrice
  } = body as IBodyType;

  console.log(orderId, "orderId");

  const order = await prisma.order.findUnique({
    where: { orderNumber: orderId }
  });

  if (!order) {
    console.log("NO ORDER");
    throw createError({ statusCode: 404, message: "Order not found" });
  }

  // if (order.deliveryTtn) {
  //   throw createError({ statusCode: 400, message: "TTN already exist" });
  // }

  if (!body) {
    console.log("NO BODY");
    return {
      statusCode: 404,
      message: "Body dont recieved"
    };
  }

  const payload = {
    PayerType: "Recipient",
    PaymentMethod: "Cash",
    CargoType: "Parcel",
    Weight: "0.1",
    VolumeGeneral: "0.001",
    Length: "10",
    Width: "10",
    Height: "10",
    ServiceType: "WarehouseWarehouse",
    SeatsAmount: "1",
    Description: `Інтернет замовлення ${orderId}`,

    Cost: orderPrice,

    CitySender: senderCityId,
    Sender: configSenderId,
    SenderAddress: senderAddressId,
    // ContactSender: configSenderId,
    ContactSender: configContactSenderId,
    SendersPhone: senderPhoneNumber,

    FirstName: recipientName,
    LastName: recipientLastName,
    RecipientsPhone: recipientPhone,

    Recipient: recipientId,
    ContactRecipient: recipientContactId,
    CityRecipient: recipientCityId,
    RecipientAddress: recipientWarehouseId
  };
  try {
    console.log("start request");
    const ttnData = await np.createTtn(payload);

    console.log(ttnData, "ttnData");

    // if (!ttnData.success) {
    //   throw createError({
    //     statusCode: 400,
    //     message: `Nova Poshta Error ${ttnData.error ?? ""}`
    //   });
    // }

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
