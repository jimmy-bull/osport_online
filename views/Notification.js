import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  FlatList,
  Animated,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import axios from "axios";
import Moment from "moment";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _GLobal_Link from "../components/global";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { object } from "yup";
import { useDispatch } from "react-redux";
import { _notification } from "../features/notificationSlice";

export default function Notification({ navigation }) {
  const socket = useRef();
  const flat = useRef();
  const [notifications, setNotifications] = useState([]);
  const [page, setpage] = useState(0);
  const [tokens, settokens] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // const fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 5000,
  //   }).start();
  // };

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 3 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 3000,
  //   }).start();
  // };

  const [fadeAnim, setfadeAnim] = useState(0);
  const [isloading, setisloading] = useState(false);
  const [update, setupdate] = useState(0);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
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
  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return "Il y a " + Math.round(elapsed / 1000) + " secondes";
    } else if (elapsed < msPerHour) {
      return "Il y a " + Math.round(elapsed / msPerMinute) + " minutes";
    } else if (elapsed < msPerDay) {
      return "Il y a " + Math.round(elapsed / msPerHour) + " heures";
    } else if (elapsed < msPerMonth) {
      return "Il y a " + Math.round(elapsed / msPerDay) + " jours";
    } else if (elapsed < msPerYear) {
      return "Il y a " + Math.round(elapsed / msPerMonth) + " Mois";
    } else {
      return "Il y a " + +Math.round(elapsed / msPerYear) + " années";
    }
  }

  // useEffect(() => {
  //   socket.current = io("http://192.168.43.142:3000");
  //   socket.current.on("connection"); // https://sheltered-retreat-62433.herokuapp.com
  //   socket.current.on("sendNotifToClient", (message) => {
  //     console.log("need to reload");
  //   });
  // }, []);
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // axios
        //   .get(
        //     `${_GLobal_Link._link_simple}api/addRealtimeNotif/${notification.request.content.data.token}
        //     /${notification.request.content.data.message}/
        //     ${notification.request.content.data.notification_actions}
        // /${notification.request.content.data.who}`,
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Origin": true,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     //  setcountNotification(res.data);
        //     console.log("need to relaod");
        //   })
        //   .catch((error) => console.log(error));
        setfadeAnim(1);
        setTimeout(() => {
          setfadeAnim(0);
        }, 3000);
      });
    // const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
    // TaskManager.defineTask(
    //   BACKGROUND_NOTIFICATION_TASK,
    //   ({ data, error, executionInfo }) => {
    //     console.log("Received a notification in the background!");
    //     // Do something with the notification data
    //   }
    // );

    // Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //    // console.log(response);
    //     // alert("ok");
    //   });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      //  Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    //GET NOTFIF WITOUT REALTIME FEATURES
    if (tokens != null) {
      // setpage(0);
      setisloading(true);
      axios
        .get(`${_GLobal_Link._link_simple}api/getRealtimeNotif/${tokens}/0`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setNotifications([res.data]);
          setisloading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [tokens, update]);

  useEffect(() => {
    axios
      .get(`${_GLobal_Link._link_simple}api/markNotifasreaded/${tokens}`, {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((res) => {
        dispatch(_notification(res.data));
      })
      .catch((error) => console.log(error));
  });
  const follow_actions = (email) => {
    navigation.navigate("Profile", {
      who: email,
    });
    //alert(email);
  };
  const renderFlatlist = ({ item }) => (
    <>
      {Object.values(item).map((data, key) => (
        <View style={{ flex: 1 }} key={key}>
          <View style={{ flex: 1, padding: 10 }}>
            <View
              style={{
                marginBottom: 0,
                borderWidth: 0.5,
                padding: 15,
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: "lightgray",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",

                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
                onPress={() => {
                  if (
                    data.notification_actions.toString().trim() ==
                    "follow_actions"
                  ) {
                    follow_actions(data.email);
                  } else if (
                    data.notification_actions.toString().trim() ==
                    "integration_actions"
                  ) {
                    // follow_actions(data.email);
                    navigation.navigate("Integration");
                  } else if (
                    data.notification_actions.toString().trim() ==
                    "GameAsked_actions"
                  ) {
                    // follow_actions(data.email);
                    navigation.navigate("GameAsked");
                  } else if (
                    data.notification_actions.toString().trim() == "no_actions"
                  ) {
                    // follow_actions(data.email);
                    Alert.alert("information", data.message, [
                      {
                        text: "Fermer",
                        style: "cancel",
                      },
                    ]);
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    alignContent: "center",
                    maxWidth: "70%",
                  }}
                >
                  {data.image != null ? (
                    <Image
                      style={{
                        minHeight: 30,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        resizeMode: "cover",
                        aspectRatio: 5 / 5,
                        backgroundColor: "lightgray",
                      }}
                      source={{
                        uri:
                          _GLobal_Link._link_simple +
                          data.image.replace("public", "storage"),
                      }}
                    />
                  ) : (
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 60,
                        backgroundColor: "lightgray",
                        borderRadius: 30,
                        height: 60,
                      }}
                      source={require("../image/placeholder.jpeg")}
                    />
                  )}
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        // letterSpacing: 1.2,
                      }}
                      numberOfLines={1}
                    >
                      {data.lastname + " " + data.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        color: "gray",
                        fontSize: 15,
                        fontWeight: "400",
                      }}
                      numberOfLines={2}
                    >
                      {data.message}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center", alignContent: "center" }}>
                  {data.notification_actions != null ? (
                    data.notification_actions.toString().trim() ==
                    "follow_actions" ? (
                      <Image
                        style={{
                          resizeMode: "contain",
                          aspectRatio: 5 / 5,
                        }}
                        source={require("../assets/follower.png")}
                      />
                    ) : data.notification_actions.toString().trim() ==
                      "integration_actions" ? (
                      <Image
                        style={{
                          resizeMode: "contain",
                          aspectRatio: 5 / 5,
                        }}
                        source={require("../assets/integration.png")}
                      />
                    ) : data.notification_actions.toString().trim() ==
                      "GameAsked_actions" ? (
                      <Image
                        style={{
                          resizeMode: "contain",
                          aspectRatio: 5 / 5,
                        }}
                        source={require("../assets/games.png")}
                      />
                    ) : data.notification_actions.toString().trim() ==
                      "no_actions" ? (
                      <Image
                        style={{
                          resizeMode: "contain",
                          aspectRatio: 5 / 5,
                        }}
                        source={require("../assets/information.png")}
                      />
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableOpacity>
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={{ marginTop: 5, color: "gray", fontSize: 12 }}>
                  {timeDifference(new Date(), new Date(data.created_at))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </>
  );

  const loadMore = () => {
    setisloading(true);
    setpage((prev) => prev + 10);
  };
  useEffect(() => {
    if (page > 0) {
      if (tokens != null) {
        axios
          .get(
            `${_GLobal_Link._link_simple}api/getRealtimeNotif/${tokens}/${page}`,
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,
              },
            }
          )
          .then((res) => {
            if (Object.values(res.data).length > 0) {
              setNotifications((prev) => {
                return [...prev, res.data];
              });
            }
            setisloading(false);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [page]);
  const renderFooter = () => (
    <View
      style={{
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator animating={isloading} size="large" color="#4399fe" />
    </View>
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    if (tokens != null) {
      axios
        .get(`${_GLobal_Link._link_simple}api/getRealtimeNotif/${tokens}/0`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setNotifications([res.data]);
          setfadeAnim(0);
          setpage(0);
          setRefreshing(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          marginTop: 10,
          zIndex: 1000,
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setfadeAnim(0),
              setupdate((prev) => prev + 1),
              flat.current.scrollToOffset({ animated: true, offset: 0 });
          }}
        >
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "black",
              color: "white",
              padding: 10,
              borderRadius: 5,
              position: "relative",
              fontWeight: "bold",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                backgroundColor: "black",
                color: "white",
                position: "relative",
                fontWeight: "bold",
              }}
            >
              Nouvelle notification
            </Text>

            <Text style={{ color: "white", fontSize: 10, alignSelf: "center" }}>
              {" "}
              (appuyer pour charger)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flat}
        style={{
          padding: 10,
          marginTop: 5,
          paddingBottom: 0,
          flex: 1,
        }}
        data={notifications}
        renderItem={renderFlatlist}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4399fe"
          />
        }
      />
    </SafeAreaView>
  );
}
