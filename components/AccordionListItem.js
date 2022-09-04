import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AccordionListItem = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [bodySectionHeight, setBodySectionHeight] = useState(0);

    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
    });



    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0rad', `${Math.PI}rad`],
    });

    const toggleListItem = () => {
        if (open) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                useNativeDriver: false,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }).start();
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                useNativeDriver: false,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }).start();
        }
        setOpen(!open);
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => toggleListItem()}>
                <View style={styles.titleContainer}>
                    <Text>{title}</Text>
                    <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                        <MaterialIcons name="keyboard-arrow-down" size={20} color="gray" />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
                <View
                    style={styles.bodyContainer}
                    onLayout={event =>
                        setBodySectionHeight(event.nativeEvent.layout.height)
                    }>
                    {children}
                </View>
            </Animated.View>
        </>
    );
};
export default AccordionListItem;

const styles = StyleSheet.create({
    bodyBackground: {
        overflow: 'hidden',
        backgroundColor:'white'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EFEFEF',
        backgroundColor:'white'

    },
    bodyContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%"
    },
});
