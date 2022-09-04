import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
// import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
// import RNImageFilter from "react-native-image-filter";
import ExpoAmazingCropper from 'expo-amazing-cropper';


const settings = [
    // {
    //     name: 'hue',
    //     minValue: 0,
    //     maxValue: 6.3,
    // },
    // {
    //     name: 'blur',
    //     minValue: 0,
    //     maxValue: 30,
    // },
    // {
    //     name: 'sepia',
    //     minValue: -5,
    //     maxValue: 5,
    // },
    // {
    //     name: 'sharpen',
    //     minValue: 0,
    //     maxValue: 15,
    // },
    // {
    //     name: 'negative',
    //     minValue: -2.0,
    //     maxValue: 2.0,
    // },
    // {
    //     name: 'contrast',
    //     minValue: -10.0,
    //     maxValue: 10.0,
    // },
    {
        name: 'saturation',
        minValue: 0.0,
        maxValue: 2,
    },
    // {
    //     name: 'brightness',
    //     minValue: 0,
    //     maxValue: 5,
    // },
    // {
    //     name: 'temperature',
    //     minValue: 0.0,
    //     maxValue: 40000.0,
    // },
    // {
    //     name: 'exposure',
    //     minValue: -1.0,
    //     maxValue: 1.0,
    //     step: 0.05,
    // },
];
const width = Dimensions.get('window').width - 40;
export default class ImageModificator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...settings,
            aspecRation: 1104 / 736,
            // hue: 0,
            // blur: 0,
            // sepia: 0,
            // sharpen: 0,
            // negative: 0,
            // contrast: 1,
            saturation: 1,
            // brightness: 1,
            // temperature: 6500,
            // exposure: 0,
            width: 0,
            height: 0
        };
    }

    UNSAFE_componentWillMount() {
        Image.getSize(this.props.route.params.image, (width, height) => {
            this.setState({ width: width, height: height });
        });
    }

    render() {
        const onDone = (croppedImageUri) => {
            console.log('croppedImageUri = ', croppedImageUri);
            // send image to server for example
        }

        const onError = (err) => {
            console.log(err);
        }

        const onCancel = () => {
            console.log('Cancel button was pressed');
            // navigate back
        }
        const { image } = this.props.route.params;
        console.log(this.state.width)

        return (
            <View style={{ backgroundColor: "black", flex: 1 }}>
                <StatusBar
                    animated={true}
                    backgroundColor="black"
                    barStyle={"light-content"}
                />
                <View style={{ paddingTop: 10, padding: 5, paddingBottom: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="close-outline" size={28} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="arrow-redo-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                {/* <View>
                    <Image style={{ aspectRatio: this.state.aspecRation, width: Dimensions.get('window').width,  }} source={{ uri: image.uri }} />
                </View>
                 */}

                {this.state.width > 0 ?
                    <ExpoAmazingCropper
                        // onDone={(uri: string) => onDone(croppedImageUri)}
                        // onError={(err: any) => onError(err)}
                        onCancel={() => onCancel()}
                        imageUri={image}
                        imageWidth={this.state.width}
                        imageHeight={this.state.height}
                        NOT_SELECTED_AREA_OPACITY={0.3}
                        BORDER_WIDTH={20}
                    />
                    : <></>
                }



            </View>
        )
    }

}