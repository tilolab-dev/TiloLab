export default defineEventHandler(async () => {
  const res = await $fetch("https://api.monobank.ua/api/merchant/pubkey", {
    headers: {
      "X-Token": process.env.BANK_API_KEY!
    }
  });

  return res;
});
