import PostalServiceApi from "./postalServicesApi";

interface IPayloadTtn {
  PayerType: string;
  PaymentMethod: string;
  CargoType: string;
  VolumeGeneral: string | number;
  Weight: string | number;
  ServiceType: string;
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

    return await this.request("", {
      method: "POST",
      body
    });
  }

  async getSenderProperty(counterpartyId: string) {
    const body = {
      apiKey: this.apiKey,
      modelName: "Counterparty",
      calledMethod: "getCounterpartyContactPersons",
      methodProperties: {
        Ref: counterpartyId
      }
    };

    return await this.request("", {
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

    return await super.request("", {
      method: "POST",
      body
    });
  }

  async createCounterParty(firstName: string, lastName: string, phone: string) {
    const body = {
      apiKey: this.apiKey,
      modelName: "Counterparty",
      calledMethod: "save",
      methodProperties: {
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Email: "",
        CounterpartyType: "PrivatePerson",
        CounterpartyProperty: "Recipient"
      }
    };

    return await this.request("", {
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

    return await this.request("", {
      method: "POST",
      body
    });
  }

  async createContactPerson(
    firstName: string,
    lastName: string,
    phone: string,
    counterPartyId: string
  ) {
    const body = {
      apiKey: this.apiKey,
      modelName: "ContactPerson",
      calledMethod: "save",
      methodProperties: {
        CounterpartyRef: counterPartyId,
        FirstName: firstName,
        LastName: lastName,
        Phone: phone
      }
    };

    return await this.request("", {
      method: "POST",
      body
    });
  }

  async createTtn(payload: IPayloadTtn) {
    console.log(payload, "payload");
    const body = {
      apiKey: this.apiKey,
      modelName: "InternetDocument",
      calledMethod: "save",
      methodProperties: payload
    };

    return await this.request("", {
      method: "POST",
      body
    });
  }
}
