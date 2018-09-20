import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Input, Content, Text, Button,  } from 'native-base';
import * as firebase from "firebase";

export default class PhotoScreen extends Component {
    state = {
        caption: ""
    }

    submitPlace = () => {
        const options = {
            image: this.props.image,
            caption: this.state.caption,
        }
        const storage = firebase.storage();
        let storageRef = storage.ref(`images/${options.caption}.jpg` );

        storageRef.putString(options.image.base64, 'base64')
            .then(function() {
            console.log('Uploaded a base64 string!');
        });

        // uploadPhoto(options)
        //     .then((response) => {
        //         console.log(response)
        //     })
    }


    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={{uri: this.props.image.uri}}
                        style={styles.image}
                    />

                    <Input placeholder="caption"
                           multiline={true}
                           style={styles.textInput}
                           value={this.state.caption}
                           onChangeText={(text) => this.setState({caption: text})}
                    />

                    <Button block onPress={this.submitPlace} style={styles.uploadButton}>
                        <Text>Save Photo</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex:1,
        height: 300,
        resizeMode: 'contain',
        marginTop:10,
        marginBottom: 10,
        borderRadius: 10
    },
    textInput: {
        flex:1,
        marginTop:20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },

    uploadButton: {
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 15,
    }
});
