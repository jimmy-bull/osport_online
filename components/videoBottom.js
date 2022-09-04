import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native';
import axios from 'axios';
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";

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


export default function Video_Bottom() {


    const styles = StyleSheet.create({
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


    return (

        <View style={styles.mAinContainer}>
            <View style={{ marginTop: 150 }}>
                <Text numberOfLines={1} style={{ color: 'white', fontSize: 14, fontFamily: 'Roboto_300Light', }}>Bull Jimmy . 3m ago</Text>
                <Text numberOfLines={1} style={{ color: 'white', fontSize: 17, fontFamily: 'Roboto_400Regular', marginTop: 8 }}>I made this video in Los angeles</Text>
            </View>
            <View style={styles.rightblock}>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: "gray", height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}>
                        <Feather name="heart" size={15} color={'white'} />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "500", fontFamily: 'Roboto_400Regular', marginTop: 5 }}>30</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: "gray", height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}>
                        <Feather name="message-square" size={15} color={'white'} />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "500", fontFamily: 'Roboto_400Regular', marginTop: 5 }}>187</Text>
                </View>
                <Image style={styles.userimage} source={{ uri: "https://numero.twic.pics/2022-06/push-drake-numero-magazine2.jpg?twic=v1/cover=16:9/resize=900" }} />
            </View>
        </View>

    );

}


