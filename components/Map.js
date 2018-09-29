import {MapView} from "expo";
import React from "react";
import {Modal, Image, Text, TouchableHighlight, View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {mapStyles} from "./Map.style";
import {customMap} from "./CustomMap";
import {Container, Header, Right, Button, Footer} from "native-base";
import PinModalContent from "./PinModalContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconRemove from "react-native-vector-icons/Entypo";
import * as firebase from "firebase";
import CalloutContents from "./Callout";
import MapViewDirections from "react-native-maps-directions"
const GOOGLE_MAPS_APIKEY = 'AIzaSyCKd5L9TEid938ketDq2L8q8I3gz0sMmTg';

export class Map extends React.Component {
    static navigationOptions = {
        title: 'Home',
        header: null,
    };

    state = {
        modalVisible: false,
        selectedPin: {},
        selectedImage: "",
        radiusActive: false,
        showDirections: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    async setSelectedPin(pin) {
        await this.setState({selectedPin: pin});
        // const url = await this.getSelectedImage(pin);
        // this.setState({selectedImage: url});
    }

    async getSelectedImage(pin) {
        let imageRef = firebase.storage().ref("images/" + pin.photo);
        await imageRef.getDownloadURL()
            .then((url) => {
                return url
            })
            .catch((error) => {
                console.log(error)
                // Handle any errors
            })

    }

    setDirections(bool) {
        this.setState({showDirections: bool})
    }

    render() {
        return (
            <Container>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle='fullScreen'
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Container>
                        <Header style={{backgroundColor: '#ffffff'}}>
                            <Right>
                                <Text onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                    Back
                                </Text>
                            </Right>
                        </Header>
                        <PinModalContent pin={this.state.selectedPin}/>
                        <Footer>
                            <Text style={{marginTop: 10, fontSize: 20}} onPress={() => {
                                this.setDirections(true);
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                                Get Directions
                            </Text>
                        </Footer>
                    </Container>
                </Modal>

                <MapView
                    style={{flex: 1}}
                    initialRegion={{
                        // latitude: -43.5322563,
                        // longitude: 172.559524,
                        latitude: this.props.phoneLocation.coords.latitude,
                        longitude: this.props.phoneLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    provider={"google"}
                    customMapStyle={customMap}
                >
                    {this.props.pins.map((pin, index) => (
                        <MapView.Marker
                            key={index}
                            coordinate={{
                                latitude: pin.latitude,
                                longitude: pin.longitude
                            }}
                            title={pin.title}
                            description={pin.description}
                        >
                            <Image
                                source={require("../assets/images/pin.png")}
                                style={{height: 35, width: 30}}
                            />
                            <MapView.Callout style={{flex: -1, position: 'absolute', minWidth:150, minHeight: 60}}
                                             onPress={() => {
                                                 this.setModalVisible(true);
                                                 this.setSelectedPin(pin);
                                             }}
                            >
                                <CalloutContents pin={pin}/>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                    {this.state.showDirections &&
                    <MapViewDirections
                        origin={{
                            latitude: this.props.phoneLocation.coords.latitude,
                            longitude: this.props.phoneLocation.coords.longitude,
                        }}
                        destination={{
                            latitude: this.state.selectedPin.latitude,
                            longitude: this.state.selectedPin.longitude
                        }}
                        strokeWidth={3}
                        strokeColor="#D82828"
                        apikey={GOOGLE_MAPS_APIKEY}/>
                    }
                </MapView>
                <View style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 75,
                    backgroundColor: 'transparent',
                }}>
                    <Button style={{borderRadius: 40, backgroundColor: "#fff", height: 55, shadowColor: '#424242',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.5,}}>
                        <Icon name="map-marker-radius" style={this.state.radiusActive ? mapStyles.activeRadiusButton : mapStyles.inactiveRadiusButton} size={35}/>
                    </Button>
                </View>
                {this.state.showDirections &&
                    <View style={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                        backgroundColor: 'transparent',
                    }}>
                        <Button onPress={() => {this.setDirections(false)}} style={{
                            borderRadius: 40, backgroundColor: "transparent", height: 55, shadowColor: '#424242',
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.5
                        }}>
                            <IconRemove name="cross" size={45}/>
                        </Button>
                    </View>
                }
            </Container>
        )
    }
}

Map.propTypes = {
    pins: PropTypes.array,
    phoneLocation: PropTypes.shape({
        coords: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
        })
    })
};


Map.defaultProps = {
    pins: [],
    phoneLocation: {
        coords: {
            latitude: -43.5322563,
            longitude: 172.559524
        }
    },
};
