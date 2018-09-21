import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as firebase from "firebase";
import RNFetchBlob from 'react-native-fetch-blob'

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Links',
    };

    getImage = () => {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        const imageRef = firebase.storage.ref(`images/Pink.jpg`)

        let uploadBlob;

        Blob.build(imageRef, { type: 'image/jpg;' })
            .then((imageBlob) => {
                uploadBlob = imageBlob;
                return imageRef.put(imageBlob, { contentType: 'image/jpg' });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                // do something with the url if you wish to
            })

        // fs.readFile(image, 'base64')
        //     .then((data) => {
        //         return Blob.build(data, {type: `image/Pink.jpg;BASE64`})
        //     })
        //     .then((blob) => {
        //         uploadBlob = blob
        //         return imageRef.put(blob, {contentType: `image/Pink.jpg`})
        //     })
        //     .then(() => {
        //         uploadBlob.close()
        //         return imageRef.getDownloadURL()
        //     })
        //     .then()

    }

    render() {
        return ( <View>
                {this.getImage()}
            </View>
        );
    }
}
