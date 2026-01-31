import { defineStore } from "pinia";

export const useOrdersStore = defineStore("order", () => {
  const ordersList = ref([]);

  async function getOrders() {
    try {
      const resFetch = await $fetch<any>("/api/orders/getOrders", {
        method: "GET"
      });

      console.log(resFetch, "resFetch from store");
      ordersList.value = resFetch.data || [];
    } catch (err) {
      console.error(err);
    }
  }
  async function updateOrderStatus(id: string, status: string) {
    try {
      const resFetch = await $fetch<any>("/api/orders/[id].patch", {
        method: "PATCH",
        body: {
          id,
          status
        }
      });

      if (resFetch.statusCode === 200) {
        await getOrders();

        return resFetch;
      }
    } catch (err) {
      console.error(err);
    }
  }
  return {
    ordersList,
    updateOrderStatus,
    getOrders
  };
});
