export async function sendTelegramMessage(text: string) {
  const config = useRuntimeConfig();

  const token = config.telegram_token;
  const chatId = config.telegram_chat_id;

  await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    body: {
      chat_id: chatId,
      text
    }
  });
}
