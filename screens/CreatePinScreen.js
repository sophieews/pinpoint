import React, { Component } from 'react';
import {Image, ImageBackground, StyleSheet, } from 'react-native';
import { Container, Input, Content, Text, Button,  } from 'native-base';
import { FormLabel, FormInput, Header } from 'react-native-elements'

export default class CreatePinScreen extends Component {
    state = {
        pinName: "",
        pinDescription: "",
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text style={styles.heading} >
                        Create Pin
                    </Text>
                    <Image
                        source={{uri: this.props.image.uri}}
                        style={styles.image}
                    />
                    <FormLabel>Place Name</FormLabel>
                    <FormInput onChangeText={(pinName) => this.setState({pinName})}/>
                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={(pinDescription) => this.setState({pinDescription})}/>
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
        borderRadius: 10
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
        marginTop:10,

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
