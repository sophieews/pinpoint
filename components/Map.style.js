import {StyleSheet} from "react-native";

export const mapStyles = StyleSheet.create({
    activeRadiusButton: {
        paddingHorizontal: 10,
        color: "#ff6156"
    },
    inactiveRadiusButton: {
        paddingHorizontal: 10,
        color: "#424242"
    },
    radiusButtonViewIOS: {
        position: 'absolute',
        right: 10,
        bottom: 75,
        backgroundColor: 'transparent',
    },
    radiusButtonViewAndroid: {
        position: 'absolute',
        right: 10,
        bottom: 5,
        backgroundColor: 'transparent',
    }
});