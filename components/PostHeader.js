import React, { useState, useEffect, useRef, useMemo } from "react";
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
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from "react-native-gesture-bottom-sheet";

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
        borderColor: 'white',
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
})
export default function PostHeader({ posterName, country, city, postType }) {
    const bottomSheet = useRef();
   
    if (postType == 'regular') {
        return (
            <View style={{
                display: 'flex', backgroundColor: 'white',
            }}>
                <View style={{ padding: 15, flexDirection: "row", alignContent: "center", alignItems: 'center', paddingTop: 15, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", flex: 1, }}>
                        <Image style={{ minHeight: 30, height: 40, width: 40, borderRadius: 20, resizeMode: "cover", aspectRatio: 5 / 5, backgroundColor: "lightgray" }} source={{ uri: "https://media.gqmagazine.fr/photos/60ec5b2f24ddaa5ec8e006aa/3:4/w_1500,h_2000,c_limit/Ronaldo-GettyImages-1325777568.jpg", }} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold", color: 'black' }}>{posterName}</Text>
                            <Text style={{ color: 'gray' }}>{city}, {country}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                        <Icon name="more-vertical" size={20} color='black' />
                    </TouchableOpacity>
                </View>
                <BottomSheet hasDraggableIcon ref={bottomSheet} height={200}>
                    <View style={{ padding: 20, alignItems: "center", justifyContent: 'center', flex: 1 }}>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "#4399fe" }}>Suivre+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "black" }}>Signaler...</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "black" }}>Partarger sur...</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "black" }}>Bloqué</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheet>
            </View>
        )
    } else {
        return <></>
    }

}