import NovaPoshtaApi from "@/server/services/novaPostApi";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { firstName, lastName, phone } = body;

  const config = useRuntimeConfig();

  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.new_post_api);

  try {
    const counterPartyRes = await np.createCounterParty(firstName, lastName, phone);

    return {
      statusCode: 200,
      message: "Success",
      data: counterPartyRes
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
