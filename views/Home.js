import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Animated,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BottomSheet from "react-native-gesture-bottom-sheet";
//  import VideoPlayer from "react-native-video-controls";
// import SearchBlock from "../components/SearchBlock";

import BottomPost from "../components/BottomPost";
import PostBody from "../components/PostBody";
// import PostCarousel from "../components/PostCarousel";
import PostHeader from "../components/PostHeader";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import _GLobal_Link from "../components/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imageData = [
  {
    id: 0,
    images: [
      {
        id: 0,
        image:
          "https://media.istockphoto.com/photos/soccer-player-kicks-a-ball-picture-id1163749879?k=20&m=1163749879&s=170667a&w=0&h=9FFbqQv6ZZ_WXS-FzzPtkBqr0h2Y2d6GLpdYBVsfitc=",
        idImageSub: 0,
        imageDimension: 560 / 308,
      },

      {
        id: 1,
        image:
          "https://images.fineartamerica.com/images-medium-large-5/4-soccer-player-kicking-ball-in-stadium-dmytro-aksonov.jpg",
        idImageSub: 1,
        imageDimension: 900 / 540,
      },
      {
        id: 2,
        image:
          "https://mazwai.com/videvo_files/video/free/2015-05/small_watermarked/davide_quatela--breathing_barcelona_preview.webm",
        idImageSub: 2,
        imageDimension: 1104 / 736,
      },
    ],
    posterName: "Jimmy Bull",
    city: "Lille",
    country: "France",
    postId: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    description:
      "Your daily reminder to leave that headache alone tuifdyufidyfudf dfydfuidfiduf dfdufidff dfuydfdf dfudfdf ",
    postType: "regular",
  },
  {
    id: 1,
    images: [
      {
        id: 0,
        image:
          "https://mazwai.com/videvo_files/video/free/2019-09/small_watermarked/190828_07_MarinaBayatNightDrone_UHD_03_preview.webm",
        idImageSub: 2,
        imageDimension: 1104 / 736,
      },
      {
        id: 1,
        image: "https://i.insider.com/5fbe52b350e71a00115574c4",
        idImageSub: 0,
        imageDimension: 2000 / 1333,
      },

      {
        id: 2,

        image:
          "https://www.sportbible.com/cdn-cgi/image/width=1200,quality=70,format=jpeg,fit=contain,dpr=1/https%3A%2F%2Fs3-images.sportbible.com%2Fs3%2Fcontent%2F082ccc875faaad535ceae275c4515a26.png",
        idImageSub: 1,

        imageDimension: 1200 / 675,
      },
    ],
    posterName: "Jean-marc",
    city: "Montpellier",
    country: "France",
    postId: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    description: " On vend la neige, nous on va pas au ski",
    postType: "regular",
    idImage: 1,
  },

  {
    id: 2,
    images: [
      {
        id: 0,
        image:
          "https://media.newyorker.com/photos/59095186019dfc3494e9dab5/master/w_2560%2Cc_limit/457771195-290.jpg",
        idImageSub: 0,
        imageDimension: 290 / 435,
      },

      {
        id: 1,
        image:
          "https://www.kxan.com/wp-content/uploads/sites/40/2021/09/aaron-lowe.jpeg?strip=1",
        idImageSub: 1,

        imageDimension: 2965 / 1667,
      },
      {
        id: 2,
        image:
          "https://mazwai.com/videvo_files/video/free/2019-09/small_watermarked/190828_07_MarinaBayatNightDrone_UHD_03_preview.webm",
        idImageSub: 2,
        imageDimension: 1104 / 736,
      },
    ],
    posterName: "Paul enry",
    city: "Caen",
    country: "France",
    postId: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    description: " On vend la neige, nous on va pas au ski",
    postType: "regular",
    idImage: 1,
  },
  {
    id: 3,
    equipe1: "PSG",
    equipe2: "Marseille",
    logo1:
      "https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d8_VfT-LVj79vN0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552364",
    logo2:
      "https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d2_j1j6qJsBq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552332",
    date: "05/01/2022",
    sport: "Football",
    postId: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6358",
    score1: 3,
    score2: 1,
    postType: "automatique",
    description:
      "Thank you all for the birthday wishes 💙 more life and more music",
  },
  {
    id: 4,
    images: [
      {
        id: 0,
        image:
          "https://www.scisports.com/wp-content/uploads/2019/07/ContributionRatings-Visual-Messi-1920-1280x720.jpg",
        idImageSub: 0,
        imageDimension: 1280 / 720,
      },

      {
        id: 1,
        image:
          "https://athlonsports.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgyMDIzMTM2NjM5MzI5NDEx/10-oldest-players-in-nfl-history.jpg",
        idImageSub: 1,

        imageDimension: 1200 / 900,
      },
      {
        id: 2,
        image:
          "https://mazwai.com/videvo_files/video/free/2019-09/small_watermarked/190828_07_MarinaBayatNightDrone_UHD_03_preview.webm",
        idImageSub: 2,
        imageDimension: 1104 / 736,
      },
    ],
    posterName: "Kouadio",
    city: "Paris",
    country: "France",
    postId: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    description: " On vend la neige, nous on va pas au ski",
    postType: "regular",
    idImage: 1,
  },
];

styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    fontSize: 16,
    paddingLeft: 40,
    color: "gray",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
  },
  grid: {
    borderColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  automatiquePost: {
    padding: 20,
    margin: 10,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
const Home = ({ navigation }) => {
  const countNotif = useSelector(
    (state) => state._notification.countNotification
  );

  const bottomSheet = useRef();
  const bottomSheetNotification = useRef();
  const videoRefCurrentTime = [];
  const [videoAspecRation, setvideoAspecRation] = useState(3961 / 5941);
  const [imageDataState, setimageDataState] = useState(imageData);
  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });
  const scrollX = [];
  const imageDomaine = "https://ik.imagekit.io/jimmyBull/";
  const VideoRef = [];
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const onViewRef = useRef(({ viewableItems, changed }) => {
    //   VideoRef[1].props.paused = false
    // console.log(changed)
    //setPp(false);
    // if (typeof videoExtraData["obj"] != 'undefined') {
    //     //   setVideoExtraData(oldState => { return { ...oldState, obj: { 1: false, 3: true } } })
    // }
  });
  const renderItem = ({ item }) => {
    return (
      <Item
        posterName={item.posterName}
        city={item.city}
        country={item.country}
        postType={item.postType}
        images={item.images}
        id={item.id}
        description={item.description}
        equipe1={item.equipe1}
        equipe2={item.equipe2}
        logo1={item.logo1}
        logo2={item.logo2}
        date={item.date}
        sport={item.sport}
        score1={item.score1}
        score2={item.score2}
        idImageSub={item.idImageSub}
      />
    );
  };
  const Item = ({
    posterName,
    city,
    country,
    description,
    images,
    postType,
    equipe1,
    equipe2,
    logo1,
    logo2,
    date,
    sport,
    score1,
    score2,
    id,
  }) => {
    VideoRef[id] = useRef(id).current;
    videoRefCurrentTime[id] = useRef().current;
    const field2 = (item) => {
      if (item.item.image.split(".")[1] != "mp4" && item.item.id == 0) {
        return (
          <View
            style={{
              borderColor: "white",
              borderRadius: 20,
            }}
          >
            <View
              style={{ marginBottom: 0, justifyContent: "flex-end", flex: 1 }}
            >
              {
                <Image
                  style={{
                    height: "auto",
                    width: windowWidth,
                    aspectRatio: item.item.imageDimension,
                    backgroundColor: "lightgray",
                    position: "relative",
                    zIndex: 1,
                    resizeMode: "cover",
                  }}
                  defaultSource={require("../image/wainting.png")}
                  source={{
                    uri: imageDomaine + item.item.image,
                    cache: "default",
                  }}
                />
              }
              {/* <ScrollView horizontal={true} style={{ position: 'absolute', zIndex: 3, alignSelf: "center", }} contentContainerStyle={{ padding: 10, }} >
                                  <TouchableOpacity>
                                      <Image style={{ height: 50, width: 50, borderRadius: 5, borderWidth: 1, borderColor: "red", marginLeft: 10 }} source={{ uri: 'https://static.onecms.io/wp-content/uploads/sites/20/2021/09/03/drake-3.jpg' }} />
                                  </TouchableOpacity>
                                  <TouchableOpacity>
                                      <Image style={{ height: 50, width: 50, borderRadius: 5, borderWidth: 1, marginLeft: 10 }} source={{ uri: 'https://static.onecms.io/wp-content/uploads/sites/20/2021/09/03/drake-3.jpg' }} />
                                  </TouchableOpacity>
                                  <TouchableOpacity>
                                      <Image style={{ height: 50, width: 50, borderRadius: 5, borderWidth: 1, marginLeft: 10 }} source={{ uri: 'https://static.onecms.io/wp-content/uploads/sites/20/2021/09/03/drake-3.jpg' }} />
                                  </TouchableOpacity>
                              </ ScrollView> */}
            </View>
          </View>
        );
      } else if (item.item.image.split(".")[1] == "mp4" && item.item.id == 0) {
        return (
          <View
            style={{
              aspectRatio: item.item.imageDimension,
              width: Dimensions.get("window").width,
            }}
          >
            {/* <VideoPlayer
                source={{ uri: imageDomaine + item.item.image }}
                style={{
                  aspectRatio: item.item.imageDimension,
                  width: Dimensions.get("window").width,
                }}
                ref={(el) => (VideoRef[id] = el)}
                onProgress={(data) =>
                  (videoRefCurrentTime[id] = data.currentTime)
                }
                toggleResizeModeOnFullscreen={false}
                rate={1.0}
                paused={true}
                disableVolume
                disableBack
                disableTimer
                disableSeekbar
                disablePlayPause
                disableFullscreen
                resizeMode="cover"
                // poster='https://ik.imagekit.io/pgveb8hjgfqg/sumaid-pal-singh-bakshi-BqeMgL8PWHE-unsplash_Q6l78vd-ezO.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1643204476134'
                // posterResizeMode='cover'
              /> */}
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.2)",
                width: "100%",
                height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("fullscreenVideo", {
                    videoLink: imageDomaine + item.item.image,
                    videoCurrentTime: videoRefCurrentTime[id],
                    id: id,
                    description: description,
                    imageDataState: imageDataState,
                  })
                }
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  borderRadius: 30,
                  alignSelf: "center",
                }}
              >
                <Icon
                  name="play"
                  size={30}
                  color="white"
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    };
    if (postType == "automatique") {
      return (
        <View>
          <View
            style={{
              padding: 20,
              borderBottomColor: "lightgray",
              borderBottomWidth: 1,
              backgroundColor: "white",
              // borderRadius: 5,
              // shadowOffset: {
              //     width: 0,
              //     height: 1,
              // },
              // shadowOpacity: 0.20,
              // shadowRadius: 1.41,

              // elevation: 2,
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
              {sport}
            </Text>
            <Text style={{ alignSelf: "center", color: "gray", marginTop: 10 }}>
              {date}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 20,
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
                  source={{ uri: logo1, cache: "default" }}
                />
                <Text style={{ fontWeight: "500", color: "black" }}>
                  {equipe1}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
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
                    {score1}
                  </Text>
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
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      padding: 5,
                      color: "black",
                      paddingTop: 0,
                    }}
                  >
                    {score2}
                  </Text>
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
                  source={{ uri: logo2, cache: "default" }}
                />
                <Text style={{ fontWeight: "500", color: "black" }}>
                  {equipe2}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <BottomPost
              description={description}
              id={id}
              color="white"
              imageDataState={imageDataState}
              navigation={navigation}
            />
          </View>
        </View>
      );
    } else if (postType == "regular") {
      scrollX[id] = useRef(new Animated.Value(0)).current;
      return (
        <>
          <View
            style={{
              display: "flex",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                padding: 15,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                paddingTop: 15,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
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
                    uri: "https://media.gqmagazine.fr/photos/60ec5b2f24ddaa5ec8e006aa/3:4/w_1500,h_2000,c_limit/Ronaldo-GettyImages-1325777568.jpg",
                  }}
                />
                <View style={{ marginLeft: 15 }}>
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "black" }}
                  >
                    {posterName}
                  </Text>
                  <Text style={{ color: "gray" }}>
                    {city}, {country}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                <Icon name="more-vertical" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <Animated.FlatList
            data={images}
            renderItem={field2}
            keyExtractor={(item) => item.id}
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX[id] } } }],
              { useNativeDriver: true }
            )}
            bounces={false}
            // style={{ marginLeft: 10, marginRight: 10, }}
          />
          {/* <View style={{ alignSelf: "center", flexDirection: "row", marginBottom: 10, }}>
                          {typeof images != 'undefined' && images.length > 1 ?
                              Object.keys(images).map((n) => {
                                  return <View key={n} style={{ backgroundColor: "lightgrey", height: 7, width: 7, marginLeft: 5, borderRadius: 7 }}></View>
                              })
                              : <></>
                          }
                          {images.length > 1 ?
                              <Animated.View style={{
                                  backgroundColor: "#4399fe", height: 7, width: 7, marginLeft: 5, borderRadius: 7, position: "absolute",
                                  transform: [{
                                      translateX: Animated.divide(scrollX[id], windowWidth).interpolate({
                                          inputRange: [0, 1],
                                          outputRange: [0, 12]
                                      })
                                  }]
                              }}
                              />
                              : <></>
                          }
                      </View> */}
          <BottomPost
            description={description}
            id={id}
            color="white"
            navigation={navigation}
            imageDataState={imageDataState}
          />
        </>
      );
    }
  };

  const [tokens, settokens] = useState(null);
  const [profilPhoto, setprofilPhoto] = useState(null);

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

