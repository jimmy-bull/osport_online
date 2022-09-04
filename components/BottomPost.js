import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
// import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const BottomPost = ({ description, id, color, imageDataState, navigation }) => {
    const [selectedId, setSelectedId] = useState({})
    useEffect(() => {
        for (let index = 0; index < imageDataState.length; index++) {
            setSelectedId(prev => { return { ...prev, ["heart" + index]: "hearto" } })
        }
    }, [description, id, color, imageDataState]);
    return (
        <View style={{
            backgroundColor: "white", marginTop: 0, marginBottom: 10

        }}>
            <TouchableOpacity onPress={() => navigation.navigate('Comment')}>
                <Text numberOfLines={1} style={{ paddingRight: 10, paddingLeft: 10, color: "gray", marginTop: 20, marginBottom: 10 }}>{description}</Text>
            </TouchableOpacity>
            <View style={{
                borderColor: 'white',
                borderRadius: 20,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10
            }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => {
                        if (selectedId["heart" + id] != 'heart') {
                            setSelectedId(previousState => {
                                return { ...previousState, ["heart" + id]: "heart" }
                            });
                        }
                        else {
                            setSelectedId(previousState => {
                                return { ...previousState, ["heart" + id]: "hearto" }
                            });
                        }
                    }
                    } style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => {
                            if (selectedId["heart" + id] != 'heart') {
                                setSelectedId(previousState => {
                                    return { ...previousState, ["heart" + id]: "heart" }
                                });
                            }
                            else {
                                setSelectedId(previousState => {
                                    return { ...previousState, ["heart" + id]: "hearto" }
                                });
                            }
                        }
                        } style={{ backgroundColor: "rgba(67, 153, 254, 0.4)", height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <IconAnt onPress={() => {
                                if (selectedId["heart" + id] != 'heart') {
                                    setSelectedId(previousState => {
                                        return { ...previousState, ["heart" + id]: "heart" }
                                    });
                                }
                                else {
                                    setSelectedId(previousState => {
                                        return { ...previousState, ["heart" + id]: "hearto" }
                                    });
                                }
                            }
                            } name={selectedId["heart" + id]} size={15} color={selectedId["heart" + id] != 'heart' ? color : '#4399fe'} />
                        </TouchableOpacity>
                        <Text style={{ color: "rgba(67, 153, 254, 1)", fontWeight: "500", marginLeft: 5 }}>23k</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Comment')} style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Comment')} style={{ backgroundColor: "lightgray", height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                            <Icon name="message-square" onPress={() => navigation.navigate('Comment')} size={15} color={'white'} />
                        </TouchableOpacity>
                        <Text style={{ color: "gray", fontWeight: "500", marginLeft: 5 }}>187</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Share')} style={{ backgroundColor: "lightgray", height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon onPress={() => navigation.navigate('Share')} name="share-2" size={15} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}


export default BottomPost;
//