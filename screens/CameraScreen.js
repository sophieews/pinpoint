import React, { Component } from 'react';
import {Text } from 'native-base';
import { View, Alert } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';
import * as firebase from "firebase";
import CreatePinScreen from "./CreatePinScreen";

export default class CameraTab extends Component {
    state = {
        hasCameraPermission: null,
        modalVisible: true,
        type: Camera.Constants.Type.back,
        image: {}
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        // this.chooseImage()
    }
    //
    // chooseImage = async () => {
    //     let result = await ImagePicker.launchCameraAsync();
    //
    //     if(!result.cancelled){
    //         this.uploadImage(result.uri, "test-image2")
    //             .then(() => {
    //                 this.setState({
    //                     modalVisible: true,
    //                 })
    //             })
    //             .catch((err) => {
    //                 Alert.alert(err);
    //             })
    //     } else {
    //         await this.setState({
    //             modalVisible: true,
    //         })
    //     }
    // }
    //
    // uploadImage = async (uri, imageName) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //
    //     let ref = firebase.storage().ref().child("images/" + imageName);
    //     await this.setState({
    //         image: blob
    //     })
    //     return blob
    //     // return ref.put(blob);
    // };

    renderCreatePinForm = () => {
        const { navigate } = this.props.navigation;
        if(this.state.modalVisible){
            return <CreatePinScreen image={this.state.image} navigate={navigate}/>
        }
    }

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
                {this.renderCreatePinForm()}
            </View>

        );
    }
}