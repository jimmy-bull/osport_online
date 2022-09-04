const sendPushNotification = (expoPushToken, messages) => {
  expoPushToken.forEach((element) => {
    if (element.token != "undefined") {
      const message = messages;
      axios({
        method: "POST",
        url: "https://exp.host/--/api/v2/push/send",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(message),
      })
        .then((res) => {
          console.log(res.data.data.status);
        })
        .catch((error) => console.log(error));
    }
  });
};

export default sendPushNotification;

