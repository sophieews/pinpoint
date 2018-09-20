import React from "react";
import { Text, View, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Camera, Permissions } from 'expo';
import * as firebase from "firebase";
import PhotoScreen from "./PhotoScreen";

export default class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: {},
        modalVisible: false,
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

            this.setState({
                image: photo,
                modalVisible: true})
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Modal
                        animationType="slider"
                        transparent={false}
                        visible={this.state.modalVisible}
                        presentationStyle={"currentContext"}>
                            <PhotoScreen image={this.state.image}/>
                    </Modal>

                    <Camera style={{ flex: 1 }} type={this.state.type} ref={ (cam) => {this.camera = cam}}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                            }}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Icon name='repeat' size={40} color='white'/>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                backgroundColor: 'transparent',
                            }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={this.takePicture.bind(this)}
                            >
                                <Icon name='camera' size={50} color='red'/>

                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}