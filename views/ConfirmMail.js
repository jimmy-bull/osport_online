
import { Animated, Image, SafeAreaView, Text, View, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native';
import React, { useState } from 'react';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from '../components/styles';
import _GLobal_Link from '../components/global';
import axios from 'axios';
const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
    uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

const AnimatedExample = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [isloading, setisloading] = useState(false);

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Bravo !",
            "Vous venez de confirmer votre email. Vous pouvez maintenant vous connecter.",
            [
                { text: "Se connecter", onPress: () => navigation.navigate('Login') }
            ]
        );


    const expirationnAlert = () =>
        Alert.alert(
            "Desolé",
            "Ce code a expiré ou est invalide",
            [
                {
                    text: "Fermer",
                    onPress: () => navigation.navigate('Login'),
                    style: "cancel"
                },
                { text: "Recommencer" }
            ]
        );

    const fillAlert = () =>
        Alert.alert(
            "Problem",
            "Veuillez compléter tous les champs s'il vous plaît.",
            [
                {
                    text: "Fermer",
                    style: "cancel"
                },
            ]
        );

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    const send = () => {
        setisloading(true)
        if (value.trim().length == 4)
            axios.get(_GLobal_Link._link_simple + 'api/confirmemail/' + value, {
                headers: {
                    "content-type": "application/json",
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': true,
                    // 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')
                },
            }).then((res) => {
                if (res.data === 'updated') {
                    setisloading(false)
                    createTwoButtonAlert();
                } else {
                    setisloading(false)
                    expirationnAlert()
                }
            })
        else {
            setisloading(false)
            fillAlert()
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={{ flexDirection: "column", flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>Verification</Text>
                <Image style={styles.icon} source={source} />
                <Text style={styles.subTitle}>
                    Veuillez entrer le code de vérification{'\n'}
                    que nous vous avons envoyez à votre adresse e-mail
                </Text>

                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />
                <TouchableOpacity style={styles.btn} onPress={send}>
                    <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold', alignSelf: "center", }}>Confirmer</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default AnimatedExample;