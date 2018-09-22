import {MapView} from "expo";
import React from "react";
import {Modal, Image, Text, TouchableHighlight, View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {mapStyles} from "./Map.style";
import {customMap} from "./CustomMap";
import {Col, Grid, Row} from "react-native-easy-grid";
import {Container, Header, Right, Content, Button} from "native-base";
import PinModalContent from "./PinModalContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export class Map extends React.Component {

    state = {
            modalVisible: false,
            selectedPin: {},
            radiusActive: false
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setSelectedPin(pin) {
        this.setState({selectedPin: pin});
    }

    toggleRadiusActive(active) {
        this.setState({radiusActive: active});
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
                            <View >
                                <Grid>
                                    <Col size={3}>
                                        <Row>
                                            <Text style={{fontSize: 20, fontWeight: "500", color:"#4D5656"}}>{pin.title}</Text>
                                        </Row>
                                        <Row>
                                            <Text style={{fontSize: 15, color:"#283747"}}>{pin.description}</Text>
                                        </Row>
                                    </Col>
                                    <Col size={1}>
                                        <Image source={require("../assets/images/port-hills-web.jpg")}
                                               // style={{ width: 50, height: 50, alignSelf:'center', backgroundColor: "grey", margin: 5, borderRadius: 20} }
                                               style={{alignSelf: 'center',
                                                   height: 50,
                                                   width: 50,
                                                   borderRadius: 25}}
                                               resizeMode='cover' />
                                    </Col>
                                </Grid>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                ))}
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
