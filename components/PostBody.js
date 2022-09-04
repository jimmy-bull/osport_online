import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import React, { useState, useRef, } from 'react';
// import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/Feather';

export default function PostBody({ data, otherData, navigation }) {

    const [videoAspecRation, setvideoAspecRation] = useState(3961 / 5941)
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)
    const imageDomaine = "https://ik.imagekit.io/jimmyBull/";
    const VideoRef = [];
    if (otherData.postType == 'regular') {
        return (
            <View key={otherData.id} style={{
                borderColor: 'white',
                borderRadius: 20,
            }}>
                <View style={{ marginBottom: 0, justifyContent: 'flex-end', flex: 1 }}>
                    {data.map((images) => {
                        if (String(images.image.split('.com')[1]).split('.')[1] != 'mp4' && images.id == 0 &&
                            String(images.image.split('.com')[1]).split('.')[1] != 'webm') {
                            return <Image key={images.id} style={{
                                height: "auto", width: windowWidth, aspectRatio: images.imageDimension, backgroundColor: "lightgray",
                                position: "relative", zIndex: 1, resizeMode: 'cover'
                            }}
                                defaultSource={require('../image/wainting.png')}
                                source={{ uri: images.image, cache: 'default' }} />
                        } else if (String(images.image.split('.com')[1]).split('.')[1] == 'mp4' ||
                            String(images.image.split('.com')[1]).split('.')[1] == 'webm' && images.id == 0) {
                            return (
                                <View key={images.id} style={{ aspectRatio: images.imageDimension, width: Dimensions.get('window').width }}>
                                    {/* <VideoPlayer
                                        source={{ uri: images.image }}
                                        style={{ aspectRatio: images.imageDimension, width: Dimensions.get('window').width, }}
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
                                    />
                                    <View style={{ position: "absolute", alignSelf: "center", justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', height: '100%' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('fullscreenVideo', {
                                            videoLink: images.image,
                                        })} style={{

                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            width: 60, height: 60,
                                            justifyContent: 'center', borderRadius: 30, alignSelf: "center",
                                        }}>
                                            <Icon name="play" size={30} color="white" style={{ alignSelf: "center" }} />
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                            )
                        }
                    })
                    }
                    <ScrollView horizontal={true} style={{ position: 'absolute', zIndex: 3, alignSelf: "center", }} contentContainerStyle={{ padding: 10, }}>
                        {data.map((images) => {
                            if (String(images.image.split('.com')[1]).split('.')[1] != 'mp4' && String(images.image.split('.com')[1]).split('.')[1] != 'webm') {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('ShowImageConversation',
                                        {
                                            imageLink: images.image,
                                            imageRatio: images.imageDimension
                                        })} key={images.id}>
                                        <Image style={images.id == 0 ? {
                                            height: 40, width: 40, borderRadius: 5, borderWidth: 1,
                                            borderColor: "red",
                                            marginLeft: 10
                                        } : {
                                            height: 40, width: 40, borderRadius: 5, borderWidth: 1, marginLeft: 10
                                        }}

                                            defaultSource={require('../image/wainting.png')}
                                            source={{ uri: images.image, cache: 'default' }} />
                                    </TouchableOpacity>)
                            } else if (String(images.image.split('.com')[1]).split('.')[1] == 'mp4' || String(images.image.split('.com')[1]).split('.')[1] == 'webm') {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('fullscreenVideo', {
                                        videoLink: images.image,
                                    })} key={images.id} style={{ height: 40, width: 40, borderRadius: 5, marginLeft: 10 }}>
                                        {/* <VideoPlayer
                                            source={{ uri: images.image }}
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
                                        />
                                        <View style={{ position: "absolute", alignSelf: "center", justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', height: '100%' }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('fullscreenVideo', {
                                                videoLink: images.image,
                                            })} style={{
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                width: 20, height: 20,
                                                justifyContent: 'center', borderRadius: 15, alignSelf: "center",
                                            }}>
                                                <Icon name="play" size={15} color="white" style={{ alignSelf: "center" }} />
                                            </TouchableOpacity>
                                        </View> */}
                                    </TouchableOpacity>
                                )
                            }
                        })
                        }
                    </ ScrollView>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <View style={{
                    padding: 20,
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                    backgroundColor: "white",
                }}>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "500", color: "black" }}>{otherData.sport}</Text>
                    <Text style={{ alignSelf: "center", color: "gray", marginTop: 10 }}>{otherData.date}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, alignItems: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <Image style={{ height: 70, width: 70, marginBottom: 10, resizeMode: 'contain' }} defaultSource={require('../image/wainting.png')} source={{ uri: otherData.logo1, cache: 'default' }} />
                            <Text style={{ fontWeight: "500", color: "black" }}>{otherData.equipe1}</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>{otherData.score1}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>:</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5, color: "black", paddingTop: 0 }}>{otherData.score2}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Image style={{ height: 70, width: 70, marginBottom: 10, resizeMode: 'contain' }} defaultSource={require('../image/wainting.png')} source={{ uri: otherData.logo2, cache: 'default' }} />
                            <Text style={{ fontWeight: "500", color: "black" }}>{otherData.equipe2}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}