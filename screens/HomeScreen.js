import React from 'react';
import {
    ActivityIndicator,
    StyleSheet, Text,
    View,
} from 'react-native';
import { Button } from "native-base";
import * as firebase from "firebase";
import {Location, Permissions} from "expo";
import { Map } from "../components/Map"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            userLocation: "",
            pins: [],
            errorMessage: null
        };
    }

    async componentDidMount() {
        await this.getLocationAsync();
        const pins = await this.fetchPins();
        this.setState({pins: pins, isLoading: false});
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Please turn on location services for Pin Point',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ userLocation: location });
    };

    createPin(lat, long) {
        firebase.database().ref('pins/').push().set({
            latitude: lat,
            longitude: long,
            title: "title",
            description: "description"
        });
    }

    async fetchPins() {
        const eventref = firebase.database().ref('pins/');
        const snapshot = await eventref.once('value');
        const value = Object.values(snapshot.val());
        return value;
    }

    render() {
        const { navigate } = this.props.navigation;
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.userLocation) {
            text = JSON.stringify(this.state.userLocation);
        }

        if(this.state.isLoading) {
            return(
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#484848" animating={true}/>
                </View>
            )
        } else {
            if(this.state.errorMessage) {
                return (
                    <View style={styles.activityIndicatorContainer}>
                        <Text style={styles.errorMessage}>{text}</Text>
                    </View>
                )
            } else {
                return(
                    <Map pins={this.state.pins} userLocation={this.state.userLocation} navigate={navigate}/>
                )
            }
        }
    }

}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    errorMessage: {
        fontSize: 15,
    }
});