import React, { Component } from 'react';
import {Text } from 'native-base';
import { View, Alert } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';
import * as firebase from "firebase";

export default class CameraTab extends Component {
    state = {
        hasCameraPermission: null,
        modalVisible: false,
        type: Camera.Constants.Type.back,
        image: {}
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.chooseImage()
    }

    chooseImage = async () => {
        let result = await ImagePicker.launchCameraAsync();

        if(!result.cancelled){
            this.uploadImage(result.uri, "test-image2")
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((err) => {
                    Alert.alert(err);
                })
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child("images/" + imageName);
        await this.setState({
            image: blob
        })
        return ref.put(this.state.image);
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } if (hasCameraPermission === false) {
            return (
                <Text>
                    No access to camera
                </Text>
            );
        }
        return (
            <View style={{ flex: 1}}>
            </View>

        );
    }
}