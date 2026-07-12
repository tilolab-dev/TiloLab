export async function sendSms(phone: string, message: string) {
  const config = useRuntimeConfig();

  try {
    const payload = {
      phone: [phone.replace(/\D/g, "")],
      message,
      // src_addr: config.smsclubSender,
      src_addr: "Zamovlennia"
    };

    console.log("SMS payload:", payload);

    return await $fetch("https://im.smsclub.mobi/sms/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.smsclubToken}`,
        "Content-Type": "application/json"
      },
      body: payload
    });
  } catch (error: any) {
    console.error("SMSClub error:");
    console.error(error.data);
    console.error(error.response?._data);
    throw error;
  }
}
