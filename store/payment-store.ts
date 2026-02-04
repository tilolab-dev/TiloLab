import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", () => {
  const paymentList = ref([]);

  async function getPayments() {
    try {
      const resFetch = await $fetch<any>("/api/payments/get-payments", {
        method: "GET"
      });

      console.log(resFetch, "resFetch from store");
      paymentList.value = resFetch.data || [];
      console.log(!paymentList.value, "Payments store getPayments paymentList is empty");
    } catch (err) {
      console.error(err);
    }
  }

  return {
    paymentList,
    getPayments
  };
});
