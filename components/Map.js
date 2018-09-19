import {MapView} from "expo";
import React from "react";
import {Image, Text, View} from "react-native";
import PropTypes from 'prop-types';
import {mapStyles} from "./Map.style";
import {customMap} from "./CustomMap";

export class Map extends React.Component {

    render() {

        return (
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
                        title={"Pin"}
                        description={"description"}
                    >
                        <Image
                            source={require("../assets/images/pin.png")}
                            style={{height: 35, width: 30}}
                        />
                    </MapView.Marker>
                ))}
            </MapView>
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
