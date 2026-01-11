import NovaPoshtaApi from "@/server/services/novaPostApi";

export default defineEventHandler(async (event) => {
  const { cityName, postomatNumber } = await readBody(event);

  const config = useRuntimeConfig();

  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.nova_post_api);

  try {
    const postomatNumberById = await np.fetchPostomatsByNumber(cityName, postomatNumber);

    return {
      data: postomatNumberById,
      statusCode: 200
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: err
    };
  }
});
