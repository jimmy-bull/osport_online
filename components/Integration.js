import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import _GLobal_Link from "../components/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Integration({ navigation, route }) {
  const [tokens, settokens] = useState(null);
  const [integrationTable, setintegrationTable] = useState(null);
  const element = useRef([]);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [userName, setuserName] = useState("");
  const [connected_user, setconnected_user] = useState(null);
  const [who, setwho] = useState(null);
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
  useEffect(() => {
    if (tokens != null) {
      axios
        .get(_GLobal_Link._link_simple + "api/getteammembers/" + tokens, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setintegrationTable(res.data);
        })
        .catch((error) => console.log(error));
      axios
        .get(_GLobal_Link._link_simple + "api/getUserName/" + tokens, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setuserName(res.data[0].name + " " + res.data[0].lastname);
        })
        .catch((error) => console.log(error));

      axios
        .get(`${_GLobal_Link._link_simple}api/getCurrentUsermail/${tokens}`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setconnected_user(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [tokens]);

  const accepted = (data, el, sport_name, who_want_to_join) => {
    axios
      .get(
        _GLobal_Link._link_simple + "api/acceptemembers/" + data + "/" + tokens,
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        }
      )
      .then((res) => {
        el.setNativeProps({
          display: "none",
        });
        axios
          .get(_GLobal_Link._link_simple + "api/getteammembers/" + tokens, {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          })
          .then((res) => {
            //
            if (Object.values(res.data).length == 0)
              setintegrationTable(res.data);
            //console.log(Object.values(res.data).length);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    axios
      .get(
        _GLobal_Link._link_simple +
          "api/getNotifTokens/" +
          tokens +
          "/" +
          who_want_to_join,
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        }
      )
      .then((res) => {
        res.data.forEach((element) => {
          if (element.token != "undefined") {
            const message = {
              to: element.token,
              sound: "default",
              title: "Demande d'intégration",
              body:
                userName +
                " a accepté(e) votre demande d'intégration dans son équipe " +
                sport_name +
                "!",
              data: {
                tonavigate: "no",
                who: who_want_to_join,
                token: tokens,
                notification_actions: "no_actions",
                message:
                  userName +
                  " a accepté(e) votre demande d'intégration dans son équipe " +
                  sport_name +
                  "!",
                who_sent: connected_user,
              },
            };
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
      })
      .catch((error) => console.log(error));
  };

  const declined = (data, el, sport_name, who_want_to_join) => {
    axios
      .get(
        _GLobal_Link._link_simple +
          "api/declinedmembers/" +
          data +
          "/" +
          tokens,
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        }
      )
      .then((res) => {
        el.setNativeProps({
          display: "none",
        });
        axios
          .get(_GLobal_Link._link_simple + "api/getteammembers/" + tokens, {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          })
          .then((res) => {
            //
            if (Object.values(res.data).length == 0)
              setintegrationTable(res.data);
            //console.log(Object.values(res.data).length);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    axios
      .get(
        _GLobal_Link._link_simple +
          "api/getNotifTokens/" +
          tokens +
          "/" +
          who_want_to_join,
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        }
      )
      .then((res) => {
        res.data.forEach((element) => {
          if (element.token != "undefined") {
            const message = {
              to: element.token,
              sound: "default",
              title: "Demande d'intégration",
              body:
                userName +
                " a refusé(e) votre demande d'intégration dans son équipe " +
                sport_name +
                "!",
              data: {
                tonavigate: "no",
                who: who_want_to_join,
                token: tokens,
                notification_actions: "no_actions",
                message:
                  userName +
                  " a refusé(e) votre demande d'intégration dans son équipe " +
                  sport_name +
                  "!",
                who_sent: connected_user,
              },
            };
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
      })
      .catch((error) => console.log(error));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {integrationTable != null &&
        Object.values(integrationTable).length > 0 ? (
          Object.values(integrationTable).map((data, key) => {
            return (
              <View
                style={{
                  marginBottom: 0,
                  borderWidth: 0.5,
                  padding: 15,
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: "lightgray",
                  marginBottom: 20,
                }}
                key={key}
                ref={(el) => (element.current[key] = el)}
              >
                <View
                  style={{
                    //   paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        backgroundColor: "lightgray",
                        position: "relative",
                        zIndex: 1,
                        resizeMode: "cover",
                        borderRadius: 35,
                      }}
                      defaultSource={require("../image/wainting.png")}
                      source={{
                        uri:
                          _GLobal_Link._link_simple +
                          data.image.replace("public", "storage"),
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ width: "70%" }}>
                    <Text
                      style={{
                        color: "darkgray",
                        alignItems: "center",
                        zIndex: 3,
                      }}
                    >
                      {data.message}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 120,
                      borderRadius: 5,
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      backgroundColor: "#4399fe",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      accepted(
                        data.id,
                        element.current[key],
                        data.team_to_join,
                        data.who_want_to_join
                      );
                    }}
                  >
                    <Text style={{ color: "white", margin: 5 }}>Accepter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 120,
                      borderRadius: 5,
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      backgroundColor: "whitesmoke",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      declined(
                        data.id,
                        element.current[key],
                        data.team_to_join,
                        data.who_want_to_join
                      );
                    }}
                  >
                    <Text style={{ color: "gray", margin: 5 }}>Refuser</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View>
            <View
              style={{
                borderRadius: 5,
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: "whitesmoke",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "gray", margin: 5 }}>
                Vous n'avez pas de demande d'intégration
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
