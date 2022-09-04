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
  ImageBackground,
  StatusBar,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign as IconAnt, Feather as Icon } from "@expo/vector-icons";
import AccordionListItem from "../components/AccordionListItem";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import _GLobal_Link from "../components/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addSome } from "../features/addTeamModalSlice";
import { useSelector, useDispatch } from "react-redux";
import sportjson from "../components/sport.json";
// import { json } from "express";
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
export default function CurrentTeam({ navigation, route }) {
  const __last_Id_for_teammember = useSelector(
    (state) => state._notification.__last_Id_for_teammember_value
  );

  const countNotif = useSelector(
    (state) => state._notification.countNotification
  );

  const { who, data } = route.params;
  const dispatch = useDispatch();
  const [isloading, setisloading] = React.useState(false);
  const [tokens, settokens] = useState(null);
  const [pageImage, setpageImage] = useState(
    _GLobal_Link._link_simple + data.cover.replace("public", "storage")
  );
  const [logo, setlogo] = useState(
    _GLobal_Link._link_simple + data.logo.replace("public", "storage")
  );
  const [askMatch, setaskMatch] = useState(false);
  const [statusBarColor, setStatusBarColor] = useState("white");

  const [placeValue, setPlaceValue] = useState(null);

  //
  const [date, setDate] = useState(
    new Date().getDate() +
      " / " +
      (1 + new Date().getMonth()) +
      " / " +
      new Date().getFullYear()
  );
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [hours, SetHours] = useState(
    new Date().getHours() + " / " + new Date().getMinutes()
  );
  const [dateValue, setdateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());

  const [askerMatchSportName, setaskerMatchSportName] = useState(null);
  const [askerMatchTeamName, setaskerMatchTeamName] = useState(null);
  const [connected_user, setconnected_user] = useState(null);
  const [joinStatus, setjoinStatus] = useState(null);
  const [userName, setuserName] = useState("");
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [value_2, setValue_2] = useState(null);
  const [isFocus_2, setIsFocus_2] = useState(false);

  const [btnText, setbtnText] = useState("Valider");

  const [getTeams, setTeams] = useState([]);
  const renderLabel_2 = () => {
    if (value_2 || isFocus_2) {
      return (
        <Text style={[styles.label, isFocus_2 && { color: "#4399fe" }]}>
          Sélectionner une équipe
        </Text>
      );
    }
    return null;
  };
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    console.log(selectedDate);
    setdateValue(new Date(selectedDate));
    setDate(
      selectedDate.getDate() +
        " / " +
        (1 + selectedDate.getMonth()) +
        " / " +
        selectedDate.getFullYear()
    );

    // console.log(
  };

  const onChangeTime = (event, selectedDate) => {
    setShowTime(Platform.OS === "ios");
    setTimeValue(new Date(selectedDate));
    SetHours(
      selectedDate.getHours() + " / " + selectedDate.getMinutes()
      // " / " +
      // selectedDate.getSeconds()
    );
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const showTimepicker = () => {
    setShowTime(true);
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
      if (who != "me") {
        axios
          .get(_GLobal_Link._link_simple + "api/get_teams/" + tokens, {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          })
          .then((res) => {
            Object.values(res.data).map((data__, key) => {
              if (data__.sport_name == data.sport_name) {
                setaskerMatchSportName(data__.sport_name);
                setaskerMatchTeamName(data__.team_name);
              }
            });
          })
          .catch((error) => console.log(error));

        axios
          .get(
            _GLobal_Link._link_simple +
              "api/checkTeamJoinedStatus/" +
              data.team_name +
              "/" +
              who +
              "/" +
              tokens,
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,
              },
            }
          )
          .then((res) => {
            if (res.data.length > 0) {
              setjoinStatus(res.data[0].status);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [tokens]);

  const teamebody = () => {
    return (
      <View>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: "white", marginBottom: 20 }}>
                <Text style={{ margin: 5, alignSelf: "center", color: "gray" }}>
                  {data.team_name} - {data.sport_name} -{" "}
                  <Ionicons name="football" size={15} color={"#b07c6d"} />
                </Text>
              </View>
              {/* <AccordionListItem title={
                                <> <Ionicons style={{ margin: 5 }} name='trophy-outline' size={20} color={'#b07c6d'} />  <Text style={{ fontSize: 16, backgroundColor: 'white', color: 'gray' }}>Palmarès</Text>  </>}>
                                <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>Printemps 2021</Text>
                                        <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>3ème place</Text>
                                        <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', }}>
                                            <Ionicons style={{ margin: 5 }} name='medal-outline' size={25} color={'#b07c6d'} />
                                        </Text>
                                    </View>
                                    <View style={{ borderTopWidth: 1, width: "100%", borderColor: '#EFEFEF', padding: 10 }}>
                                        <AccordionListItem title={'Voir classement de la saison'}>
                                            <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        1er <Ionicons style={{ margin: 5 }} name='medal-outline' size={15} color={'#b07c6d'} />
                                                    </Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>P.S.G</Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        15V / 7D/ 0N
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        2ème <Ionicons style={{ margin: 5 }} name='medal-outline' size={15} color={'#b07c6d'} />
                                                    </Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>Barcelone</Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        12V / 5D/ 2N
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        3ème <Ionicons style={{ margin: 5 }} name='medal-outline' size={15} color={'#b07c6d'} />
                                                    </Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>Barcelone</Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        10V / 5D/ 2N
                                                    </Text>
                                                </View>
                                            </View>
                                        </AccordionListItem>

                                        <AccordionListItem title={'Voir Liste des match'}>
                                            <View>
                                                <View style={{
                                                    padding: 20,
                                                    borderBottomColor: 'lightgray',
                                                    borderBottomWidth: 1,
                                                    backgroundColor: "white",
                                                }}>
                                                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "500", color: "black" }}>{'FootBall'}</Text>
                                                    <Text style={{ alignSelf: "center", color: "gray", marginTop: 10 }}>{'12/20/2021'}</Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, alignItems: "center" }}>
                                                        <View style={{ alignItems: "center" }}>
                                                            <Image style={{ height: 70, width: 70, marginBottom: 10, resizeMode: 'contain' }} defaultSource={require('../image/wainting.png')} source={{ uri: 'https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d8_VfT-LVj79vN0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552364', cache: 'default' }} />
                                                            <Text style={{ fontWeight: "500", color: "black" }}>{'PSG'}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", }}>
                                                            <View>
                                                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>{2}</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>:</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>{1}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ alignItems: "center" }}>
                                                            <Image style={{ height: 70, width: 70, marginBottom: 10, resizeMode: 'contain' }} defaultSource={require('../image/wainting.png')} source={{ uri: 'https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d2_j1j6qJsBq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552332', cache: 'default' }} />
                                                            <Text style={{ fontWeight: "500", color: "black" }}>{'Marseille'}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                        </AccordionListItem>
                                    </View>
                                </View>

                                <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>Hiver 2021</Text>
                                        <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>6ème place</Text>
                                        <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', }}>
                                            <Ionicons style={{ margin: 5 }} name='medal-outline' size={25} color={'#cac5bf'} />
                                        </Text>
                                    </View>
                                    <View style={{ borderTopWidth: 1, width: "100%", borderColor: '#EFEFEF', padding: 10 }}>
                                        <AccordionListItem title={'Voir classement de la saison'}>
                                            <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        1er <Ionicons style={{ margin: 5 }} name='medal-outline' size={15} color={'#b07c6d'} />
                                                    </Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>P.S.G</Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        15V / 7D/ 0N
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        2ème <Ionicons style={{ margin: 5 }} name='medal-outline' size={15} color={'#b07c6d'} />
                                                    </Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>Barcelone</Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        12V / 5D/ 2N
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ borderWidth: 1, width: "100%", borderColor: '#EFEFEF', borderTopWidth: 0 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        3ème <Ionicons style={{ margin: 5 }} name='medal-outline' size={15} color={'#b07c6d'} />
                                                    </Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>Barcelone</Text>
                                                    <Text style={{ borderRightWidth: 1, padding: 5, borderColor: '#EFEFEF', flex: 1 }}>
                                                        10V / 5D/ 2N
                                                    </Text>
                                                </View>
                                            </View>
                                        </AccordionListItem>

                                        <AccordionListItem title={'Voir Liste des match'}>
                                            <View>
                                                <View style={{
                                                    padding: 20,
                                                    borderBottomColor: 'lightgray',
                                                    borderBottomWidth: 1,
                                                    backgroundColor: "white",
                                                }}>
                                                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "500", color: "black" }}>{'FootBall'}</Text>
                                                    <Text style={{ alignSelf: "center", color: "gray", marginTop: 10 }}>{'12/20/2021'}</Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, alignItems: "center" }}>
                                                        <View style={{ alignItems: "center" }}>
                                                            <Image style={{ height: 70, width: 70, marginBottom: 10, resizeMode: 'contain' }} defaultSource={require('../image/wainting.png')} source={{ uri: 'https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d8_VfT-LVj79vN0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552364', cache: 'default' }} />
                                                            <Text style={{ fontWeight: "500", color: "black" }}>{'PSG'}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", }}>
                                                            <View>
                                                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>{2}</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>:</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>{1}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ alignItems: "center" }}>
                                                            <Image style={{ height: 70, width: 70, marginBottom: 10, resizeMode: 'contain' }} defaultSource={require('../image/wainting.png')} source={{ uri: 'https://ik.imagekit.io/jimmyBull/580b57fcd9996e24bc43c4d2_j1j6qJsBq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615552332', cache: 'default' }} />
                                                            <Text style={{ fontWeight: "500", color: "black" }}>{'Marseille'}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                        </AccordionListItem>
                                    </View>
                                </View>
                            </AccordionListItem> */}
            </View>
          </View>
          <View style={{ justifyContent: "center", marginTop: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "black", marginBottom: 10, color: "gray" }}>
                {data.city}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", fontWeight: "700" }}>
                Trophées remportés
              </Text>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 15, color: "gray" }}>1</Text>
                  <Ionicons
                    style={{ margin: 5, marginTop: 0 }}
                    name="medal-outline"
                    size={25}
                    color={"#bdbfba"}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 15, color: "gray" }}>2</Text>
                  <Ionicons
                    style={{ margin: 5, marginTop: 0 }}
                    name="medal-outline"
                    size={25}
                    color={"#ffd700"}
                  />
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 15, color: "gray" }}>0</Text>
                  <Ionicons
                    style={{ margin: 5, marginTop: 0 }}
                    name="medal-outline"
                    size={25}
                    color={"#cac5bf"}
                  />
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 15, color: "gray" }}>2</Text>
                  <Ionicons
                    style={{ margin: 5, marginTop: 0 }}
                    name="medal-outline"
                    size={25}
                    color={"#b07c6d"}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={{ padding: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', marginBottom: 10, fontWeight: '700' }}>Membres de l'équipe</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: "wrap", marginTop: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{
                            marginTop: 0,
                            marginBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Image style={{ width: 100, height: 100, backgroundColor: "lightgray", position: "relative", zIndex: 1, resizeMode: 'cover', borderRadius: 2 }}
                                defaultSource={require('../image/wainting.png')}
                                source={{
                                    uri: 'https://img.search.brave.com/_r2t_w-DWC8bmp8SbpccPFDJUwP8MAzg__yMxPa9R0g/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/emJydXNoY2VudHJh/bC5jb20vdXBsb2Fk/cy9kZWZhdWx0L29w/dGltaXplZC80WC81/L2QvMC81ZDAzNmUx/YjdjNDAxZDQ4MWZk/MzI0YWUzMmIyYzQy/ZjU3OGJmYzNhXzJf/MTIwMHgxMjAwLmpw/ZWc',
                                    cache: 'default'
                                }} />
                            <Text style={{ color: 'darkgray', marginBottom: 10, alignItems: 'center', marginTop: 5, }}>Bull Jimmy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 0,
                            marginBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Image style={{ width: 100, height: 100, backgroundColor: "lightgray", position: "relative", zIndex: 1, resizeMode: 'cover', borderRadius: 2 }}
                                defaultSource={require('../image/wainting.png')}
                                source={{
                                    uri: 'https://img.search.brave.com/O2Xcf8m__4vGq_EPnenofeBStw5OLqr_ruI-_KgTViE/rs:fit:1200:1024:1/g:ce/aHR0cHM6Ly9zdGF0/aWMuYmlsbGJvYXJk/LmNvbS9maWxlcy9t/ZWRpYS9wdXNoYS10/LW1hcmNoLTIwMTYt/YmlsbGJvYXJkLTE1/NDgtY29tcHJlc3Nl/ZC5qcGc',
                                    cache: 'default'
                                }} />
                            <Text style={{ color: 'darkgray', marginBottom: 10, alignItems: 'center', marginTop: 5, }}>Ello yannick</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 0,
                            marginBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Image style={{ width: 100, height: 100, backgroundColor: "lightgray", position: "relative", zIndex: 1, resizeMode: 'cover', borderRadius: 2 }}
                                defaultSource={require('../image/wainting.png')}
                                source={{
                                    uri: 'https://img.search.brave.com/EzlF3IYiCA028k3EXQCA0AcIHlIpq1-s85LI0WSiKWg/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9maWxl/MS5jbG9zZXJtYWcu/ZnIvdmFyL2Nsb3Nl/cm1hZy9zdG9yYWdl/L2ltYWdlcy9iaW8t/cGVvcGxlL2Jpb2dy/YXBoaWUta2FueWUt/d2VzdC0xMTI0MjEv/ODE4ODI5LTEtZnJl/LUZSL0thbnllLVdl/c3QuanBnP2FsaWFz/PWV4YWN0MTAyNHg3/NjhfbA',
                                    cache: 'default'
                                }} />
                            <Text style={{ color: 'darkgray', marginBottom: 10, alignItems: 'center', marginTop: 5, }}>Jean marc</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

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
              style={{ marginTop: 0 }}
              name="star"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star-half"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
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
              style={{ marginTop: 0 }}
              name="star"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star-half"
              size={18}
              color={"#ffd700"}
            />
            <Ionicons
              style={{ marginTop: 0 }}
              name="star-outline"
              size={18}
              color={"lightgray"}
            />
          </View>
        </View>
      </View>
    );
  };

  const sendAskedGame = () => {
    if (placeValue == null || placeValue.length == 0 || placeValue == "") {
      Alert.alert("Erreur", "Veuillez entrez le lieu du match", [
        {
          text: "Fermer",
          style: "cancel",
        },
      ]);
    } else {
      setbtnText("Demande en cour ...");
      let dateOfgame = dateValue;
      // dateValue.getDate() +
      // "-" +
      // (1 + dateValue.getMonth()) +
      // "-" +
      // dateValue.getFullYear();
      let hoursOfgame = timeValue.getHours() + "H" + timeValue.getMinutes();
      axios
        .get(
          _GLobal_Link._link_simple +
            "api/askeforgame/" +
            who +
            "/" +
            dateOfgame +
            "/" +
            hoursOfgame +
            "/" +
            placeValue +
            "/" +
            askerMatchTeamName +
            "/" +
            data.team_name +
            "/" +
            tokens,
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((res) => {
          if (res.data == "good") {
            if (expoPushToken != null) {
              expoPushToken.forEach((element) => {
                if (element.token != "undefined") {
                  const message = {
                    to: element.token,
                    sound: "default",
                    title: "Demande de match",
                    body:
                      userName + " vous a envoyé(é) une demande de match ! ",
                    data: {
                      tonavigate: "GameAsked",
                      who: who,
                      token: tokens,
                      notification_actions: "GameAsked_actions",
                      message:
                        userName + " vous a envoyé(é) une demande de match ! ",
                      who_sent: connected_user,
                    },
                  };
                  axios({
                    method: "POST",
                    url: "https://exp.host/--/api/v2/push/send",
                    headers: {
                      Accept: "application/json",
                      "Accept-encoding": "gzip, deflate",
                      "Content-Type": "application/json",
                    },
                    data: JSON.stringify(message),
                  })
                    .then((res) => {
                      console.log(res.data.data.status);
                    })
                    .catch((error) => console.log(error));
                }
              });
              setaskMatch(false);
              setPlaceValue(null);
              setbtnText("Valider");
            }
          } else {
            Alert.alert("Information", res.data, [
              {
                text: "Fermer",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]);
            setaskMatch(false);
            setPlaceValue(null);
            setbtnText("Valider");
          }
        })
        .catch((error) => console.log(error));
    }
  };
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
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Demande de Match</Text>
              <TouchableOpacity
                onPress={() => {
                  setaskMatch(false), setStatusBarColor("white");
                }}
              >
                <Ionicons name="close" size={25} color={"black"} />
              </TouchableOpacity>
            </View>
            <View>
              {Platform.OS === "android" ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      showDatepicker();
                    }}
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Date:</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          alignItems: "center",
                          borderRadius: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          borderColor: "lightgray",
                        }}
                      >
                        <Text style={{ color: "gray" }}>
                          {" "}
                          {date.split("/")[0]}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          alignItems: "center",
                          borderRadius: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          borderColor: "lightgray",
                        }}
                      >
                        <Text style={{ color: "gray" }}>
                          {" "}
                          {date.split("/")[1]}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          alignItems: "center",
                          borderRadius: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          borderColor: "lightgray",
                        }}
                      >
                        <Text style={{ color: "gray" }}>
                          {" "}
                          {date.split("/")[2]}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      showTimepicker();
                    }}
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 15,
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Date:</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          alignItems: "center",
                          borderRadius: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          borderColor: "lightgray",
                        }}
                      >
                        <Text style={{ color: "gray" }}>
                          {" "}
                          {hours.split("/")[0]}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          alignItems: "center",
                          borderRadius: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          borderColor: "lightgray",
                        }}
                      >
                        <Text style={{ color: "gray" }}>
                          {" "}
                          {hours.split("/")[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
              {Platform.OS === "ios" ? (
                <>
                  <TouchableOpacity
                    // onPress={showDatepicker}
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>Date:</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      {
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={dateValue}
                          mode={"date"}
                          is24Hour={true}
                          onChange={onChange}
                          display="default"
                          themeVariant="light"
                          minimumDate={new Date()}
                          locale="fr-FR"
                          positiveButtonLabel="OK!"
                        />
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={showTimepicker}
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>Heures:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={timeValue}
                          mode={"time"}
                          is24Hour={true}
                          onChange={onChangeTime}
                          display="default"
                          confirmBtnText="OK"
                          cancelBtnText="Fermer"
                          themeVariant="light"
                        />
                      }
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}

              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Stade:</Text>
                <TextInput
                  style={{
                    borderBottomWidth: 0.5,
                    // borderRadius: 5,
                    // fontWeight: "bold",
                    flex: 1,
                    paddingLeft: 5,
                    borderBottomColor: "gray",
                  }}
                  placeholder={"Lieu du match"}
                  placeholderTextColor={"gray"}
                  onChangeText={(e) => {
                    setPlaceValue(e);
                  }}
                />
              </View>
              {/* <View style={styles.container}>
                {renderLabel_2()}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus_2 && { borderColor: "#4399fe" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={getTeams}
                  search
                  // maxHeight={300}
                  labelField="team_name"
                  valueField="team_name"
                  placeholder={!isFocus_2 ? "Sélectionner une équipe" : "..."}
                  searchPlaceholder="Rechercher..."
                  value={value_2}
                  onFocus={() => setIsFocus_2(true)}
                  onBlur={() => {
                    setIsFocus_2(false);
                  }}
                  onChange={(item) => {
                    setValue_2(item.team_name);
                    setIsFocus_2(false);
                  }}
                  renderLeftIcon={() => (
                    <IconAnt
                      style={styles.icon}
                      color={isFocus_2 ? "#4399fe" : "gray"}
                      name="Safety"
                      size={20}
                    />
                  )}
                />
              </View> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
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
                onPress={sendAskedGame}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  {btnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1080, 1080],
      quality: 1,
      allowsMultipleSelection: true,
    }); //
    if (!result.cancelled) {
      setpageImage(result.uri);
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();

      if (tokens != null) {
        formData.append("id", data.id);
        formData.append("token", tokens);
        formData.append("image", { uri: localUri, name: filename, type: type });

        await fetch(_GLobal_Link._link_simple + "api/update_team_cover_image", {
          method: "post",
          body: formData,
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN":
              "FO8NrbEjBKM73orM5NbemvwGiFyis8krYcy5MwAYz7BwkoWf1n09oMr6D36iFuHlSGOlFqOvoeWDsCntiIEOX8GZpIP3LglDbbCH",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            dispatch(addSome());
            console.log(response);
          })
          .catch((error) => console.log(error));
        // axios
        //   .post(
        //     _GLobal_Link._link_simple + "api/update_team_cover_image",
        //     formData,
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Origin": true,
        //         "Content-Type": "multipart/form-data",
        //         "X-CSRF-TOKEN":
        //           "FO8NrbEjBKM73orM5NbemvwGiFyis8krYcy5MwAYz7BwkoWf1n09oMr6D36iFuHlSGOlFqOvoeWDsCntiIEOX8GZpIP3LglDbbCH",
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res.data);
        //     dispatch(addSome());
        //   })
        //   .catch((error) => console.log(error));
      }
    }
  };
  const pickImage_2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [150, 150],
      quality: 1,
      allowsMultipleSelection: true,
    }); //
    if (!result.cancelled) {
      setlogo(result.uri);
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();

      if (tokens != null) {
        formData.append("id", data.id);
        formData.append("token", tokens);
        formData.append("image", { uri: localUri, name: filename, type: type });
        await fetch(_GLobal_Link._link_simple + "api/update_team_logo_image", {
          method: "post",
          body: formData,
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN":
              "FO8NrbEjBKM73orM5NbemvwGiFyis8krYcy5MwAYz7BwkoWf1n09oMr6D36iFuHlSGOlFqOvoeWDsCntiIEOX8GZpIP3LglDbbCH",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            dispatch(addSome());
            console.log(response);
          })
          .catch((error) => console.log(error));
        // axios
        //   .post(
        //     _GLobal_Link._link_simple + "api/update_team_logo_image",
        //     formData,
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Origin": true,
        //         "Content-Type": "multipart/form-data",
        //         "X-CSRF-TOKEN":
        //           "FO8NrbEjBKM73orM5NbemvwGiFyis8krYcy5MwAYz7BwkoWf1n09oMr6D36iFuHlSGOlFqOvoeWDsCntiIEOX8GZpIP3LglDbbCH",
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res.data);
        //     dispatch(addSome());
        //   })
        //   .catch((error) => console.log(error));
      }
    }
  };
  const teamebodyPlace = useMemo(() => teamebody(), []);
  const modalAskmatchPlace = useMemo(
    () => modalAskmatch(hours, date, askMatch, show, showTime),
    [hours, date, askMatch, show, showTime, placeValue, btnText]
  );

  const joinTeam = () => {
    if (expoPushToken != null) {
      expoPushToken.forEach((element) => {
        if (element.token != "undefined") {
          const message = {
            to: element.token,
            sound: "default",
            title: "Demande d'intégration",
            body:
              userName +
              " veut rejoindre votre équipe de " +
              data.sport_name +
              "!",
            data: {
              tonavigate: "Integration",
              who: who,
              token: tokens,
              notification_actions: "integration_actions",
              message:
                userName +
                " veut rejoindre votre équipe de " +
                data.sport_name +
                "!",
              who_sent: connected_user,
              team__: data.team_name,
            },
          };
          axios({
            method: "POST",
            url: "https://exp.host/--/api/v2/push/send",
            headers: {
              Accept: "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            data: JSON.stringify(message),
          })
            .then((res) => {
              console.log(res.data.data.status);
            })
            .catch((error) => console.log(error));
        }
      });
    }

    setjoinStatus("pending");
  };
  useEffect(() => {
    if (tokens != null) {
      axios
        .get(`${_GLobal_Link._link_simple}api/getCurrentUsermail/${tokens}`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setconnected_user(res.data);
        })
        .catch((error) => console.log(error));
      axios
        .get(_GLobal_Link._link_simple + "api/getUserName/" + tokens, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((res) => {
          setuserName(res.data[0].name + " " + res.data[0].lastname);
        })
        .catch((error) => console.log(error));
    }
  });
  useEffect(() => {
    axios
      .get(
        _GLobal_Link._link_simple + "api/getNotifTokens/" + tokens + "/" + who,
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
        setExpoPushToken(res.data);
      })
      .catch((error) => console.log(error));
  }, [tokens]);

  useEffect(() => {
    // if (tokens != null) {
    //   axios
    //     .get(_GLobal_Link._link_simple + "api/get_teams/" + tokens, {
    //       headers: {
    //         "content-type": "application/json",
    //         "Access-Control-Allow-Credentials": true,
    //         "Access-Control-Allow-Origin": true,
    //       },
    //     })
    //     .then((res) => {
    //       setTeams(res.data);
    //       console.log(res.data);
    //       // setLoading(false);
    //     })
    //     .catch((error) => console.log(error));
    // }
  }, [tokens]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          animated={true}
          backgroundColor={statusBarColor}
          barStyle={"dark-content"}
        />
        {/* <Text>{joinStatus}</Text> */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1, width: Dimensions.get("window").width }}
        >
          <ImageBackground
            source={{ uri: pageImage }}
            resizeMode="cover"
            style={{
              height: 200,
              width: Dimensions.get("window").width,
              backgroundColor: "lightgray",
            }}
          >
            {who == "me" ? (
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  zIndex: 3,
                  borderRadius: 5,
                  flexDirection: "row",
                }}
              >
                <Ionicons
                  style={{ margin: 5 }}
                  name="create"
                  size={25}
                  color={"white"}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </ImageBackground>
          <View
            style={{
              marginTop: -30,
              alignItems: "center",
              justifyContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View
                style={{
                  borderRadius: 2,
                }}
              >
                {who == "me" ? (
                  <Ionicons
                    onPress={pickImage_2}
                    style={{ margin: 5, position: "absolute", zIndex: 1000 }}
                    name="create"
                    size={25}
                    color={"white"}
                  />
                ) : (
                  <></>
                )}

                <Image
                  style={{
                    width: 140,
                    height: 140,
                    backgroundColor: "lightgray",
                    position: "relative",
                    zIndex: 1,
                    resizeMode: "cover",
                    borderRadius: 2,
                  }}
                  defaultSource={require("../image/wainting.png")}
                  source={{ uri: logo, cache: "default" }}
                />

                {/* <Text style={{ alignSelf: 'center', marginTop: 30, color: 'white', position: 'absolute' }}>Didier Drogba </Text> */}
              </View>
            </View>

            <View>
              {who == "me" ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("GameAsked");
                  }}
                  style={{
                    marginTop: 10,
                    borderRadius: 5,
                    alignSelf: "center",
                    height: 30,
                    justifyContent: "center",
                    flexDirection: "row",
                    backgroundColor: "whitesmoke",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      margin: 5,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    Voir les demandes match
                  </Text>
                  <Ionicons
                    style={{ color: "gray" }}
                    name="game-controller-outline"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              ) : data.status == undefined ? (
                joinStatus == undefined ||
                joinStatus == "declined" ||
                joinStatus == null ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (askerMatchSportName != null) {
                        setaskMatch(true), setStatusBarColor("rgba(0,0,0,0.3)");
                      } else {
                        Alert.alert(
                          "Problème",
                          "Pour demander un match, le sport de l'équipe que vous demandez doit correspondre à l'un de vos sports créés. Vous devez donc créer une équipe avec le sport : " +
                            data.sport_name,
                          [
                            {
                              text: "Fermer",
                              style: "cancel",
                            },
                          ]
                        );
                      }
                    }}
                    style={{
                      marginTop: 10,
                      borderRadius: 5,
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      backgroundColor: "whitesmoke",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "gray",
                        margin: 5,
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      Demande de match
                    </Text>
                    <Ionicons
                      style={{ color: "gray" }}
                      name="game-controller-outline"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              {who == "me" ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Integration")}
                  style={{
                    marginTop: 10,
                    borderRadius: 5,
                    alignSelf: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                    alignItems: "center",
                    height: 35,
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      margin: 5,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    Voir les demandes d'intégration
                  </Text>
                  {/* <Ionicons style={{ color: 'gray', }} name='add-circle-outline' size={20} color={'black'} /> */}
                </TouchableOpacity>
              ) : (
                <>
                  {data.status == undefined ? (
                    joinStatus == undefined || joinStatus == null ? (
                      Object.values(sportjson).map((data__, key) => {
                        if (
                          data__.label == data.sport_name &&
                          data__.type == "Collective"
                        ) {
                          return (
                            <>
                              <TouchableOpacity
                                onPress={joinTeam}
                                style={{
                                  marginTop: 10,
                                  borderRadius: 5,
                                  alignSelf: "center",
                                  justifyContent: "center",
                                  flexDirection: "row",
                                  backgroundColor: "whitesmoke",
                                  borderRadius: 5,
                                  alignItems: "center",
                                  padding: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "gray",
                                    margin: 5,
                                    marginTop: 0,
                                    marginBottom: 0,
                                  }}
                                >
                                  Integrer l'équipe
                                </Text>
                              </TouchableOpacity>
                            </>
                          );
                        }
                      })
                    ) : joinStatus == "accepeted" ? (
                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          borderRadius: 5,
                          alignSelf: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          backgroundColor: "whitesmoke",
                          borderRadius: 5,
                          alignItems: "center",
                          // height: 35
                          padding: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "gray",
                            margin: 5,
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                        >
                          Vous êtes membre de l'équipe !
                        </Text>
                      </TouchableOpacity>
                    ) : joinStatus == "declined" ? (
                      <></>
                    ) : (
                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          borderRadius: 5,
                          alignSelf: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          backgroundColor: "black",
                          borderRadius: 5,
                          alignItems: "center",
                          // height: 35
                          padding: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            margin: 5,
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                        >
                          Demande d'intégration envoyée !
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : data.status == "declined" ? (
                    Object.values(sportjson).map((data__, key) => {
                      if (
                        data__.label == data.sport_name &&
                        data__.type == "Collective"
                      ) {
                        return (
                          <>
                            <TouchableOpacity
                              onPress={joinTeam}
                              style={{
                                marginTop: 10,
                                borderRadius: 5,
                                alignSelf: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                backgroundColor: "whitesmoke",
                                borderRadius: 5,
                                alignItems: "center",
                                padding: 5,
                              }}
                            >
                              <Text
                                style={{
                                  color: "gray",
                                  margin: 5,
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                Integrer l'équipe
                              </Text>
                            </TouchableOpacity>
                          </>
                        );
                      }
                    })
                  ) : data.status == "accepeted" ? (
                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        borderRadius: 5,
                        alignSelf: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        backgroundColor: "whitesmoke",
                        borderRadius: 5,
                        alignItems: "center",
                        // height: 35
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          margin: 5,
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                      >
                        Vous êtes membre de l'équipe !
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        borderRadius: 5,
                        alignSelf: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        backgroundColor: "black",
                        borderRadius: 5,
                        alignItems: "center",
                        // height: 35
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          margin: 5,
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                      >
                        Demande d'intégration envoyée !
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
          {teamebodyPlace}
        </ScrollView>
      </SafeAreaView>
      {modalAskmatchPlace}
      {Platform.OS === "android" ? (
        <>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateValue}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
              display="default"
              themeVariant="light"
              minimumDate={new Date()}
              locale="fr-FR"
              positiveButtonLabel="Valider"
              onTouchCancel={() => alert(ok)}
            />
          )}
          {showTime && (
            <DateTimePicker
              testID="TimePicker"
              value={timeValue}
              mode={"time"}
              is24Hour={true}
              onChange={onChangeTime}
              display="default"
              confirmBtnText="OK"
              cancelBtnText="Fermer"
              themeVariant="light"
            />
          )}
        </>
      ) : (
        <></>
      )}
    </View>
  );
}
