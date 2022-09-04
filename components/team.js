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
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
// import * as Location from "expo-location";
import Ion from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _GLobal_Link from "../components/global";
export default function Team({ navigation }) {
  const [isloading, setisloading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [tokens, settokens] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(0);
  const [page__, setPage__] = useState(0);
  const [searchBarText, setsearchBarText] = useState("");

  const flat = useRef();
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
    (async () => {
      try {
        const token = await AsyncStorage.getItem("location");
        setLocation(token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    if (location != null && tokens != null) {
      let realLocation = JSON.parse(location);
      if (realLocation.coords != undefined) {
        if (searchBarText.toString().trim().length == 0) {
          setisloading(true);
          //   console.log(
          //     `${_GLobal_Link._link_simple}api/searchTeams/${location.coords.latitude}/${location.coords.longitude}/${tokens}/${page}`
          //   );
          axios
            .get(
              `${_GLobal_Link._link_simple}api/searchTeams/${realLocation.coords.latitude}/${realLocation.coords.longitude}/${tokens}/${page}`,
              {
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                  "Access-Control-Allow-Origin": true,
                },
              }
            )
            .then((res) => {
              setSearchData((prev) => {
                return [...prev, res.data];
              });
              setisloading(false);
            })
            .catch((error) => console.log(error));
        }
      } else if (
        realLocation.coords == undefined &&
        searchBarText.toString().trim().length == 0
      ) {
        // axios
        //   .get(
        //     `${_GLobal_Link._link_simple}api/searchFriendsNOlocation/${tokens}/${page}`,
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Origin": true,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setSearchData((prev) => {
        //       return [...prev, res.data];
        //     });
        //     setisloading(false);
        //   })
        //   .catch((error) => console.log(error));
      }
    }
  }, [tokens, location, page, searchBarText]);
  const renderFlatlist = ({ item }) => (
    <>
      {Object.values(item).map((data, key) => (
        <View
          style={{
            paddingBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // borderBottomWidth: 1,
            // borderBottomColor: "lightgray",
            marginBottom: 20,
          }}
          key={key}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CurrentTeam", {
                  who: data.email,
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
                  aspectRatio: 5 / 5,
                  width: 60,
                  backgroundColor: "lightgray",
                  borderRadius: 30,
                }}
                source={{
                  uri:
                    _GLobal_Link._link_simple +
                    data.logo.replace("public", "storage"),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.navigate("CurrentTeam", {
                  who: data.email,
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
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#565656" }}
                >
                  {data.team_name}{" "}
                  <Text style={{ fontSize: 15, color: "gray", marginTop: 2 }}>
                    {/* ${data.sport_name} */}
                    <Ion
                      color={"#4399fe"}
                      size={20}
                      name="football-outline"
                    ></Ion>
                  </Text>
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: "#4399fe", marginTop: 5, fontSize: 15 }}>
                  Demander un match
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
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
  const scrollFlatlist = (event) => {
    let check =
      event.nativeEvent.contentOffset.y +
        event.nativeEvent.layoutMeasurement.height >=
      event.nativeEvent.contentSize.height;
    console.log(check);
    // if (check == true) {
    //   if (searchBarText.toString().trim().length == 0) {
    //     setPage((prev) => prev + 11);
    //   } else if (searchBarText.toString().trim().length > 0) {
    //     // console.log(page__);
    //     setPage__((prev) => prev + 10);
    //   }
    // }
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
        <TextInput
          autoFocus={true}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            paddingLeft: 25,
            color: "lightgray",
            height: 40,
            // backgroundColor: "lightgray",
            // borderRadius: 5,
            borderColor: "lightgray",
          }}
          placeholder={"Rechercher une équipe"}
          placeholderTextColor={"gray"}
          onChangeText={(e) => {
            sendSearch(e);
          }}
        />
        <Icon
          name="search"
          size={20}
          color={"gray"}
          style={{ position: "absolute", padding: 10 }}
        />
      </View>
      <FlatList
        ref={flat}
        style={{
          padding: 10,
          marginTop: 5,
          paddingBottom: 0,
          flex: 1,
        }}
        data={searchData}
        renderItem={renderFlatlist}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        maxToRenderPerBatch={10}
        onScroll={(event) => {
          scrollFlatlist(event);
        }}
        initialNumToRender={10}
        // ListEmptyComponent={
        //   <>
        //     {Object.keys(searchData).length == 0 ? (
        //       <View
        //         style={{
        //           flex: 1,
        //           flexDirection: "row",
        //           justifyContent: "center",
        //         }}
        //       >
        //         <Text>Aucun resultat pour votre recherche.</Text>
        //       </View>
        //     ) : (
        //       <></>
        //     )}
        //   </>
        // }
      />
    </View>
  );
}
