// eslint-disable-next-line no-unused-vars
export const useOrderRealtime = (onNewOrder: (order: any) => void) => {
  const supabase = useSupabaseClient();

  //   console.log(order, "order from useOrderRealtime");

  const channel = supabase
    .channel("admin-orders")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "orders"
      },
      (payload) => {
        console.log("New order", payload.new);
        onNewOrder(payload.new);
      }
    )
    .subscribe((status) => {
      console.log("Channel status", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
};
