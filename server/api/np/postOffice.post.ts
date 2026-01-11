import NovaPoshtaApi from "@/server/services/novaPostApi";

export default defineEventHandler(async (event) => {
  const { cityName, postNumber } = await readBody(event);

  const config = useRuntimeConfig();

  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.nova_post_api);

  try {
    const postOfficeData = await np.fetchOfficeByNumber(cityName, postNumber);

    return {
      data: postOfficeData,
      statusCode: 200
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: err
    };
  }
});