//   useEffect(() => {
//     console.log(countNotif);
//   });

  useEffect(() => {
    if (tokens != null) {
      axios
        .get(
          _GLobal_Link._link_simple + "api/get_profil_image" + "/" + tokens,
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((res) => {
          setprofilPhoto(
            _GLobal_Link._link_simple + res.data.replace("public", "storage")
          );
        })
        .catch((error) => console.log(error));
    }
  }, [tokens]);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={"dark-content"}
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "rgba(220,220,220,0.2)" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            padding: 5,
            paddingBottom: 0,
            backgroundColor: "white",
          }}
        >
          <Image
            style={{ height: 60, width: 60, alignSelf: "center" }}
            defaultSource={require("../image/wainting.png")}
            source={require("../image/logo.png")}
          />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("TeamPage")}
              style={{
                backgroundColor: "white",
                width: 35,
                height: 35,
                marginLeft: 10,
                justifyContent: "center",
              }}
            >
              {/* <Icon style={{ alignSelf: 'center' }} onPress={() => bottomSheetNotification.current.show()} name="bell" color='black' size={20} /> */}
              <Ionicons
                style={{ alignSelf: "center" }}
                name="people-outline"
                size={20}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("GameAsked")}
              style={{
                backgroundColor: "white",
                width: 35,
                height: 35,
                marginLeft: 10,
                justifyContent: "center",
              }}
            >
              {/* <Icon style={{ alignSelf: 'center' }} onPress={() => bottomSheetNotification.current.show()} name="bell" color='black' size={20} /> */}
              <Ionicons
                style={{ alignSelf: "center" }}
                name="game-controller-outline"
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {/* 
                      <View>
                          <View style={{ position: "absolute", backgroundColor: "#4399fe", height: 10, width: 10, borderRadius: 5, top: 5, left: 30, zIndex: 100 }}></View>
                          <TouchableOpacity style={{ backgroundColor: "white", width: 35, height: 35, marginLeft: 10, justifyContent: 'center' }}>
                              <Icon style={{ alignSelf: 'center' }} onPress={() => bottomSheetNotification.current.show()} name="bell" color='black' size={20} />
                          </TouchableOpacity>
                      </View> */}

            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={{
                backgroundColor: "white",
                width: 35,
                height: 35,
                marginLeft: 10,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "red",
                  position: "absolute",
                  height: 18,
                  width: 18,
                  borderRadius: 9,
                  alignItems: "center",
                  justifyContent: "center",
                  left:15, top:0,zIndex:1000
                }}
              >
                <Text
                  style={{ position: "relative", fontSize: 10, color: "white", fontWeight:'bold' }}
                >
                  {countNotif}
                </Text>
              </View>

              <Icon
                onPress={() => navigation.navigate("Notification")}
                style={{ alignSelf: "center" }}
                name="bell"
                size={20}
                color={"black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", {
                  who: "me",
                })
              }
              style={{
                backgroundColor: "white",
                width: 35,
                height: 35,
                marginLeft: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 35, borderRadius: 17.5 }}
                defaultSource={require("../image/wainting.png")}
                source={{
                  uri: profilPhoto,
                  cache: "default",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {imageData.map((data, key) => (
            <>
              <PostHeader
                key={data.id}
                posterName={data.posterName}
                country={data.country}
                city={data.city}
                postType={data.postType}
              />
              <PostBody
                data={data.images}
                otherData={data}
                navigation={navigation}
              />
              <BottomPost
                description={data.description}
                id={data.id}
                color="white"
                navigation={navigation}
                imageDataState={imageDataState}
              />
            </>
          ))}
        </ScrollView>
        <BottomSheet
          hasDraggableIcon
          ref={bottomSheetNotification}
          height={Dimensions.get("window").height}
        ></BottomSheet>
      </SafeAreaView>
    </>
  );
};

export default Home;
