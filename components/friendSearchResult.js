import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
// import * as Location from "expo-location";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _GLobal_Link from "../components/global";
import { object } from "yup";
import { cos } from "react-native-reanimated";
export default function FriendSearchResult({ navigation }) {
  const [isloading, setisloading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [tokens, settokens] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(0);
  const [page__, setPage__] = useState(0);
  const [searchBarText, setsearchBarText] = useState("");
  const [ready, setready] = useState(null);

  const fromSearch = useRef(false);
  const flat = useRef();

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       Alert.alert(
  //         "Attention!",
  //         "Les recherches d'amis se feront qu'enfonction du sport que vous avez en commun. Activez la localisation dans les paramètres vous permettra de rechercher aussi en fonction de la localisation. "
  //       );
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log(location);
  //   })();
  // }, []);
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
    // alert(page);
    if (location != null && tokens != null) {
      let realLocation = JSON.parse(location);
      if (realLocation.coords != undefined) {
        if (searchBarText.toString().trim().length == 0) {
          setisloading(true);
          // console.log(
          //   `${_GLobal_Link._link_simple}api/searchFriends/${realLocation.coords.latitude}/${realLocation.coords.longitude}/${tokens}/${page}`
          // );
          axios
            .get(
              `${_GLobal_Link._link_simple}api/searchFriends/${realLocation.coords.latitude}/${realLocation.coords.longitude}/${tokens}/${page}`,
              {
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                  "Access-Control-Allow-Origin": true,
                },
              }
            )
            .then((res) => {
              console.log(
                `${_GLobal_Link._link_simple}api/searchFriends/${realLocation.coords.latitude}/${realLocation.coords.longitude}/${tokens}/${page}`
              );
              setSearchData((prev) => {
                return [...prev, res.data];
              });
              // console.log(res.data);
              // setisloading(false);
            })
            .catch((error) => console.log(error));
        }
      } else if (
        realLocation.coords == undefined &&
        searchBarText.toString().trim().length == 0
      ) {
        alert(searchBarText.toString().trim().length);
        axios
          .get(
            `${_GLobal_Link._link_simple}api/searchFriendsNOlocation/${tokens}/${page}`,
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
    }
  }, [tokens, location, page, searchBarText]);

  const sendSearch = (e) => {
    // setTimeout(() => {
    console.log(e);
    if (e.toString().trim().length > 0) {
      setSearchData([]);
      setPage__(0);
      setsearchBarText(e);
    } else if (e.toString().trim().length == 0) {
      setSearchData([]);
      setPage(1);
      setsearchBarText(e);
    }
    // }, 5000);
  };
  useEffect(() => {
    if (location != null && tokens != null) {
      let realLocation = JSON.parse(location);
      if (
        searchBarText.toString().trim().length > 0 &&
        realLocation.coords != undefined
      ) {
        setisloading(true);
        axios
          .get(
            `${_GLobal_Link._link_simple}api/searchWithInputWithlocation/${searchBarText}/${realLocation.coords.latitude}/${realLocation.coords.longitude}/${tokens}/${page__}`,
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
            // console.log(res.data);
            setisloading(false);
          })
          .catch((error) => console.log(error));
      } else if (
        searchBarText.toString().trim().length > 0 &&
        realLocation.coords == undefined
      ) {
        axios
          .get(
            `${_GLobal_Link._link_simple}api/searchWithInputWithNolocation/${tokens}/${page__}`,
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
    }
  }, [searchBarText, page__]);

  const follow = (id) => {
    axios
      .get(`${_GLobal_Link._link_simple}api/followingSystem_insert/${id}`, {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const checkme = (email) => {
    axios
      .get(`${_GLobal_Link._link_simple}api/checkme/${email}/${tokens}`, {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((res) => {
        if (res.data == "is me") {
          navigation.navigate("Profile", {
            who: "me",
          });
        } else {
          navigation.navigate("Profile", {
            who: email,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  const renderFlatlist = ({ item }) => (
    <>
      {Object.values(item).map((data, key) => (
        <View
          style={{
            paddingBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            //  borderBottomWidth: 1,
            borderBottomColor: "lightgray",
            marginBottom: 10,
            flex: 1,
          }}
          key={key}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                checkme(data.email);
              }}
            >
              {data.image != null ? (
                <Image
                  style={{
                    aspectRatio: 5 / 5,
                    width: 60,
                    backgroundColor: "rgba(220,220,220,0.1)",
                    borderRadius: 30,
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
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10, flex: 1 }}
              onPress={() => {
                checkme(data.email);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#565656",
                    }}
                    numberOfLines={1}
                  >
                    {data.name.length > 20
                      ? data.name[0] +
                        data.name[1] +
                        data.name[2] +
                        data.name[3] +
                        data.name[4] +
                        data.name[5] +
                        data.name[6] +
                        data.name[7] +
                        data.name[8] +
                        data.name[9] +
                        data.name[10] +
                        data.name[11] +
                        data.name[12] +
                        data.name[13] +
                        data.name[14] +
                        data.name[15] +
                        data.name[16] +
                        data.name[17] +
                        data.name[18] +
                        data.name[19] +
                        data.name[20] +
                        "..."
                      : data.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: "gray",
                    }}
                    numberOfLines={1}
                  >
                    {data.lastname.length > 20
                      ? data.lastname[0] +
                        data.lastname[1] +
                        data.lastname[2] +
                        data.lastname[3] +
                        data.lastname[4] +
                        data.lastname[5] +
                        data.lastname[6] +
                        data.lastname[7] +
                        data.lastname[8] +
                        data.lastname[9] +
                        data.lastname[10] +
                        data.lastname[11] +
                        data.lastname[12] +
                        data.lastname[13] +
                        data.lastname[14] +
                        data.lastname[15] +
                        data.lastname[16] +
                        data.lastname[17] +
                        data.lastname[18] +
                        data.lastname[19] +
                        data.lastname[20] +
                        "..."
                      : data.lastname}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              borderColor: "#4399fe",
            }}
            onPress={() => {
              follow(data.email);
            }}
          >
            <Text style={{ color: "#4399fe", fontSize: 13 }}>Suivre +</Text>
          </TouchableOpacity> */}
        </View>
      ))}
    </>
  );

  // const scrollFlatlist = (event) => {
  //   let check =
  //     event.nativeEvent.contentOffset.y +
  //       event.nativeEvent.layoutMeasurement.height >=
  //     event.nativeEvent.contentSize.height;

  //   if (check == true) {
  //     // alert(check);
  //     //   return setready("yes");
  //     if (searchBarText.toString().trim().length == 0) {
  //       return setPage((prev) => prev + 11);
  //     } else if (searchBarText.toString().trim().length > 0) {
  //       // console.log(page__);
  //       return setPage__((prev) => prev + 10);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   console.log(page);
  //   return;
  // }, [page]);
  const loadMore = () => {
    if (searchBarText.toString().trim().length == 0) {
      setPage((prev) => prev + 11);
    } else if (searchBarText.toString().trim().length > 0) {
      return setPage__((prev) => prev + 10);
    }
  };
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
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          placeholder={"Rechercher un ami"}
          placeholderTextColor={"gray"}
          onChangeText={(e) => {
            sendSearch(e);
          }}
          ont
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        // maxToRenderPerBatch={10}
        // onScroll={(event) => {
        //   scrollFlatlist(event);
        // }}
        // initialNumToRender={10}
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
