import React, { Component } from 'react';
import {Alert, Image, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { FormLabel, FormInput,   Button } from 'react-native-elements'
import {Camera, ImagePicker, Location, Permissions} from "expo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from "firebase";

export default class CreatePinScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        pinTitle: "",
        pinDescription: "",
        hasCameraPermission: null,
        modalVisible: false,
        type: Camera.Constants.Type.back,
        image: null,
        imageUri: null,
        phoneLocation: "",
        isLoading: false,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    chooseImage = async () => {
        let result = await ImagePicker.launchCameraAsync();
        // let result = await ImagePicker.launchImageLibraryAsync();

        if(!result.cancelled){
            this.uploadImage(result.uri)
                .then((blob) => {
                    console.log(blob)
                })
                .catch((err) => {
                    Alert.alert(err);
                })
        }
    }

    uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        await this.setState({
            imageUri: uri,
            image: blob,
            imageName: blob._data.name,
        })
        return blob
    };

    emptyPin = async () => {
        await this.setState({
            pinTitle: "",
            pinDescription: "",
            image: null,
            imageUri: null,
            userLocation: "",
        });
    }

    submitPin = async () => {
        await this.setState({
            isLoading: true
        })

        let ref = firebase.storage().ref("images/" + this.state.imageName);
        await ref.put(this.state.image);

        let location = await this.getLocationAsync();

        let key = Math.random().toString(36).substr(2, 16);
        await firebase.database().ref('pins/').child(key).set({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            title: this.state.pinTitle,
            description: this.state.pinDescription,
            photo: this.state.imageName,
            id: key
        })

        await this.setState({
            isLoading: false
        })
        this.emptyPin()
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Please turn on location services for Pin Point',
            });
        }
        return await Location.getCurrentPositionAsync({});
    };

    renderImage = () => {
        if(this.state.imageUri !== null){
            return <Image
                source={{uri: this.state.imageUri}}
                style={styles.image}
            />
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
        if(this.state.isLoading) {
            return(
                <View style={styles.activityIndicatorContainer}>
                    <Text style={{color: "gray", marginBottom: 20}} >Uploading Pin...</Text>
                    <ActivityIndicator size="large" color="#484848" animating={true}/>
                </View>
            )
        } else {
            return(
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                >
                    <View style={{ flex: 1}}>
                        <Text style={styles.heading} >
                            Create Pin
                        </Text>
                        {this.renderImage()}
                        <Button title="Take Photo" style={styles.button} onPress={this.chooseImage}/>
                        <FormLabel>Title</FormLabel>
                        <FormInput value={this.state.pinTitle} onChangeText={(pinTitle) => this.setState({pinTitle})}/>
                        <FormLabel>Description</FormLabel>
                        <FormInput value={this.state.pinDescription} onChangeText={(pinDescription) => this.setState({pinDescription})}/>
                        <Button title="Submit Pin" style={styles.button} onPress={async () => {
                            await this.submitPin();
                            this.props.navigate('Home')
                        }}/>
                    </View>
                </KeyboardAwareScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    image: {
        flex:1,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10,
        marginTop: 10,
    },
    textInput: {
        flex:1,
        marginTop:10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    heading: {
        textAlign: "center",
        fontSize: 30,
        color: 'gray',
        marginTop: 20,

    },
    button: {
        marginTop: 10,
    },
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

});
