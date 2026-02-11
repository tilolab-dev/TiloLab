// eslint-disable-next-line no-unused-vars
export const useOrderRealtime = (onNewOrder: (order: any) => void) => {
  const supabase = useSupabaseClient();

  //   console.log(order, "order from useOrderRealtime");

  const channel = supabase
    .channel("admin-orders")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders"
      },
      (payload) => {
        console.log("enter");
        // console.log("New order", payload.new);
        // onNewOrder(payload.new);
        const oldStatus = payload.old?.status;
        const newStatus = payload.new?.status;

        console.log(oldStatus, newStatus, "status");

        if (oldStatus !== "PAID" && newStatus === "PAID") {
          onNewOrder(payload.new);
        }
      }
    )
    .subscribe((status) => {
      console.log("Channel status", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
};
