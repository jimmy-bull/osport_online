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
import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRef, useEffect } from 'react';
import BottomSheet from "react-native-gesture-bottom-sheet";

export default function SearchBlock({ navigation, page, editable, placeholder }) {
    const txtInput = useRef();
    const bottomSheetNotification = useRef();

    return (
        <SafeAreaView >
            <View style={{ flexDirection: "row", display: 'flex', alignItems: "center", paddingTop: 15, padding: 5, paddingBottom: 10 }}>
                <TouchableOpacity>
                    {page != "same" ? <>
                        <View style={{ position: "absolute", backgroundColor: "#4399fe", height: 10, width: 10, borderRadius: 5, top: 7, left: 12, zIndex: 100 }}></View>
                        <TouchableOpacity onPress={() => bottomSheetNotification.current.show()}>
                            <Icon onPress={() => bottomSheetNotification.current.show()} name="bell" color='gray' size={25} style={{ padding: 10, paddingLeft: 0, paddingRight: 5 }} />
                        </TouchableOpacity></>
                        : <></>
                    }
                </TouchableOpacity>
                {page == "same" ?
                    <View style={{ flex: 1, }}>
                        <TextInput ref={txtInput}
                          autoFocus={true}
                            style={{
                                borderWidth: 0,
                                fontSize: 16,
                                paddingLeft: 40,
                                color: "gray",
                                height: 40,
                                backgroundColor: "white",
                                borderRadius: 5,
                            }}
                            placeholder={placeholder}
                            placeholderTextColor={"gray"}
                        />
                        <Icon name="search" size={20} color={'gray'} style={{ position: "absolute", padding: 10, }} />
                    </View> : <></>
                }
                {page != "same" ? <>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')} ref={txtInput}
                            style={{
                                borderWidth: 0,
                                fontSize: 16,
                                paddingLeft: 40,
                                color: "gray",
                                height: 40,
                                backgroundColor: "white",
                                borderRadius: 5,

                                justifyContent: "center"
                            }}
                        ><Text style={{ fontSize: 16, color: "gray" }}>{placeholder}</Text></TouchableOpacity>
                        <Icon name="search" size={20} color={'gray'} style={{ position: "absolute", padding: 10, }} />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "white", width: 35, height: 35, marginLeft: 10 }}>
                        <Image style={{ height: 35, width: 35, borderRadius: 5 }} source={{ uri: "https://www.didierdrogbafoundation.org/sites/default/files/drogba.jpg" }} />
                    </TouchableOpacity></> : <></>}
            </View>
            <BottomSheet hasDraggableIcon ref={bottomSheetNotification} height={Dimensions.get('window').height}>
            </BottomSheet>
        </SafeAreaView>
    )
}