import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Dimensions
} from 'react-native';
 import {PESDK, PhotoEditorModal, Configuration} from 'react-native-photoeditorsdk';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from "react-native-gesture-bottom-sheet";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { AntDesign as IconAnt, Feather as Icon } from "@expo/vector-icons";

// import VideoPlayer from 'react-native-video-controls';

export default function PostBeforeModification({ navigation, route }) {

    console.log(data)
    const [image, setImage] = useState(null);
    const [current, setCurrent] = useState("monde");
    const txtInput = useRef();
    const oo = useRef();
    const whoCanSeePost = useRef();

    useEffect(() => {
    });
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)
    const { data } = route.params;
    const postElement = (data) => {
        return data.map((data) => {
            if (data.uri.split('.')[1] != 'mp4') {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('ImageModificator', {
                        image: data.uri
                    })} key={data.id} style={{
                        borderRadius: 5,
                        margin: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <Image style={{ width: (windowWidth / 2) - 20, height: 150, backgroundColor: "lightgray", position: "relative", zIndex: 1, resizeMode: 'cover', borderRadius: 5 }} defaultSource={require('../image/wainting.png')} source={{ uri: data.uri, cache: 'default' }} />
                        <View style={{ position: 'absolute', zIndex: 3, alignSelf: "flex-end", borderRadius: 5, flexDirection: "row", backgroundColor: 'rgba(0,0,0,0.4)' }}>
                            <Text style={{ color: 'white', margin: 5 }}>Modifier</Text>
                            <Icon style={{ margin: 5 }} onPress={() => navigation.navigate('ImageModificator', {
                                image: data.uri
                            })} name='edit' size={15} color={'white'} />
                        </View>
                    </TouchableOpacity>
                )
            } else if (data.uri.split('.')[1] == 'mp4') {
                { console.log(data.uri.split('.')[1]) }
                return <TouchableOpacity onPress={() => navigation.navigate('fullscreenVideo', {
                    videoLink: data.uri,
                })} key={data.id} style={{
                    width: (windowWidth / 2) - 20, height: 150, borderRadius: 5, margin: 10,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                }}>
                    {/* <VideoPlayer
                        source={{ uri: data.uri }}
                        style={{ height: '100%', width: '100%', borderRadius: 5, }}
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
                    /> */}
                    <View style={{ position: "absolute", alignSelf: "center", justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', height: '100%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('fullscreenVideo', {
                            videoLink: data.uri,
                        })} style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            width: 40, height: 40,
                            justifyContent: 'center', borderRadius: 20, alignSelf: "center",
                        }}>
                            <Icon name="play" size={20} color="white" style={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }
        })
    }
    const postElementFinal = useMemo(() => postElement(data), [data]);
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar
                animated={true}
                backgroundColor="whitesmoke"
                barStyle={"dark-content"}
            />
            <View style={{ padding: 20, justifyContent: "space-between", flexDirection: "row" }}>
                <Icon onPress={() => navigation.goBack()} name='arrow-left' size={30} color={'black'} />
                <TouchableOpacity>
                    <Text style={{ color: "#4399fe" }}>Publier</Text>
                </TouchableOpacity>
            </View>
            <View onPress={() => navigation.navigate('MessageResponse')} style={{ padding: 10, paddingBottom: 0, flexDirection: 'row', alignItems: "center", justifyContent: "space-between", flexWrap:'wrap'  }}>
                <View style={{ flexDirection: 'row', alignItems: "center", paddingBottom: 20, }}>
                    <Image style={{ aspectRatio: 5 / 5, width: 60 }} source={{ uri: 'https://ik.imagekit.io/jimmyBull/4043260-avatar-male-man-portrait_113269_3XZgZ6wB3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643615555036' }} />
                    <View style={{ marginLeft: 10, }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 18, fontWeight: "500", color: "#565656" }}>Bull Jimmy</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => whoCanSeePost.current.show()} style={{ backgroundColor: "#4399fe", padding: 10, borderRadius: 5, paddingBottom: 5, paddingTop: 5,    }} >
                    <View style={{ alignItems: 'center', flexDirection: "row",}}>
                        <Ionicons name="planet-outline" size={20} color="whitesmoke" />
                        <Text style={{ fontSize: 15, color: "white", marginTop: 2 }}>  Tout le monde  </Text>
                        <Ionicons name="caret-down-outline" size={20} color="whitesmoke" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20, }}>
                <TextInput
                    autoFocus={true}
                    placeholder="Partagez une photo ou une vidéo d'un match ou d'un autre événement."
                    placeholderTextColor={"gray"}
                    style={{ fontSize: 16 }}
                    multiline={true}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1, flexWrap: "wrap" }}>
                    {postElementFinal}
                </View>
            </ScrollView>

            <BottomSheet hasDraggableIcon ref={whoCanSeePost} height={200}>

                <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 18, fontWeight: "500", color: "#565656" }}>Qui peut voir ce poste</Text>
                <Text style={{ marginTop: 20, marginLeft: 20, color: "gray", marginTop: 8 }}>Ce post sera visible dans le fil d'actualité et sur votre porfil.</Text>
                <View style={{ padding: 20, flex: 1 }}>
                    <RadioButtonGroup
                        containerStyle={{ marginBottom: 10 }}
                        selected={current}
                        onSelected={(value) => setCurrent(value)}
                        radioBackground="#4399fe"
                    >
                        <RadioButtonItem style={{ marginBottom: 20 }} value="monde" label={
                            <Text style={{ marginLeft: 10, fontSize: 18, marginBottom: 20, color: "#565656", }}>Tout le monde</Text>
                        } />
                        <RadioButtonItem style={{ marginBottom: 20 }} value="amis" label={
                            <Text style={{ marginLeft: 10, fontSize: 18, marginBottom: 20, color: "#565656", }}>Vos amis seulement</Text>
                        } />
                    </RadioButtonGroup>
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
}