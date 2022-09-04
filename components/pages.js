import React, { useEffect, useState, useRef } from "react";

import { StatusBar } from "expo-status-bar";
import axios from "axios";
import Video_Components from "../views/Video";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ConfirmMail from "../views/ConfirmMail";
import { useSelector } from "react-redux";
import _GLobal_Link from "./global";
import Home from "../views/Home";
import Setting from "../views/Setting";
import Message from "../views/Message";
import Post from "../views/Post";
import Notification from "../views/Notification";
import { AntDesign as IconAnt, Feather as Icon } from "@expo/vector-icons";
import Profile from "../views/Profile";
import TeamPage from "../views/TeamPage";
import GameAsked from "../views/GameAsked";
import ImageModificator from "./imageModifator";
import Team from "./team";
import Friends from "./friend";
import CurrentTeam from "../views/CurrentTeam";
import PostBeforeModification from "./postBeforeModification";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopBar = createMaterialTopTabNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendSearchResult from "./friendSearchResult";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as TaskManager from "expo-task-manager";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  _notification,
  __last_Id_for_teammember,
} from "../features/notificationSlice";
import Integration from "./Integration";

export default function Pages({ navigation }) {
  const isLogged = useSelector((state) => state.login.islogin);
  const [goodToken, setgoodToken] = useState(false);
  const [goodToken_Text, setgoodToken_Text] = useState(null);
  const socket = useRef();
  const navRef = useRef();
  //
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");

      if (token != null) {
        // console.log(token);
        setgoodToken_Text(token);
        axios
          .post(_GLobal_Link._link_simple + "api/connected/" + token, {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
              "X-CSRF-TOKEN":
                "FO8NrbEjBKM73orM5NbemvwGiFyis8krYcy5MwAYz7BwkoWf1n09oMr6D36iFuHlSGOlFqOvoeWDsCntiIEOX8GZpIP3LglDbbCH",
            },
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data == "Already connected") {
              setgoodToken(true);
              registerForPushNotificationsAsync().then((Notiftoken) => {
                axios
                  .get(
                    _GLobal_Link._link_simple +
                      "api/adnotif" +
                      "/" +
                      Notiftoken +
                      "/" +
                      token,
                    {
                      headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": true,
                      },
                    }
                  )
                  .then((res) => {
                    // console.log(res.data);
                  })
                  .catch((error) => console.log(error));
              });
            } else {
              setgoodToken(false);
            }
          })
          .catch((error) => console.log(error));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const [countNotification, setcountNotification] = useState(0);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    socket.current = io("http://192.168.43.142:3000");
  }, []);

  useEffect(() => {
    // // socket.current = io("http://192.168.43.142:3000");
    // socket.current.on("connection"); // https://sheltered-retreat-62433.herokuapp.com
    // socket.current.on("sendNotifToClient", (message) => {
    //   if (message.length > 0) {
    //     axios
    //       .get(
    //         `${_GLobal_Link._link_simple}api/addRealtimeNotif/${message[0].token}/${message[0].message}/${message[0].notification_actions}
    //     /${message[0].who}`,
    //         {
    //           headers: {
    //             "content-type": "application/json",
    //             "Access-Control-Allow-Credentials": true,
    //             "Access-Control-Allow-Origin": true,
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         //  alert("jimmy");
    //         //  setcountNotification(1);
    //         //   console.log(res.data);
    //       })
    //       .catch((error) => console.log(error));
    //     message = [];
    //   }
    // });
  }, []);
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        //setNotification(notification); //
        axios
          .get(
            `${_GLobal_Link._link_simple}api/addRealtimeNotif/${notification.request.content.data.token}
            /${notification.request.content.data.message}/
            ${notification.request.content.data.notification_actions}
        /${notification.request.content.data.who}/${notification.request.content.data.who_sent}`,
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,
              },
            }
          )
          .then((res) => {
            if (
              notification.request.content.data.notification_actions
                .toString()
                .trim() == "integration_actions"
            ) {
              // console.log(res.data[0]);
              dispatch(_notification(res.data[1]));
              // dispatch(__last_Id_for_teammember(res.data[0]));
              axios
                .get(
                  _GLobal_Link._link_simple +
                    "api/joinATeam/" +
                    notification.request.content.data.team__ +
                    "/" +
                    notification.request.content.data.who +
                    "/" +
                    notification.request.content.data.token +
                    "/" +
                    res.data[0],

                  {
                    headers: {
                      "content-type": "application/json",
                      "Access-Control-Allow-Credentials": true,
                      "Access-Control-Allow-Origin": true,
                    },
                  }
                )
                .then((res) => {
                  // alert(notification.request.content.team);
                  // console.log(res.data);
                  // // notificationComponents();
                })
                .catch((error) => console.log(error));
            } else {
              dispatch(_notification(res.data));
            }
          })
          .catch((error) => console.log(error));
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
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          response.notification.request.content.data.notification_actions
        ); //
        axios
          .get(
            `${_GLobal_Link._link_simple}api/markNotifasreaded/${response.notification.request.content.data.token}`,
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,
              },
            }
          )
          .then((res) => {
            dispatch(_notification(res.data));
          })
          .catch((error) => console.log(error));
        if (
          response.notification.request.content.data.notification_actions
            .toString()
            .trim() == "follow_actions"
        ) {
          // console.log(response.notification.request.content.data.who_sent);
          navRef.current.navigate("Profile", {
            who: response.notification.request.content.data.who_sent,
          });
        } else if (
          response.notification.request.content.data.notification_actions
            .toString()
            .trim() == "integration_actions"
        ) {
          navRef.current.navigate("Integration");
        }
        else if (
          response.notification.request.content.data.notification_actions
            .toString()
            .trim() == "GameAsked_actions"
        ) {
          navRef.current.navigate("GameAsked");
        }
        else if (
          response.notification.request.content.data.notification_actions
            .toString()
            .trim() == "no_actions"
        ){
          navRef.current.navigate("Notification");
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (goodToken_Text != null) {
      axios
        .get(
          `${_GLobal_Link._link_simple}api/getRealtimeNotif_count/${goodToken_Text}`,
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((res) => {
          // setcountNotification(res.data);
          dispatch(_notification(res.data));
        })
        .catch((error) => console.log(error));
    }
  }, [goodToken_Text]);
  function AllTabnavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // tabBarShowLabel: false,
          tabBarIcon: null,
          headerShown: false,

          tabBarItemStyle: {
            // height: 50,
          },
          tabBarStyle: {
            // position: "absolute",
            // bottom: 25,
            // left: 15,
            // right: 15,
            // elevation: 0,
            // borderRadius: 15,
            // height: 50,
            // paddingBottom: 3,
            // backgroundColor:"red",
            alignItems: "center",
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Post") {
              iconName = "plus-square";
            } else if (route.name === "Message") {
              iconName = "mail";
            } else if (route.name === "Réglage") {
              iconName = "settings";
            } else if (route.name === "Search") {
              iconName = "search";
            }
            // You can return any component that you like here!
            return (
              <Icon
                name={iconName}
                style={{ top: 0 }}
                size={iconName == "plus-square" ? 20 : 20}
                color={focused ? "gray" : "black"}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ title: "" }} />
        <Tab.Screen
          name="Message"
          component={Message}
          options={{ title: "" }}
        />
        <Tab.Screen name="Post" component={Post} options={{ title: "" }} />
        {/* <Tab.Screen
          name="Notification"
          options={{ tabBarBadge: countNotification }}
          component={Notification}
        /> */}

        <Tab.Screen
          options={{
            headerTitle: "Rechercher",
            headerShown: true,
            headerBackTitle: "Retour",
            headerStyle: { backgroundColor: "white" },
            title: "",
          }}
          name="Search"
          component={Search}
        />
        <Tab.Screen
          name="Réglage"
          component={Setting}
          options={{ title: "" }}
        />
      </Tab.Navigator>
    );
  }
  function Search() {
    return (
      <TopBar.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: "white",
          },

          //tabBarLabelStyle: { fontSize: 12,color:"red" },
        }}
      >
        <TopBar.Screen name="Un ami" component={FriendSearchResult} />
        <TopBar.Screen name="Une équipe" component={Team} />
      </TopBar.Navigator>
    );
  }
  return (
    <NavigationContainer ref={navRef}>
      {isLogged || goodToken ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeScreen" component={AllTabnavigator} />
          <Stack.Screen name="Video" component={Video_Components} />
          <Stack.Screen
            options={{
              headerTitle: "Profil",
              headerShown: true,
              headerBackTitle: "Retour",
              headerStyle: { backgroundColor: "white" },
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{
              headerTitle: "Equipes",
              headerShown: true,
              headerBackTitle: "Retour",
              headerStyle: { backgroundColor: "white" },
            }}
            name="TeamPage"
            component={TeamPage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Demandes de match",
              headerShown: true,
              headerBackTitle: "Retour",
              headerStyle: { backgroundColor: "white" },
            }}
            name="GameAsked"
            component={GameAsked}
          />
          <Stack.Screen
            options={{
              headerTitle: "Demandes d'intégration",
              headerShown: true,
              headerBackTitle: "Retour",
              headerStyle: { backgroundColor: "white" },
            }}
            name="Integration"
            component={Integration}
          />
          <Stack.Screen
            options={{
              // headerTitle: "Rechercher",
              headerShown: true,
              headerBackTitle: "Retour",
              headerStyle: { backgroundColor: "white" },
            }}
            name="Notification"
            component={Notification}
          />
          <Stack.Screen
            options={{
              headerTitle: "Page équipe",
              headerShown: true,
              headerBackTitle: "Retour",
              headerStyle: { backgroundColor: "white" },
            }}
            name="CurrentTeam"
            component={CurrentTeam}
          />
          <Stack.Screen
            name="PostBeforeModification"
            component={PostBeforeModification}
          />
          <Stack.Screen name="ImageModificator" component={ImageModificator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: "Inscrivez-vous",
              headerBackTitle: "Retour",
            }}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: "Confirmation de mail",
              headerBackTitle: "Retour",
            }}
            name="ConfirmMail"
            component={ConfirmMail}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
