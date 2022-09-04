import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import _GLobal_Link from "../components/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

import { AntDesign, Feather } from "@expo/vector-icons";

import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/loginSlice";
import * as Location from "expo-location";
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
    flex: 1,
    height: height,
    justifyContent: "space-evenly",
    padding: 20,
    backgroundColor: "white",
    paddingTop: 0,
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
});
export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.loginReducer);
  const [isloading, setisloading] = React.useState(false);
  const [test, settest] = React.useState(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
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
      .required("Password is required"),
  });

  const errorAlert = () =>
    Alert.alert("Problème de connection", "Mot de passe ou email incorrect.", [
      {
        text: "Fermer",
        // onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Se connecter", onPress: () => navigation.navigate("Login") },
    ]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("Token", value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      //   console.log(status)
      if (status !== "granted") {
        //  setErrorMsg('Permission to access location was denied');
        Alert.alert(
          "Information",
          "L'autorisation d'accéder à l'emplacement a été refusée. les performances de l'application seront limitées. Vous pouvez, si vous le souhaitez, activer la localisation dans les paramètres.",
          [
            {
              text: "Fermer",
              style: "cancel",
            },
          ]
        );
        try {
            await AsyncStorage.setItem("location", status);
          } catch (e) {r
            console.log(e);
          }
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      try {
        await AsyncStorage.setItem("location", JSON.stringify(location));
      } catch (e) {r
        console.log(e);
      }
    })();
  }, []);

  const send = (values) => {
    setisloading(true);
    // console.log(getData)
    axios
      .get(
        _GLobal_Link._link_simple +
          "api/login/" +
          values.email +
          "/" +
          values.password,
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

        if (res.data[0] == "Cannot login, check your password or email.") {
          errorAlert();
        } else if (res.data[0] == "confirm mail") {
          navigation.navigate("ConfirmMail");
        } else {
          storeData(res.data[0]);
          dispatch(login(res.data[0]));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-evenly",
          padding: 20,
          backgroundColor: "white",
          paddingTop: 0,
        }}
      >
        <Image
          style={{ height: 150, width: 150, alignSelf: "center" }}
          source={require("../image/logo.png")}
        />

        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            color: "gray",
            marginBottom: 20,
          }}
        >
          Connectez-vous
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "#f9f9f9",
              width: 70,
              height: 70,
              margin: 10,
              borderRadius: 35,
              justifyContent: "center",
            }}
          >
            <AntDesign
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
            }}
          >
            <AntDesign
              name="facebook-square"
              style={{ alignSelf: "center" }}
              size={25}
              color={"white"}
            />
          </View>
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "" }}
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
                <Text style={{ padding: 10, paddingTop: 0, color: "gray" }}>
                  E-mail
                </Text>
                <View style={styles.inputParent}>
                  <Feather
                    name="mail"
                    size={20}
                    style={{ position: "absolute", padding: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <TextInput
                      name="email"
                      style={styles.input}
                      placeholder="jbull635@gmail.com"
                      placeholderTextColor={"gray"}
                      keyboardType="email-address"
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
                  Mot de passe
                </Text>
                <View style={styles.inputParent}>
                  <Feather
                    name="lock"
                    size={20}
                    style={{ position: "absolute", padding: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.input}
                      name="password"
                      placeholder="................"
                      placeholderTextColor={"gray"}
                      secureTextEntry={true}
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
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Connectez-vous
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 16, color: "gray" }}>
            Vous n'avez pas de compte ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.txtPasseForget}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
