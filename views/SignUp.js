import React, { useEffect, useState, useRef } from "react";
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
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get("window");
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
// import locationSlice from "../features/locationSlice";

import { AntDesign as IconAnt, Feather as Icon } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import _GLobal_Link from "../components/global";
import francejson from "../components/france.json";
import { Formik } from "formik";
import * as yup from "yup";
// import * as Location from "expo-location";
import Echo from "laravel-echo";
// import Pusher from 'pusher-js';
import PusherNative from "pusher-js/react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
  mainView: {
    padding: 20,
    backgroundColor: "white",
    paddingTop: 0,
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 40,
    fontWeight: "400",
    height: 40,
    flex: 1,
    borderBottomColor: "gray",
  },
  inputParent: {
    marginBottom: 30,
    flexDirection: "row",
    flex: 1,
  },
  mainViewSub: {
    padding: 20,
    justifyContent: "center",
    paddingTop: 0,
  },
  btn: {
    flex: 1,
    backgroundColor: "#4399fe",
    padding: 15,
    borderRadius: 10,
    paddingRight: 20,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  txtPasseForget: {
    color: "#234066",
    marginBottom: 15,
    fontSize: 16,
  },
  container: {
    backgroundColor: "white",
    paddingTop: 16,
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "gray",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default function SignUp({ navigation }) {
  // let Pusher = require("pusher-js");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [getLong, setLong] = useState(null);
  const [getLarge, setLarge] = useState(null);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Problème",
      "Ce compte existe déjà ! Identifiez vous pour accéder à votre compte.",
      [
        {
          text: "Fermer",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Se connecter", onPress: () => navigation.navigate("Login") },
      ]
    );

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#4399fe" }]}>
          Sélectionner une ville
        </Text>
      );
    }
    return null;
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Une adresse email est requise"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Le mot de passe doit comporter au moins huit caractères, au moins une lettre, un chiffre et un caractère spécial suivant: @$!%*#?&"
      )
      .min(
        8,
        ({ min }) => `Le mot de passe doit comporter au moins ${min} caractères`
      )
      .required("Un mot de passe est requis"),
    lastname: yup
      .string()
      .min(
        4,
        ({ min }) => `Votre Nom doit comporter au moins ${min} caractères`
      )
      .required("Votre nom est requis"),
    firstname: yup
      .string()
      .min(
        4,
        ({ min }) => `Votre Prenom doit comporter au moins ${min} caractères`
      )
      .required("Votre prenom est requis"),
    // ville: yup
    //     .string()
    //     .required('la sélection d\'une ville est obligatoire!'),
  });
  const send = (values) => {
    // console.log(values)
    if (value == null) {
      setValue("off");
    }
    if (value != null && value != "off") {
      setisloading(true);

      axios
        .get(
          _GLobal_Link._link_simple +
            "api/register/" +
            values.email +
            "/" +
            values.password +
            "/" +
            values.lastname +
            "/" +
            values.firstname +
            "/" +
            value +
            "/" +
            getLarge +
            "/" +
            getLong,
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((res) => {
          setisloading(false);
          console.log(res.data);
          if (res.data == "confirm mail") {
            navigation.navigate("ConfirmMail");
          } else {
            createTwoButtonAlert();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const checkVille = () => {
    if (value == null) {
      setValue("off");
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("location");
        setLocation(token);
        //  console.log(token);
      } catch (e) {
        // error reading value
        console.log(e);
      }
    })();
  }, []);

  // useEffect(() => {
  //     (async () => {
  //         let { status } = await Location.requestForegroundPermissionsAsync();
  //         if (status !== 'granted') {
  //             setErrorMsg('Permission to access location was denied');
  //             return;
  //         }

  //         let location = await Location.getCurrentPositionAsync({});
  //         setLocation(location);
  //     })();
  // }, []);

  const sliptfunction = (tosplit) => {
    let firstpart = tosplit.toString().split(".")[0];
    let secondPart = tosplit.toString().split(".")[1];

    let format = "";
    for (let index = 0; index < 6; index++) {
      format += secondPart[index];
    }
    return firstpart + "." + format;
  };
  const sliptfunction_2 = (tosplit) => {
    let firstpart = tosplit.split(".")[0];
    let secondPart = tosplit.split(".")[1];

    let format = "";
    if (secondPart != undefined) {
      for (let index = 0; index < 6; index++) {
        format += secondPart[index];
      }
    }

    return firstpart + "." + format;
  };

  useEffect(() => {
    if (location != null) {
      let realLocation = JSON.parse(location);
      // console.log(realLocation.coords);
      if (realLocation.coords != undefined) {
        let text = "Waiting..";
        // if (errorMsg) {
        //   text = errorMsg;
        // } else if (location) {
        text = location;
        Object.values(francejson).map((data, key) => {
          if (
            parseFloat(
              sliptfunction_2(data.coordonnees_gps.split(",")[0].trim())
            ) == parseFloat(sliptfunction(realLocation.coords.latitude)) &&
            parseFloat(sliptfunction(realLocation.coords.longitude)) ==
              parseFloat(
                sliptfunction_2(data.coordonnees_gps.split(",")[1].trim())
              )
          ) {
            setValue(data.Nom_commune);
            setLong(parseFloat(sliptfunction(realLocation.coords.longitude)));
            setLarge(parseFloat(sliptfunction(realLocation.coords.latitude)));
            console.log(data.coordonnees_gps.split(",")[1].trim());
          }
        });
        // }
      }
    }
  }, [location]);

  const [myio, setmyio] = useState(null);
  const [myio_2, setmyio_2] = useState(null);
  const socket = useRef();
  // useEffect(() => {
  //     socket.current = io('https://sheltered-retreat-62433.herokuapp.com');
  //     socket.current.on("connection");
  //     socket.current.on('sendToClient', (message) => {
  //         //  document.getElementById('tosee').textContent = message
  //         setmyio(message)
  //     })
  // }, [])

  // const handleChangeFirst__ = (e) => {
  //     //  socket.current.emit("sendToServer",e)
  //     setmyio_2(e)
  // }
  // const go = () => {
  //     socket.current.emit("sendToServer", myio_2)
  // }
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-evenly",
            padding: 20,
            backgroundColor: "white",
            paddingTop: 0,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: "gray",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            Inscrivez-vous
          </Text>
          {/* <View style={{ flex: 1 }}>
                        <TextInput
                            name='firstname__'
                            onChangeText={(e) => { handleChangeFirst__(e) }}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={go}>
                            <Text>Go</Text>
                        </TouchableOpacity>
                    </View> */}
          <Text>{myio}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: "whitesmoke",
                width: 70,
                height: 70,
                margin: 10,
                borderRadius: 35,
                justifyContent: "center",
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              <IconAnt
                name="googleplus"
                style={{ alignSelf: "center" }}
                size={25}
                color={"red"}
              />
            </View>
            <View
              style={{
                backgroundColor: "#4399fe",
                width: 70,
                height: 70,
                margin: 10,
                borderRadius: 35,
                justifyContent: "center",
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              <IconAnt
                name="facebook-square"
                style={{ alignSelf: "center" }}
                size={25}
                color={"white"}
              />
            </View>
          </View>

          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              email: "",
              password: "",
              lastname: "",
              firstname: "",
            }}
            onSubmit={send}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <View>
                  <Text
                    style={{
                      padding: 10,
                      paddingTop: 0,
                      color: "gray",
                      marginTop: 10,
                    }}
                  >
                    Prénom
                  </Text>
                  <View style={styles.inputParent}>
                    <Icon
                      name="mail"
                      size={20}
                      style={{ position: "absolute", padding: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <TextInput
                        name="firstname"
                        onChangeText={handleChange("firstname")}
                        onBlur={handleBlur("firstname")}
                        value={values.firstname}
                        style={styles.input}
                        placeholder="Prénom"
                        placeholderTextColor={"gray"}
                      />
                      <View style={{ flex: 1, marginTop: 10 }}>
                        {errors.firstname && (
                          <Text style={{ fontSize: 12, color: "red" }}>
                            {errors.firstname}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <Text style={{ padding: 10, paddingTop: 0, color: "gray" }}>
                    Nom
                  </Text>
                  <View style={styles.inputParent}>
                    <Icon
                      name="mail"
                      size={20}
                      style={{ position: "absolute", padding: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        placeholderTextColor={"gray"}
                        name="lastname"
                        onChangeText={handleChange("lastname")}
                        onBlur={handleBlur("lastname")}
                        value={values.lastname}
                      />
                      <View style={{ flex: 1, marginTop: 10 }}>
                        {errors.lastname && (
                          <Text style={{ fontSize: 12, color: "red" }}>
                            {errors.lastname}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <Text style={{ padding: 10, paddingTop: 0, color: "gray" }}>
                    E-mail
                  </Text>
                  <View style={styles.inputParent}>
                    <Icon
                      name="mail"
                      size={20}
                      style={{ position: "absolute", padding: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={styles.input}
                        placeholder="jbull635@gmail.com"
                        placeholderTextColor={"gray"}
                        name="email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                      <View style={{ flex: 1, marginTop: 10 }}>
                        {errors.email && (
                          <Text style={{ fontSize: 12, color: "red" }}>
                            {errors.email}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <Text style={{ padding: 10, paddingTop: 0, color: "gray" }}>
                    Pays
                  </Text>
                  <View style={styles.inputParent}>
                    <Ionicons
                      name="globe-outline"
                      size={20}
                      style={{ position: "absolute", padding: 10 }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="France"
                      placeholderTextColor={"gray"}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                  <Text style={{ padding: 10, paddingTop: 0, color: "gray" }}>
                    Ville
                  </Text>
                  <View style={styles.inputParent}>
                    <Ionicons
                      name="locate-outline"
                      size={20}
                      style={{ position: "absolute", padding: 10 }}
                    />
                    <View style={styles.container}>
                      {renderLabel()}
                      <Dropdown
                        style={[
                          styles.dropdown,
                          isFocus && { borderColor: "#4399fe" },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={francejson}
                        search
                        maxHeight={300}
                        labelField="Nom_commune"
                        valueField="Nom_commune"
                        placeholder={
                          !isFocus ? "Sélectionner une ville" : "..."
                        }
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => {
                          setIsFocus(false);
                        }}
                        onChange={(item) => {
                          setValue(item.Libelle_acheminement);
                          console.log(item.Libelle_acheminement);
                          setIsFocus(false);
                        }}
                        //  name='ville'
                        renderLeftIcon={() => (
                          <IconAnt
                            style={styles.icon}
                            color={isFocus ? "#4399fe" : "gray"}
                            name="Safety"
                            size={20}
                          />
                        )}
                      />
                      <View style={{ flex: 1, marginTop: 10 }}>
                        {value == "off" && (
                          <Text style={{ fontSize: 12, color: "red" }}>
                            la sélection d'une ville est obligatoire!
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <Text style={{ padding: 10, paddingTop: 0, color: "gray" }}>
                    Mot de passe
                  </Text>
                  <View style={styles.inputParent}>
                    <Icon
                      name="lock"
                      size={20}
                      style={{ position: "absolute", padding: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={styles.input}
                        placeholder="................"
                        placeholderTextColor={"gray"}
                        secureTextEntry={true}
                        name="password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      <View style={{ flex: 1, marginTop: 10 }}>
                        {errors.password && (
                          <Text style={{ fontSize: 12, color: "red" }}>
                            {errors.password}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.inputParent,
                    { flexDirection: "row", justifyContent: "center" },
                  ]}
                >
                  <View
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      flex: 1,
                      justifyContent: "center",
                      right: 20,
                      bottom: 5,
                    }}
                  >
                    <ActivityIndicator
                      animating={isloading}
                      size="large"
                      color="#FFF"
                    />
                  </View>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.btn}
                    onPress={() => {
                      handleSubmit(), checkVille();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        fontWeight: "bold",
                        alignSelf: "center",
                      }}
                    >
                      Inscrivez-vous
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>

          <View>
            <Text style={{ marginBottom: 10, fontSize: 16, color: "gray" }}>
              Avez-vous un compte ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.txtPasseForget}>Se Connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
