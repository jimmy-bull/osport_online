import React, { useState, useMemo, useRef, useEffect } from "react";
// import Video from 'react-native-video';
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
  SafeAreaView,
  Modal,
  StatusBar,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather";
import BottomSheet from "react-native-gesture-bottom-sheet";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get("window");
// import Icon from "react-native-vector-icons/Feather";
// import IconAnt from "react-native-vector-icons/AntDesign";
import AccordionListItem from "../components/AccordionListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import _GLobal_Link from "../components/global";

export default function GameAsked({ navigation }) {
  const [gameEndModalState, setgameEndModalState] = useState(false);
  const [statusBarColor, setStatusBarColor] = useState("white");
  const [askMatch, setaskMatch] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [date, setDate] = useState("15 / 03 / 2022");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [hours, SetHours] = useState("16 / 03 / 20");
  const [modalMessageState, setmodalMessageState] = useState(false);
  const [tokens, settokens] = useState(null);
  const [page, setpage] = useState(0);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      setDate(
        selectedDate.getDate() +
          " / " +
          selectedDate.getMonth() +
          " / " +
          selectedDate.getFullYear()
      );
    } else if (mode == "time") {
      SetHours(
        selectedDate.getHours() +
          " / " +
          selectedDate.getMinutes() +
          " / " +
          selectedDate.getSeconds()
      );
    }

    // console.log(
  };
  const [showMic, setShowMic] = useState(true);
  const files = useRef();
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
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
    if (tokens != null) {
      console.log(tokens);
    }
  }, [tokens]);

  const modalAskmatch = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={askMatch}>
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
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Modifier la date du Match
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setaskMatch(false), setStatusBarColor("white");
                }}
              >
                <Ionicons name="close" size={25} color={"black"} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Date:</Text>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ color: "gray" }}>{date}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showTimepicker}
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Heures:
                </Text>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: "gray" }}>{hours}</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Stade:</Text>
                <TextInput
                  style={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    fontSize: 16,
                    flex: 1,
                    color: "gray",

                    borderBottomColor: "gray",
                    marginLeft: 10,
                  }}
                  placeholder={"Stade de france"}
                  placeholderTextColor={"gray"}
                />
              </View>
            </View>
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
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
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
                  Modifier
                </Text>
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  };
  const modalMessage = (modalMessageState) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMessageState}
      >
        <View
          style={{
            backgroundColor: "whitesmoke",

            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Message</Text>
              <TouchableOpacity
                onPress={() => {
                  setmodalMessageState(false), setStatusBarColor("white");
                }}
              >
                <Ionicons name="close" size={25} color={"black"} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }}>
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 20,
                    color: "#565656",
                    fontSize: 16,
                  }}
                >
                  Today
                </Text>
                {/* ME */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      Bonjour Monsieur comment on vas ? j'etais au village hier
                      soir et j'ai vus ta meuf au bar. Elle étais trés bien
                      habillé.
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        alignSelf: "flex-end",
                        fontSize: 12,
                      }}
                    >
                      16:22
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      Bonjour Monsieur comment on vas ?{" "}
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        alignSelf: "flex-end",
                        fontSize: 12,
                      }}
                    >
                      16:22
                    </Text>
                  </View>
                </View>
                {/* you */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-start",
                    backgroundColor: "#4399fe",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Bonjour Monsieur comment on vas ?{" "}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-end",
                        fontSize: 12,
                      }}
                    >
                      16:22 <Icon name="check" size={16} color={"white"} />
                    </Text>
                  </View>
                </View>
                {/* ME */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Bonjour Monsieur comment on vas ? j'etais au village hier
                    soir et j'ai vus ta meuf au bar. Elle étais trés bien
                    habillé.
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      alignSelf: "flex-end",
                      fontSize: 12,
                    }}
                  >
                    16:22
                  </Text>
                </View>
                {/* you */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-start",
                    backgroundColor: "#4399fe",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Bonjour Monsieur comment on vas ?{" "}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-end",
                        fontSize: 12,
                      }}
                    >
                      16:22 <Icon name="check" size={16} color={"white"} />
                    </Text>
                  </View>
                </View>
                {/* you */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-start",
                    backgroundColor: "#4399fe",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Bonjour Monsieur comment on vas ?{" "}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-end",
                        fontSize: 12,
                      }}
                    >
                      16:22 <Icon name="check" size={16} color={"white"} />
                    </Text>
                  </View>
                </View>
                {/* ME */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Bonjour Monsieur comment on vas ? j'etais au village hier
                    soir et j'ai vus ta meuf au bar. Elle étais trés bien
                    habillé.
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      alignSelf: "flex-end",
                      fontSize: 12,
                    }}
                  >
                    16:22
                  </Text>
                </View>

                {/* ME */}

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ShowImageConversation", {
                      imageLink:
                        "https://cdn.foot-sur7.fr/768x512/articles/2022/01/Messi_Icon_DIB-121221-11-03.jpg",
                      imageRatio: 758 / 512,
                    })
                  }
                  style={{
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 5,
                      aspectRatio: 5 / 5,
                      width: 150,
                      alignSelf: "flex-end",
                      marginBottom: 10,
                    }}
                    source={{
                      uri: "https://cdn.foot-sur7.fr/768x512/articles/2022/01/Messi_Icon_DIB-121221-11-03.jpg",
                    }}
                  />
                  <Text
                    style={{
                      color: "gray",
                      alignSelf: "flex-end",
                      fontSize: 12,
                    }}
                  >
                    16:22
                  </Text>
                </TouchableOpacity>

                {/* you */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-start",
                    backgroundColor: "#4399fe",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Bonjour Monsieur comment on vas ?{" "}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-end",
                        fontSize: 12,
                      }}
                    >
                      16:22 <Icon name="check" size={16} color={"white"} />
                    </Text>
                  </View>
                </View>
                {/* ME */}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Bonjour Monsieur comment on vas ? j'etais au village hier
                    soir et j'ai vus ta meuf au bar. Elle étais trés bien
                    habillé.
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      alignSelf: "flex-end",
                      fontSize: 12,
                    }}
                  >
                    16:22
                  </Text>
                </View>

                {/* ME */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("fullscreenVideo", {
                      videoLink:
                        "https://ik.imagekit.io/jimmyBull/pexels-polina-kovaleva-6265961_ZWwSZzwvs.mp4",
                    })
                  }
                  style={{
                    marginBottom: 0,
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    padding: 10,
                    margin: 15,
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  {/* <VideoPlayer
                        source={{ uri: "https://ik.imagekit.io/jimmyBull/pexels-polina-kovaleva-6265961_ZWwSZzwvs.mp4" }}
                        style={{ height:200, width: 200, borderRadius: 5 }}
                        toggleResizeModeOnFullscreen={false}
                        rate={1.0}
                        paused={true}
                        disableVolume
                        disableBack
                        disableTimer
                        disableSeekbar
                        disablePlayPause
                        disableFullscreen
                        resizeMode='cover'
                        poster='https://ik.imagekit.io/jimmyBull/mingwei-lim-Qi1eNaEzlAE-unsplash_lOoV4MOYT66.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1643615560056'
                        posterResizeMode='cover' // HYL4UaqXe@z3Lr4
                    /> */}

                  <View
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        borderRadius: 50,
                        alignSelf: "center",
                      }}
                      onPress={() =>
                        navigation.navigate("fullscreenVideo", {
                          videoLink:
                            "https://ik.imagekit.io/jimmyBull/pexels-polina-kovaleva-6265961_ZWwSZzwvs.mp4",
                        })
                      }
                    >
                      <Icon
                        name="play"
                        size={40}
                        color="white"
                        style={{ alignSelf: "center" }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: "gray",
                      alignSelf: "flex-end",
                      fontSize: 12,
                      marginTop: 10,
                    }}
                  >
                    16:22
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  padding: 15,
                  paddingRight: 10,
                  paddingLeft: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => files.current.show()}
                  style={{ paddingLeft: 10 }}
                >
                  <Text>
                    <Icon
                      onPress={() => files.current.show()}
                      name="paperclip"
                      size={22}
                      color={"gray"}
                    />
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, height: 40 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      backgroundColor: "white",
                      fontSize: 16,
                      color: "gray",
                      height: 40,
                      paddingLeft: 10,
                      borderRadius: 10,
                    }}
                    placeholder="Message"
                    placeholderTextColor={"gray"}
                    onChangeText={(txt) => {
                      if (txt.trim() != "") {
                        setShowMic(false);
                      } else {
                        setShowMic(true);
                      }
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      right: 15,
                      position: "absolute",
                      top: 10,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Text style={{ alignSelf: "center" }}>
                      <Icon name="camera" size={20} color={"gray"} />
                    </Text>
                  </TouchableOpacity>
                </View>

                {showMic ? (
                  <TouchableOpacity style={{ paddingLeft: 10 }}>
                    <Text>
                      <Icon name="mic" size={22} color={"#55bd45"} />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={{ paddingLeft: 10 }}>
                    <Text>
                      <Icon name="send" size={22} color={"#55bd45"} />
                    </Text>
                  </TouchableOpacity>
                )}
                <BottomSheet hasDraggableIcon ref={files} height={150}>
                  <View
                    style={{
                      padding: 20,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      flex: 1,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity
                        style={{
                          paddingLeft: 10,
                          backgroundColor: "#55bd45",
                          height: 50,
                          width: 50,
                          justifyContent: "center",
                          borderRadius: 25,
                        }}
                      >
                        <Text>
                          <Icon name="file" size={30} color={"white"} />
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          color: "#565656",
                        }}
                      >
                        Documents
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity
                        style={{
                          paddingLeft: 10,
                          backgroundColor: "#4399fe",
                          height: 50,
                          width: 50,
                          justifyContent: "center",
                          borderRadius: 25,
                        }}
                      >
                        <Text>
                          <Icon name="camera" size={30} color={"white"} />
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          color: "#565656",
                        }}
                      >
                        Camera
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity
                        style={{
                          paddingLeft: 10,
                          backgroundColor: "orangered",
                          height: 50,
                          width: 50,
                          justifyContent: "center",
                          borderRadius: 25,
                        }}
                      >
                        <Text>
                          <Icon name="image" size={30} color={"white"} />
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          color: "#565656",
                        }}
                      >
                        Galerie
                      </Text>
                    </View>
                  </View>
                </BottomSheet>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const modalMessagePlace = useMemo(
    () => modalAskmatch(hours, date, askMatch, show),
    [hours, date, askMatch, show]
  );

  const modalAskmatchPlace = useMemo(
    () => modalMessage(modalMessageState),
    [modalMessageState]
  );

  useEffect(() => {
    if (tokens != null) {
      axios
        .get(
          _GLobal_Link._link_simple + "api/getAskGames/" + page + "/" + tokens,
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [tokens, page]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        backgroundColor={statusBarColor}
        barStyle={"dark-content"}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={{
            marginBottom: 10,
            margin: 20,
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Vous avez 2 demandes de match.
        </Text>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            margin: 10,
            borderColor: "lightgray",
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setgameEndModalState(true),
                  setStatusBarColor("rgba(0,0,0,0.3)");
              }}
              style={{
                backgroundColor: "#4399fe",
                padding: 5,
                borderRadius: 3,
                paddingRight: 15,
                paddingLeft: 15,
                height: 30,
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
                Fin de match
              </Text>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                onPress={() => {
                  setaskMatch(true), setStatusBarColor("rgba(0,0,0,0.3)");
                }}
                style={{
                  borderRadius: 3,
                  paddingRight: 15,
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
                  <Ionicons name="create" size={26} color={"lightgray"} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmodalMessageState(true);
                  setStatusBarColor("whitesmoke");
                }}
                style={{
                  borderRadius: 3,
                  paddingRight: 15,
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
                  <Ionicons name="mail" size={26} color={"lightgray"} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Paris Saint Germain:{" "}
            </Text>
            <Text>
              <Text style={{ color: "green", fontWeight: "bold" }}> 15V </Text>{" "}
              \{" "}
              <Text style={{ color: "orangered", fontWeight: "bold" }}>
                {" "}
                7D{" "}
              </Text>{" "}
              \{" "}
              <Text style={{ color: "#4399fe", fontWeight: "bold" }}> 0N </Text>
            </Text>
          </View>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 10,
              color: "gray",
              fontSize: 15,
            }}
          >
            Samedi 15 mars 16h
          </Text>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 10,
              color: "gray",
              marginBottom: 20,
            }}
          >
            Stade de France
          </Text>
          <AccordionListItem title={"Voir les participants"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  flex: 1,
                  borderColor: "lightgray",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  Paris Saint Germain
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  Paris Saint Germain
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "green",
                      marginLeft: 3,
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 5 / 5,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "lightgray",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: "https://www.rtl.be/info/GED/09580000/9587900/9587935.jpg",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </AccordionListItem>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameEndModalState}
      >
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
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Entrez le score du match
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setgameEndModalState(false), setStatusBarColor("white");
                }}
              >
                <Ionicons name="close" size={25} color={"black"} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingBottom: 20,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "500",
                  color: "black",
                }}
              >
                {"FootBall"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      marginBottom: 10,
                      resizeMode: "contain",
                    }}
                    defaultSource={require("../image/wainting.png")}
                    source={{
                      uri: "https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d8_VfT-LVj79vN0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552364",
                      cache: "default",
                    }}
                  />
                  <Text style={{ fontWeight: "500", color: "black" }}>
                    {"PSG"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        color: "black",
                        borderBottomColor: "black",
                        paddingLeft: 10,
                      }}
                      placeholder={"0"}
                      placeholderTextColor="black"
                      keyboardType="numeric"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        padding: 5,
                        color: "black",
                        paddingTop: 0,
                      }}
                    >
                      :
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        color: "black",
                        borderBottomColor: "black",
                        paddingLeft: 10,
                      }}
                      placeholder={"0"}
                      placeholderTextColor="black"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      marginBottom: 10,
                      resizeMode: "contain",
                    }}
                    defaultSource={require("../image/wainting.png")}
                    source={{
                      uri: "https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d2_j1j6qJsBq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552332",
                      cache: "default",
                    }}
                  />
                  <Text style={{ fontWeight: "500", color: "black" }}>
                    {"Marseille"}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                margin: 20,
                marginTop: 0,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gray" }}>Ponctualité:</Text>
              <View style={{ marginLeft: 10, flexDirection: "row" }}>
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
              </View>
            </View>
            <View
              style={{
                margin: 20,
                marginTop: 0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gray" }}>FAir play:</Text>
              <View style={{ marginLeft: 10, flexDirection: "row" }}>
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
                <Ionicons
                  style={{ marginTop: 0, paddingLeft: 10 }}
                  name="star-outline"
                  size={18}
                  color={"lightgray"}
                />
              </View>
            </View>
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
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {modalAskmatchPlace}
      {modalMessagePlace}
    </SafeAreaView>
  );
}
