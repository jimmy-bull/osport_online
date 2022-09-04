import React, { useState, useEffect } from "react";
import axios from "axios";
import _GLobal_Link from "../components/global";
const [tokens, settokens] = useState(null);
const getData = async () => {
  try {
    const token = await AsyncStorage.getItem("Token");
    if (token != null) {
      settokens(token);
    }
  } catch (e) {
    console.log(e);
  }
};
useEffect(() => {
  getData();
}, []);
const pushToken = () => {
  axios
    .get(
      _GLobal_Link._link_simple +
        "api/getNotifTokens" +
        "/" +
        tokens +
        "/" +
        who,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

export default pushToken;
