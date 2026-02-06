import NovaPoshtaApi from "@/server/services/novaPostApi";

export default defineEventHandler(async (event) => {
  const { city } = await readBody(event);

  const config = useRuntimeConfig();

  const np = new NovaPoshtaApi(config.public.nova_post_uri, config.nova_post_api);

  try {
    const npData = await np.fetchCity(city);

    return {
      data: npData,
      statusCode: 200
    };
  } catch (err) {
    return {
      error: err,
      statusCode: 500
    };
  }
});
