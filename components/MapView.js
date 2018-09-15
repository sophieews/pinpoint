import React from 'react';
import { MapView } from 'expo';
// import * as firebase from "firebase";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyBNPcD47E7dfNa4bGaGZmEsQcWfsSsOc50",
//     authDomain: "pin-point-app.firebaseapp.com",
//     databaseURL: "https://pin-point-app.firebaseio.com",
//     projectId: "pin-point-app",
//     storageBucket: "pin-point-app.appspot.com",
//     messagingSenderId: "451086133233"
// };
//
// firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            markers: [],
        };
    }

    // componentDidMount() {
    //     const markers = this.fetchPins();
    //     this.setState({markers: markers});
    //     console.log(markers);
    // }
    //
    // fetchPins() {
    //     return firebase.database().ref('/pins').once('value').then(function(snapshot) {
    //         snapshot.val();
    //     });
    // }


    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
                    const coords = {
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    };

                    const metadata = `Status: ${marker.statusValue}`;

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={marker.stationName}
                            description={metadata}
                        />
                    );
                })}
            </MapView>
        );
    }
}