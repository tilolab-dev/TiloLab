export default class PostalServiceApi {
  baseUrl: string;
  apiKey: string;
  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async request(endpoint: string, options: any = {}) {
    try {
      const res: any = await $fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!res.success) {
        console.log("NP errors:", res.errors);
        throw new Error(res.errors?.join(", "));
      }

      return res.data;
    } catch (err: any) {
      console.log("Nova Poshta error:", err?.message || err);
      return null;
    }
  }

  async fetchCity(cityName: string, modelName: string, calledMethod: string) {
    const body = {
      apiKey: this.apiKey,
      modelName,
      calledMethod,
      methodProperties: {
        CityName: cityName,
        Limit: "500",
        Page: "1"
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }

  async fetchWarehouses(
    cityName: string,
    modelName: string,
    calledMethod: string,
    extraParams = {}
  ) {
    const body = {
      apiKey: this.apiKey,
      modelName,
      calledMethod,
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        CategoryOfWarehouse: "Postomat",
        Page: "1",
        ...extraParams
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }
}
