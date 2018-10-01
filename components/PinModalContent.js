import {Container, Content, Header} from "native-base";
import {ScrollView, Text, StyleSheet, Image, ActivityIndicator, View, Alert} from "react-native";
import React from "react";
import {Col, Grid, Row} from "react-native-easy-grid";
import * as firebase from "firebase";
import { FormInput, FormLabel, Button} from "react-native-elements";
import {ImagePicker, Permissions, Camera} from "expo";
import IconEdit from "react-native-vector-icons/Feather";

export default class PinModalContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: "",
            imageUri: "",
            imageName: this.props.pin.photo,
            oldImage: this.props.pin.photo,
            pinTitle: this.props.pin.title,
            pinDescription: this.props.pin.description,
            type: Camera.Constants.Type.back,
            editPin: false,
        }
    }

    async componentDidMount() {
        await this.getSelectedImage(this.props.pin);
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({
            hasCameraPermission: status === 'granted',
            hasCameraRollPermission: statusRoll === 'granted'
        });
    }

    async updateImage() {
        await firebase.database().ref().child('/pins/' + this.props.pin.id)
            .update({ title: this.state.pinTitle, description: this.state.pinDescription, photo: this.state.imageName })

        let oldImageRef = firebase.storage().ref("images/" + this.state.oldImage)
        await oldImageRef.delete()
    }

    async submitImage() {
        let imageRef = firebase.storage().ref("images/" + this.state.imageName);
        await imageRef.put(this.state.photo)
            .then(() => {
                console.log("Photo added")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    chooseImage = async() => {
        let result = await ImagePicker.launchCameraAsync();
        if(!result.cancelled){
            await this.uploadImage(result.uri)
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
            photo: blob,
            imageName: blob._data.name,
        })
        return blob
    };

    async getSelectedImage(pin) {
        let imageRef = firebase.storage().ref("images/" + pin.photo);
        await imageRef.getDownloadURL()
            .then((url) => {
                this.setState({ photo: url});
            })
            .catch((error) => {
                console.log(error)
            })
    }

    renderImageView = () => {
        if(this.state.imageUri !== ""){
            return <Image
                source={{uri: this.state.imageUri}}
                style={styles.image}
            />
        } else {
            return <Image
                source={{uri: this.state.photo}}
                style={styles.image}
            />}
    }

    setEditPin(bool) {
        this.setState({editPin: bool})
    }


    render() {
        return (
            <Content>
                <ScrollView>
                    <Container style={{flex: 1, margin: 20, height: 'auto', paddingBottom: 10}}>
                        <Grid>
                            <Col>
                                <Row>
                                    {this.state.photo === "" ? <ActivityIndicator style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flex: 1,
                                        }}/> :
                                        this.renderImageView()
                                    }
                                </Row>
                                {this.state.editPin &&
                                <View style={{ flex: 1}}>
                                    <Row>
                                        <Button title="Retake Photo" style={styles.button} onPress={this.chooseImage}/>
                                    </Row>
                                    < FormLabel > Title </FormLabel>
                                    <Row>
                                        <FormInput value={this.props.pin.title} onChangeText={(pinTitle) => this.setState({pinTitle})}/>
                                    </Row>
                                    <FormLabel>Description</FormLabel>
                                    <Row>
                                        <FormInput value={this.props.pin.description} onChangeText={(pinDescription) => this.setState({pinDescription})}/>
                                    </Row>
                                    <Row>
                                        <Button title="Update Pin" style={styles.button} onPress={() => {
                                            this.submitImage();
                                            this.updateImage();
                                            this.setEditPin(false)
                                        }}/>
                                    </Row>
                                </View>
                                }
                                {!this.state.editPin &&
                                <View style={{flex: 1}}>
                                    <Row>
                                        <Text style={{fontSize: 30, fontWeight: "500", color:"#4D5656"}}>{this.state.pinTitle}</Text>
                                    </Row>
                                    <Row>
                                        <Text style={{fontSize: 20, color:"#283747"}}>{this.state.pinDescription}</Text>
                                    </Row>
                                    <Row>
                                        <Button title="Edit" style={styles.button} onPress={() => {
                                            this.setEditPin(true);
                                        }}/>
                                    </Row>
                                </View>}
                            </Col>
                        </Grid>
                    </Container>
                </ScrollView>
            </Content>
        );
    }

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: 100,
        height: 300,
        paddingBottom: 20,
        resizeMode: 'contain'
    },
    button: {
        marginTop: 10,
        flex: 1,
    }

});