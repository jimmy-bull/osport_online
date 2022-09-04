import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Video_Bottom from '../components/videoBottom';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Button
} from 'react-native';
import axios from 'axios';
import { Video, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
// import { cos } from 'react-native-reanimated';
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";

// import VideoPlayer from 'expo-reanimated-av-player';
// import { useSharedValue } from 'react-native-reanimated';

import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';


class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}
export default function Video_Components() {
    // Make a request for a user with a given ID
    // axios.get('http://192.168.43.142:8081/api/test', {
    //   headers: {
    //     "content-type": "application/json",
    //     'Access-Control-Allow-Credentials': true,
    //     'Access-Control-Allow-Origin': true,
    //     // 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')
    //   },
    // })
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'black',
        },

        video: {
            flex: 1
        },
        buttons: {
            position: "absolute",
            flex: 1,
            width: "100%",
            bottom: 20,
            // backgroundColor: 'red',
            flexDirection: 'row'
        },
        btn: {
            position: "relative",
            color: 'red',
            fontSize: 20,

            paddingRight: 5
        },
        playbackContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            padding: 30,
            paddingLeft: 10,
            paddingRight: 10,
            position: "absolute",
            width: "100%",
            bottom: 40,
        },
        playbackSlider: {
            position: "relative",
            alignSelf: "stretch",
            flex: 1,
        },
        mAinContainer: {
            flex: 1,
            position: "absolute",
            width: "100%",
            bottom: 100,
            padding: 30,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        userimage: {
            minHeight: 30,
            height: 40,
            width: 40,
            borderRadius: 20,
            resizeMode: "cover",
            aspectRatio: 5 / 5,
            backgroundColor: "lightgray"
        },
        rightblock: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: 200,
        }
    });
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [shouldPlayed, setshouldPlayed] = React.useState(true);
    const [videoduration, setVideoduration] = React.useState(null);
    const [videocurrentposition, setvideocurrentposition] = React.useState(null);


    const _onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            setVideoduration(status.durationMillis)
            setStatus(status.isPlaying)
            setvideocurrentposition(status.positionMillis)
            // console.log(status.durationMillis / status.positionMillis)
        }
        if (status.isBuffering) {
            console.log('buffering')
        }
    }
    const _onSeekSliderSlidingComplete = value => {
        const seekPosition = value * videoduration;
        if (shouldPlayed) {
            video.current.playFromPositionAsync(seekPosition);
        } else {
            video.current.setPositionAsync(seekPosition);
        }
    }
    const _onSeekSliderValueChange = value => {
        video.current.pauseAsync();
    }
    const _getSeekSliderPosition = () => {
        if (
            // video  != null &&
            videoduration != null &&
            videocurrentposition != null
        ) {
            return (
                videocurrentposition /
                videoduration
            );
        }
        return 0;
    }
    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
    });
    const _getTimestamp = () => {
        if (
            // this.playbackInstance != null &&
            videocurrentposition != null &&
            videoduration != null
        ) {
            return `${_getMMSSFromMillis(
                videocurrentposition
            )} / ${_getMMSSFromMillis(videoduration)}`;
        }
        return "";
    }
    const _getMMSSFromMillis = (millis) => {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }
    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require("../assets/indy.mp4")}
                onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
                useNativeControls={false}
                resizeMode="contain"
                isLooping
                shouldPlay={shouldPlayed}
            />
            <Video_Bottom
                postID={1}
            ></Video_Bottom>

            <View style={styles.playbackContainer}>

                <TouchableOpacity
                    onPress={() =>
                        status ?
                            [video.current.pauseAsync(),
                            setshouldPlayed(false)] : [video.current.playAsync(), setshouldPlayed(true)]
                    }
                >
                    <Text style={styles.btn}>{status ? <AntDesign name="pause" size={24} color="white" /> : <Entypo name="controller-play" size={24} color="white" />}</Text>
                </TouchableOpacity>
                <Slider
                    style={styles.playbackSlider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#4399fe"
                    maximumTrackTintColor="darkgray"
                    onSlidingComplete={_onSeekSliderSlidingComplete}
                    onValueChange={_onSeekSliderValueChange}
                    value={_getSeekSliderPosition()}
                    thumbImage={require("../assets/thumb.png")}
                />
                <Text style={{ fontSize: 11, color: 'white', paddingLeft: 5 }}>{_getTimestamp()}</Text>

            </View>
        </View>
    );

}


