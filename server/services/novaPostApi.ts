import PostalServiceApi from "./postalServicesApi";

export default class NovaPoshtaApi extends PostalServiceApi {
  // constructor() {
  //   // const config = useRuntimeConfig();

  //   constructor(private baseURL: string);
  // }
  constructor(baseUrl: string, apiKey: string) {
    super(baseUrl, apiKey);
  }

  override fetchCity(cityName: string) {
    // console.log(0);
    // console.log(this.baseUrl, this.apiKey);
    return super.fetchCity(cityName, "AddressGeneral", "searchSettlements");
  }

  async fetchPostomats(cityName: string) {
    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        CategoryOfWarehouse: "Postomat",
        Page: "1"
      }
    };

    return super.request("", {
      method: "POST",
      body
    });
  }

  async fetchOfficeByNumber(cityName: string, number: number | string) {
    console.log(cityName, number);
    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        WarehouseId: number,
        Page: "1"
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }

  async fetchPostAddresses(cityName: string) {
    // "CategoryOfWarehouse" : "Branch",

    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "3000",
        Page: "1"
      }
    };

    return super.request("", {
      method: "POST",
      body
    });
  }

  async fetchPostomatsByNumber(cityName: string, number: number | string) {
    console.log(cityName, number);
    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        CategoryOfWarehouse: "Postomat",
        FindByString: number,
        Page: "1"
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }
}
