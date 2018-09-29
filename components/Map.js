import {MapView} from "expo";
import React from "react";
import {AsyncStorage, Image, Modal, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {mapStyles} from "./Map.style";
import {customMap} from "./CustomMap";
import {Col, Grid, Row} from "react-native-easy-grid";
import {Button, Container, Header, Right} from "native-base";
import PinModalContent from "./PinModalContent";
import Circle from './Circle'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import {CalloutImage} from "./CalloutImage";
import CalloutContents from "./Callout";

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
            region : {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
    };

    componentWillMount() {
        this.setState({ region: {
            latitude: this.props.userLocation.coords.latitude,
            longitude: this.props.userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}
        })
    }


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

    async toggleRadiusActive(active) {
        this.setState({radiusActive: active});
        if(active) {
            await this.setRegion();
        }
    }

    async getRadius() {
        return await this.get("radius");
    }

    async get(item) {
        let storageItem;
        try {
            storageItem = await AsyncStorage.getItem(item) || null;
        } catch (error) {
            console.log(error.message);
        }
        return storageItem;
    };

    async setRegion() {
        const lat = this.props.userLocation.coords.latitude;
        const long = this.props.userLocation.coords.longitude;
        const radius = await this.getRadius();
        // number of km per degree = ~111km (111.32 in google maps, but range varies between 110.567km at the equator and 111.699km at the poles)
        // 1km in degree = 1 / 111.32km = 0.0089
        // 1m in degree = 0.0089 / 1000 = 0.0000089
        const coef = Number(radius) * 0.0089;
        const newLat = lat + coef;
        // pi / 180 = 0.018
        const newLong = long + coef / Math.cos(lat * 0.018);

        const latDelta = Math.abs(newLat - lat) * 2;
        const longDelta = Math.abs(newLong - long) * 2;

        this.setState({
            region: {
                latitude: this.props.userLocation.coords.latitude,
                longitude: this.props.userLocation.coords.longitude,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta
            }
        });
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
                    </Container>
                </Modal>

            <MapView
                style={{flex: 1}}
                region={this.state.region}
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
                {this.state.radiusActive ?
                    <Circle coords={this.props.userLocation.coords}/>
                    : null}
            </MapView>
            <View style={{
                position: 'absolute',
                right: 10,
                bottom: 75,
                backgroundColor: 'transparent',
            }}>
                <Button style={{borderRadius: 40, backgroundColor: "#fff", height: 55, shadowColor: '#424242',
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.5,}}
                    onPress={() =>this.toggleRadiusActive(!this.state.radiusActive)}>
                    <Icon name="map-marker-radius" style={this.state.radiusActive ? mapStyles.activeRadiusButton : mapStyles.inactiveRadiusButton} size={35}/>
                </Button>
            </View>
            </Container>
        )
    }
}

Map.propTypes = {
    pins: PropTypes.array,
    userLocation: PropTypes.shape({
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
