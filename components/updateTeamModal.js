import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import sportjson from "../components/sport.json";
import { AntDesign as IconAnt, Feather as Icon } from "@expo/vector-icons";
import francejson from "../components/france.json";
import { useSelector, useDispatch } from "react-redux";
import { openModalTeam_2, addSome } from "../features/addTeamModalSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import _GLobal_Link from "../components/global";

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    // paddingLeft: 40,
    fontWeight: "400",
    height: 40,
    flex: 1,
    borderBottomColor: "gray",
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
  iconStyle_2: {
    width: 20,
    height: 20,
    display: "none",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default function UpdateTeamModal({ getUpdateModal, navigation }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [value_2, setValue_2] = useState(null);
  const [isFocus_2, setIsFocus_2] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [profilPhoto, setprofilPhoto] = useState(null);
  const [cover, setCover] = useState(null);
  const [isloading, setisloading] = React.useState(false);
  const [isloading2, setisloading2] = React.useState(false);
  const [teamname, setTeamname] = useState(null);
  const [tokens, settokens] = useState(null);
  const [btn, setBtn] = useState("Modifier");
  const [sendBtn, setsendBtn] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#4399fe" }]}>
          sport de l'équipe
        </Text>
      );
    }
    return null;
  };
  const renderLabel_2 = () => {
    if (value || isFocus_2) {
      return (
        <Text style={[styles.label, isFocus && { color: "#4399fe" }]}>
          Sélectionner une ville
        </Text>
      );
    }
    return null;
  };
  const pickImage = async () => {
    setisloading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [150, 150],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      setprofilPhoto(result.uri);
      setisloading(false);
    } else {
      setisloading(false);
    }
  };
  const pickImage_2 = async () => {
    // No permissions request is necessary for launching the image library
    setisloading2(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [150, 150],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      setCover(result.uri);
      setisloading2(false);
    } else {
      setisloading2(false);
    }
  };
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
    if (Object.keys(getUpdateModal).length > 0) {
      setTeamname(getUpdateModal.team_name);
      setValue(getUpdateModal.sport_name);
      setValue_2(getUpdateModal.city);
      setCover(
        _GLobal_Link._link_simple +
          getUpdateModal.cover.replace("public", "storage")
      );
      setprofilPhoto(
        _GLobal_Link._link_simple +
          getUpdateModal.logo.replace("public", "storage")
      );
    }
  }, [getUpdateModal]);
  const open_modal_1 = useSelector((state) => state.openModalTeam_1.open2);
  const errorAlertLogo = () =>
    Alert.alert("Problème", "L'ajout d'un logo est obligatoire. ", [
      {
        text: "Fermer",
        // onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      // { text: "Se connecter", onPress: () => navigation.navigate('Login') }
    ]);
  const errorAlertCover = () =>
    Alert.alert(
      "Problème",
      "L'ajout d'une image de couverture est obligatoire.",
      [
        {
          text: "Fermer",
          style: "cancel",
        },
      ]
    );
  const succesAlert = () =>
    Alert.alert("Bravo", "Les modifications ont été appliquer", [
      {
        text: "Ok",
        style: "cancel",
      },
      // {
      //   text: "Aller sur le page de l'equipe",
      //   onPress: () => navigation.navigate("Login"),
      // },
    ]);

  const error_sentAlert = (message) =>
    Alert.alert("Desolé", message, [
      {
        text: "Fermer",
        style: "cancel",
      },
    ]);
  const send = () => {
    if (value == null) {
      setValue("off");
    }
    if (value_2 == null) {
      setValue_2("off");
    }
    if (teamname == null || teamname == "") {
      setTeamname("off");
    }
    if (profilPhoto == null) {
      errorAlertLogo();
    }
    if (cover == null) {
      errorAlertCover();
    }
    if (teamname != null && teamname !== "off" && teamname !== "") {
      // teams_photos
      setBtn("Modification en cour ...");
      setsendBtn(true);
      // if (formData._parts.length > 0) {
      axios
        .get(
          _GLobal_Link._link_simple +
            "api/updatewithoutfiles/" +
            tokens +
            "/" +
            getUpdateModal.id +
            "/" +
            value_2 +
            "/" +
            teamname +
            "/" +
            value,
          {
            headers: {
              //  updatewithoutfiles
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((res) => {
          setBtn("Modifier");
          console.log(res.data);
          if (res.data == "added") {
            succesAlert();
            dispatch(openModalTeam_2());
            dispatch(addSome());
            setsendBtn(false);
            setprofilPhoto(null);
            setCover(null);
          } else {
            error_sentAlert(res.data);
            setsendBtn(false);
          }
          // else if (res.data == "Vous avez deja crée une equipe avec ce sport. Veuillez-en choisir un autre.") {
          //     error_sentAlert(res.data)
          //     setsendBtn(false)
          // }
        })
        .catch((error) => console.log(error));
      // }
    }
  };

  useEffect(() => {
    // Object.values(francejson).map((data, key) => {
    //     if (data.Code_postal == 14200) {
    //         console.log(data.Libelle_acheminement)
    //     }
    // })
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={open_modal_1}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: 30,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            flex: 1,
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Modifier</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(openModalTeam_2()),
                  setprofilPhoto(null),
                  setCover(null);
              }}
            >
              <Ionicons name="close" size={25} color={"black"} />
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {
                      borderColor: "#4399fe",
                      backgroundColor: "gray",
                    },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle_2}
                  data={sportjson}
                  search
                  maxHeight={300}
                  labelField="label"
                  disable
                  valueField="value"
                  placeholder={!isFocus ? "Sélectionner un sport" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => {
                    setIsFocus(false);
                  }}
                  onChange={(item) => {
                    setValue(item.label);
                    //console.log(item.Libelle_acheminement)
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
                <View style={{ marginTop: 10 }}>
                  {value == "off" && (
                    <Text style={{ fontSize: 12, color: "red" }}>
                      la sélection d'un sport est obligatoire!
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <TextInput
                style={[styles.input, { marginBottom: 10 }]}
                placeholder={"Nom de l'équipe"}
                placeholderTextColor="gray"
                value={teamname}
                onChangeText={(text) => setTeamname(text)}
              />
            </View>
            <View>
              {teamname == "off" && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  Le nom de l'équipe est obligatoire.
                </Text>
              )}
            </View>
            <View style={styles.container}>
              {renderLabel_2()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "#4399fe" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={francejson}
                search
                maxHeight={300}
                labelField="Nom_commune"
                valueField="Libelle_acheminement"
                placeholder={!isFocus ? "Sélectionner une ville" : "..."}
                searchPlaceholder="Search..."
                value={value_2}
                onFocus={() => setIsFocus_2(true)}
                onBlur={() => {
                  setIsFocus_2(false);
                }}
                onChange={(item) => {
                  setValue_2(item.Libelle_acheminement);
                  setIsFocus_2(false);
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
            </View>
          </View>
          <View style={{ marginTop: 60 }}>
            {value_2 == "off" && (
              <Text style={{ fontSize: 12, color: "red" }}>
                la sélection d'une ville est obligatoire!
              </Text>
            )}
          </View>
          {/* <View
                        style={{
                            marginTop: 20,
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{ alignItems: "center" }}
                        >
                            <Text style={{ marginBottom: 10 }}> Logo </Text>
                            <View style={{ position: 'absolute', zIndex: 1000, bottom: 40 }}>
                                <ActivityIndicator animating={isloading} size="small" color="white" />
                            </View>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    borderRadius: 5,
                                }}
                            >
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                        backgroundColor: "lightgray",
                                        position: "relative",
                                        zIndex: 1,
                                        resizeMode: "cover",
                                        borderRadius: 50,
                                    }}
                                    defaultSource={require("../image/wainting.png")}
                                    source={{ uri: profilPhoto, cache: "default" }}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={pickImage_2}
                            style={{ alignItems: "center" }}
                        >
                            <Text style={{ marginBottom: 10 }}>Couverture</Text>
                            <View style={{ position: 'absolute', zIndex: 1000, bottom: 40 }}>
                                <ActivityIndicator animating={isloading2} size="small" color="white" />
                            </View>
                            <TouchableOpacity
                                onPress={pickImage_2}
                                style={{
                                    borderRadius: 5,
                                }}
                            >
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                        backgroundColor: "lightgray",
                                        position: "relative",
                                        zIndex: 1,
                                        resizeMode: "cover",
                                        borderRadius: 50,
                                    }}
                                    defaultSource={require("../image/wainting.png")}
                                    source={{ uri: cover, cache: "default" }}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#4399fe",
                padding: 5,
                borderRadius: 3,
                paddingRight: 15,
                paddingLeft: 15,
              }}
              onPress={send}
              disabled={sendBtn}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {btn}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
