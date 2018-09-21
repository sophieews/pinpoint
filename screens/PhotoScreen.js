import React, { Component } from 'react';
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Container, Input, Content, Text, Button,  } from 'native-base';
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Entypo";
import RNFetchBlob from "react-native-fetch-blob";

export default class PhotoScreen extends Component {
    state = {
        imageName: "",
        timePassed: false,
    }

    submitPlace = () => {
        const options = {
            imageName: this.state.imageName,
            image: this.props.image.uri,
        }

        // const storage = firebase.storage();
        // let storageRef = storage.ref(`images/image3.jpg`);

        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        const imageRef = firebase.storage.ref(`images/Pink.jpg`)

        let uploadBlob;

        fs.readFile(options.image, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `image/Pink.jpg;BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, {contentType: `image/Pink.jpg`})
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .catch((err) => {
                console.log(err)
            })

        // storageRef.putString(options.image, 'base64', {contentType: 'image/jpg'})
        //     .then(() => {
        //         console.log('Image uploaded!');
        //     });
    }


    render() {
        return (
            <Container>
                <Content>

                    <ImageBackground
                        source={{uri: this.props.image.uri}}
                        style={styles.image}
                    >
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={this.submitPlace}
                        >
                            <Icon name='chevron-with-circle-right' size={50} color='white'/>
                        </TouchableOpacity>

                    </ImageBackground>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex:1,
        // width: '100%',
        height: 550,
        // resizeMode: 'contain',
        // marginTop:60,
        // marginBottom: 10,
        // borderRadius: 10
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

    saveButton: {
        backgroundColor: 'transparent',
        marginRight: 20,
        marginBottom: 15,
        position: 'absolute',
        bottom:0,
        right:0,
    },




});
