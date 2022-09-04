import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert
} from 'react-native';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AssetsSelector } from 'expo-images-picker'
import { Ionicons } from '@expo/vector-icons'
import { MediaType } from 'expo-media-library';
// import Icon from 'react-native-vector-icons/Feather';
import { AntDesign as IconAnt, Feather as Icon } from "@expo/vector-icons";

const ForceInset = {
    top: 'never',
    bottom: 'never',
};
export default function Post({ navigation }) {

    const onSuccess = (data) => {
        //  Alert.alert('Done', data.length + 'Images selected')
        //    console.log(' ')
        //  console.log(data.length)
        // console.log(data[1].uri)
        navigation.navigate('PostBeforeModification', {
            data: data
        })
    };

    const widgetErrors = useMemo(
        () => ({
            errorTextColor: 'black',
            errorMessages: {
                hasErrorWithPermissions: 'Please Allow media gallery permissions.',
                hasErrorWithLoading: 'There was an error while loading images.',
                hasErrorWithResizing: 'There was an error while loading images.',
                hasNoAssets: 'No images found.',
            },
        }),
        []
    );

    const widgetSettings = useMemo(
        () => ({
            getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
            initialLoad: 100,
            assetsType: [MediaType.photo, MediaType.video],
            minSelection: 1,
            maxSelection: 10,
            portraitCols: 4,
            landscapeCols: 4,
        }),
        []
    );

    const widgetResize = useMemo(
        () => ({
            width: 50,
            compress: 0.7,
            base64: false,
            saveTo: 'jpeg',
        }),
        []
    );

    const _textStyle = {
        color: 'white',
    };

    const _buttonStyle = {
        backgroundColor: 'none',
        borderRadius: 5,
    };

    const widgetNavigator = useMemo(
        () => ({
            Texts: {
                finish: <Icon name='check' size={30} color={'black'} />,
                back: <Icon onPress={() => navigation.goBack()} name='arrow-left' size={30} color={'black'} />,
                selected: 'Sélectionner',
            },
            midTextColor: 'black',
            minSelection: 1,
            buttonTextStyle: _textStyle,
            buttonStyle: _buttonStyle,
            onBack: () => { navigation.goBack() },
            onSuccess: (e) => onSuccess(e),
        }),
        []
    );

    const widgetStyles = useMemo(
        () => ({
            margin: 2,
            bgColor: 'white',
            spinnerColor: 'blue',
            widgetWidth: 99,
            videoIcon: {
                Component: Ionicons,
                iconName: 'ios-videocam',
                color: 'tomato',
                size: 20,
            },
            selectedIcon: {
                Component: Ionicons,
                iconName: 'ios-checkmark-circle-outline',
                color: 'white',
                bg: 'rgba(67, 153, 254, 0.4)',
                size: 26,
            },
        }),
        []
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <AssetsSelector
                Settings={widgetSettings}
                Errors={widgetErrors}
                Styles={widgetStyles}
                Navigator={widgetNavigator}
            // Resize={widgetResize} know how to use first , perform slower results.
            />
            <View style={{ padding: 10, marginLeft: 30, marginRight: 30, justifyContent: "space-between", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.navigate('CameraPerso', {
                    cameraModeParams: 'photo'
                })}>
                    <Text><Icon name='camera' size={30} color={'black'} /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CameraPerso', {
                    cameraModeParams: 'video'
                })}>
                    <Text><Icon name='video' style={{ alignSelf: "center" }} size={30} color={'black'} /></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}