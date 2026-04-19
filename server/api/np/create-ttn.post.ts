import { prisma } from "@/prisma/prisma";
import NovaPoshtaApi from "@/server/services/novaPostApi";

interface IBodyType {
  orderId: string;
  payerType: string;
  selectedCargoType: string;
  weight: number;
  length: number;
  width: number;
  height: number;
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

interface IPayloadTtn {
  PayerType: string;
  PaymentMethod: "Cash" | "NonCash";
  CargoType: "Parcel" | "Documents" | string;

  Weight: string | number;
  Length: string | number;
  Width: string | number;
  Height: string | number;
  VolumeGeneral: string | number;

  ServiceType: "WarehouseWarehouse" | "WarehouseDoors" | "DoorsWarehouse" | "DoorsDoors";
  SeatsAmount: string | number;
  Description: string;

  Cost: string | number;

  CitySender: string;
  Sender: string;
  SenderAddress: string;
  ContactSender: string;
  SendersPhone: string;

  FirstName: string;
  LastName: string;
  RecipientsPhone: string;

  Recipient: string;
  ContactRecipient: string;
  CityRecipient: string;
  RecipientAddress: string;

  BackwardDeliveryData?: {
    PayerType: "Sender" | "Recipient";
    CargoType: "Money";
    RedeliveryString: string;
  }[];
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.new_post_api);

  const configSenderId = config.nova_post_sender_ref;
  const configContactSenderId = config.nova_post_contact_ref;

  const body = await readBody(event);
  const {
    orderId,
    payerType,
    selectedCargoType,
    weight,
    length,
    width,
    height,
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
    // backwardDeliveryData
  } = body as IBodyType;

  console.log(orderId, "orderId");

  const order = await prisma.order.findUnique({
    where: { orderNumber: orderId }
  });

  if (!order) {
    console.log("NO ORDER");
    throw createError({ statusCode: 404, message: "Order not found" });
  }

  const isCOD = order.paymentMethod === "cod";
  const prepayment = 200;

  console.log(isCOD, "IS COD");

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

  const payload: IPayloadTtn = {
    PayerType: payerType,
    PaymentMethod: "Cash",
    CargoType: selectedCargoType,
    //box value
    Weight: weight.toString(),
    Length: length.toString(),
    Width: width.toString(),
    Height: height.toString(),
    VolumeGeneral: ((length * width * height) / 1000000).toFixed(3),
    // VolumeGeneral: "0.001",

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

  if (isCOD) {
    const amountToPay = Math.max(order.totalPrice - prepayment, 0);

    payload.BackwardDeliveryData = [
      {
        PayerType: "Recipient",
        CargoType: "Money",
        RedeliveryString: amountToPay.toString()
      }
    ];
  }

  try {
    console.log("ok", payload);
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
    // return true;
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`
    };
  }
});
