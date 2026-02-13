import PostalServiceApi from "./postalServicesApi";

interface IPayloadTtn {
  PayerType: string;
  PaymentMethod: string;
  CargoType: string;
  Weight: string | number;
  ServiceType: string;
  SeatsAmount: string | number;
  Description: string;

  Cost: string | number;

  CitySender: string;
  Sender: string;
  SenderAdress: string;
  ContactSender: string;
  SendersPhone: string;

  FirstName: string;
  LastName: string;
  Phone: string;

  CityRecipient: string;
  RecipientAddress: string;
}
export default class NovaPoshtaApi extends PostalServiceApi {
  constructor(baseUrl: string, apiKey: string) {
    super(baseUrl, apiKey);
  }

  override fetchCity(cityName: string) {
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

  async getTtn(payload: IPayloadTtn) {
    const body = {
      apiKey: this.apiKey,
      modelName: "InternetDocument",
      calledMethod: "save",
      methodProperties: payload
    };

    return this.request("", {
      method: "POST",
      body
    });
  }
}
