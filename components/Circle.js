import {MapView} from "expo";
import {AsyncStorage} from "react-native";
import React from 'react';


export default class Circle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radius: 0
        }
    }

    async componentDidMount() {
        this.setState({radius: await this.getRadius() });
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

    render() {
        return(
            <MapView.Circle
                center={{latitude: this.props.coords.latitude, longitude: this.props.coords.longitude}}
                radius={this.state.radius}
                fillColor="rgba(0, 204, 153, 0.1)"
                strokeColor="rgba(0, 204, 153, 0.2)"/>
        )
    }

}
