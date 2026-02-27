import NovaPoshtaApi from "@/server/services/novaPostApi";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { firstName, lastName, phone, counterPartyId } = body;

  const config = useRuntimeConfig();

  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.new_post_api);

  // const counterPartyId = config.nova_post_sender_ref;

  // console.log(firstName, lastName, phone);

  try {
    const contactPersonRes = await np.createContactPerson(
      firstName,
      lastName,
      phone,
      counterPartyId
    );

    console.log("resDATA contactPersonRes", contactPersonRes);

    return {
      statusCode: 200,
      message: "Success",
      data: contactPersonRes
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      message: `Something went wrong ${err}`,
      data: []
    };
  }
});
