import React, { Component } from 'react';
import {Text, Container, Header, Right, Content} from 'native-base';
import { View, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';
import PhotoScreen from "./PhotoScreen";
import Icon from "react-native-vector-icons/Entypo";
const { width, height } = Dimensions.get('window');

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
    }

    async takePicture()  {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64: true
            });

            await this.setState({
                image: photo,
                modalVisible: true})
        }
    };

    renderPhotoPreview = () => {
        if(this.state.modalVisible) {
            return <View style={{ flex: 1}} >
                <Modal transparent={false} style={{flex: 1,}}>
                    <Container>
                        <Content>
                        <TouchableOpacity
                            style={{flex: 1,}}
                            onPress={() => {this.setState({modalVisible: false})}}>
                            <Icon name="back" style={styles.backIcon}/>
                        </TouchableOpacity>
                        <PhotoScreen image={this.state.image}/>
                        </Content>
                    </Container>
                </Modal>
            </View>
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
                {this.renderPhotoPreview()}
                <Camera
                    style={{ flex: 1, height: height, width: width }}
                    type={this.state.type}
                    ref={ (ref) => {this.camera = ref} }
                    // cameraFillMode={CameraFillMode.COVER}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                            }}
                            onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                });
                            }}>
                            <Icon name="cycle" style={styles.flipIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Icon name="circle" style={{fontSize: 80, color: 'white', marginBottom: 10}}/>

                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    flipIcon: {
        fontSize: 40,
        color: 'white',
        marginLeft: 20,
        marginTop: 15,
    },
    backIcon: {
        fontSize: 40,
        color: 'gray',
        marginLeft: 20,
        marginTop: 22,
        marginBottom: 2,
    },




});
