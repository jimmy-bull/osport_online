import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  openModalTeam_1,
  openModalTeam_2,
} from "../features/addTeamModalSlice";
import { Ionicons } from "@expo/vector-icons";

import AddTeamModal from "../components/addTeamModal";
import UpdateTeamModal from "../components/updateTeamModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import _GLobal_Link from "../components/global";
import SkeletonLoader from "expo-skeleton-loader";
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default function TeamPage({ navigation }) {
  const [statusBarColor, setStatusBarColor] = useState("white");
  const dispatch = useDispatch();
  const [tokens, settokens] = useState(null);
  const [getTeams, setTeams] = useState([]);
  const [getIntegratedTeams, setIntegratedTeams] = useState([]);
  const [getReload, setReload] = useState(0);
  const [getLoading, setLoading] = useState(true);
  const checkadded = useSelector((state) => state.openModalTeam_1.added);

  const [getUpdateModal, setUpdateModal] = useState({});

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

  const DeleteAlert = (id) =>
    Alert.alert("Attention", "Voulez-vous vraiment supprimer cette équipe ?", [
      {
        text: "Non",
        // onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Oui",
        onPress: () => {
          setLoading(true);
          axios
            .get(
              _GLobal_Link._link_simple + "api/deleteTeam/" + tokens + "/" + id,
              {
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                  "Access-Control-Allow-Origin": true,
                },
              }
            )
            .then((res) => {
              setReload((prev) => prev + 1);
            })
            .catch((error) => console.log(error));
        },
      },
    ]);

  //

  useEffect(() => {
    if (tokens != null) {
      setLoading(true);
      console.log(_GLobal_Link._link_simple + "api/getTeamIntegrated/" + tokens)
      axios
        .get(_GLobal_Link._link_simple + "api/get_teams/" + tokens, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setTeams(res.data);
          // setLoading(false);
        })
        .catch((error) => console.log(error));

      axios
        .get(_GLobal_Link._link_simple + "api/getTeamIntegrated/" + tokens, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setIntegratedTeams(res.data);
        //  console.log(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [tokens, getReload, checkadded]);

  const LoadingLayout = () => (
    <SkeletonLoader boneColor="lightgray" highlightColor="whitesmoke">
      <SkeletonLoader.Item
        style={{
          width: 160,
          height: 160,
          borderRadius: 5,
          marginTop: 30,
        }}
      />
    </SkeletonLoader>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        backgroundColor={statusBarColor}
        barStyle={"dark-content"}
      />
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 22, alignSelf: "center" }}>
          Mes équipes
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(openModalTeam_1()), setStatusBarColor("rgba(0,0,0,0.3)");
            }}
            style={{
              width: 160,
              height: 160,
              borderWidth: 0.1,
              justifyContent: "center",
              borderColor: "gray",
              borderRadius: 5,
              marginTop: 30,
              backgroundColor: "whitesmoke",
            }}
          >
            <Ionicons
              style={{ alignSelf: "center", marginTop: 10 }}
              name="add-circle-outline"
              size={30}
              color={"#4399fe"}
            />
            <Text style={{ alignSelf: "center", marginTop: 10, color: "gray" }}>
              Ajouter une équipe
            </Text>
          </TouchableOpacity>
          {getLoading == false ? (
            Object.keys(getTeams).length > 0 ? (
              Object.values(getTeams).map((data, key) => (
                <View
                  style={{
                    width: 160,
                    height: 160,
                    borderWidth: 1,
                    justifyContent: "center",
                    borderColor: "whitesmoke",
                    borderRadius: 5,
                    marginTop: 30,
                    //  backgroundColor: "whitesmoke"
                  }}
                  key={key}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CurrentTeam", {
                        who: "me",
                        data: {
                          id: data.id,
                          cover: data.cover,
                          logo: data.logo,
                          city: data.city,
                          sport_name: data.sport_name,
                          team_name: data.team_name,
                          team_owner: data.email,
                        },
                      })
                    }
                  >
                    <Image
                      style={{
                        height: 80,
                        width: 80,
                        alignSelf: "center",
                        borderRadius: 40,
                        resizeMode: "cover",
                        aspectRatio: 5 / 5,
                      }}
                      defaultSource={require("../image/wainting.png")}
                      source={{
                        uri:
                          _GLobal_Link._link_simple +
                          data.logo.replace("public", "storage"),
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CurrentTeam", {
                        who: "me",
                        data: {
                          id: data.id,
                          cover: data.cover,
                          logo: data.logo,
                          city: data.city,
                          sport_name: data.sport_name,
                          team_name: data.team_name,
                        },
                      })
                    }
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        marginTop: 10,
                        color: "black",
                        fontWeight: "300",
                      }}
                    >
                      {data.team_name}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        DeleteAlert(data.id);
                      }}
                      style={{ flexDirection: "row", alignSelf: "center" }}
                    >
                      <Ionicons
                        style={{ alignSelf: "center", marginTop: 10 }}
                        name="trash-outline"
                        size={20}
                        color={"lightgray"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(openModalTeam_2()),
                          setStatusBarColor("rgba(0,0,0,0.3)"),
                          setUpdateModal({
                            id: data.id,
                            cover: data.cover,
                            logo: data.logo,
                            sport_name: data.sport_name,
                            team_name: data.team_name,
                            city: data.city,
                          });
                      }}
                      style={{ flexDirection: "row", alignSelf: "center" }}
                    >
                      <Ionicons
                        style={{ alignSelf: "center", marginTop: 10 }}
                        name="create"
                        size={20}
                        color={"gray"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <></>
            )
          ) : (
            <>
              <LoadingLayout />
              <LoadingLayout />
              <LoadingLayout />
            </>
          )}
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          Mes équipes intégrées
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
            style={{
              width: 160,
              height: 160,
              borderWidth: 0.1,
              justifyContent: "center",
              borderColor: "gray",
              borderRadius: 5,
              marginTop: 30,
              backgroundColor: "whitesmoke",
            }}
          >
            <Ionicons
              style={{ alignSelf: "center", marginTop: 10 }}
              name="add-circle-outline"
              size={30}
              color={"#4399fe"}
            />
            <Text style={{ alignSelf: "center", marginTop: 10, color: "gray" }}>
              Rejoindre une équipe
            </Text>
          </TouchableOpacity>
          {getLoading == false ? (
            Object.keys(getIntegratedTeams).length > 0 ? (
              Object.values(getIntegratedTeams).map((data, key) => (
                <View
                  style={{
                    width: 160,
                    height: 160,
                    borderWidth: 1,
                    justifyContent: "center",
                    borderColor: "whitesmoke",
                    borderRadius: 5,
                    marginTop: 30,
                    //  backgroundColor: "whitesmoke"
                  }}
                  key={key}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CurrentTeam", {
                        who: data.who_want_to_join,
                        data: {
                          id: data.id,
                          cover: data.cover,
                          logo: data.logo,
                          city: data.city,
                          sport_name: data.sport_name,
                          team_name: data.team_name,
                          status: data.status,
                          team_owner: data.email,
                        },
                      })
                    }
                  >
                    <Image
                      style={{
                        height: 80,
                        width: 80,
                        alignSelf: "center",
                        borderRadius: 40,
                        resizeMode: "cover",
                        aspectRatio: 5 / 5,
                      }}
                      defaultSource={require("../image/wainting.png")}
                      source={{
                        uri:
                          _GLobal_Link._link_simple +
                          data.logo.replace("public", "storage"),
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CurrentTeam", {
                        who: data.who_want_to_join,
                        data: {
                          id: data.id,
                          cover: data.cover,
                          logo: data.logo,
                          city: data.city,
                          sport_name: data.sport_name,
                          team_name: data.team_name,
                          team_owner: data.email,
                        },
                      })
                    }
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        marginTop: 10,
                        color: "black",
                        fontWeight: "300",
                      }}
                    >
                      {data.team_name}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("CurrentTeam", {
                          who: data.who_want_to_join,
                          data: {
                            id: data.id,
                            cover: data.cover,
                            logo: data.logo,
                            city: data.city,
                            sport_name: data.sport_name,
                            team_name: data.team_name,
                            team_owner: data.email,
                          },
                        })
                      }
                      style={{ flexDirection: "row", alignSelf: "center" }}
                    >
                      <Text
                        style={{ fontSize: 10, marginTop: 10, color: "gray" }}
                      >
                        {data.status == "pending"
                          ? "en attente"
                          : "Vous êtes membre"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <></>
            )
          ) : (
            <>
              <LoadingLayout />
              <LoadingLayout />
              <LoadingLayout />
            </>
          )}
        </View>
      </ScrollView>

      <AddTeamModal />
      <UpdateTeamModal
        getUpdateModal={getUpdateModal}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
