import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import * as firebase from "firebase";
import MapView from "../components/MapView"

const firebaseConfig = {
    apiKey: "AIzaSyBNPcD47E7dfNa4bGaGZmEsQcWfsSsOc50",
    authDomain: "pin-point-app.firebaseapp.com",
    databaseURL: "https://pin-point-app.firebaseio.com",
    projectId: "pin-point-app",
    storageBucket: "pin-point-app.appspot.com",
    messagingSenderId: "451086133233"
};

firebase.initializeApp(firebaseConfig);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            pins: [],
        };
    }

  async componentDidMount() {
      // this.storeLocation(-43.5322563,172.559524);
      const pins = await this.fetchPins();
      this.setState({pins: pins, isLoading: false});
  }

    storeLocation(lat, long) {
        firebase.database().ref('pins/').push().set({
            lat: lat,
            long: long
        });
    }

    // componentDidMount() {
    //     const markers = this.fetchPins();
    //     this.setState({markers: markers});
    //     console.log(markers);
    // }
    //

    async fetchPins() {
        const eventref = firebase.database().ref('pins/');
        const snapshot = await eventref.once('value');
        const value = Object.values(snapshot.val());
        return value;
    }

    renderPins() {
        // sites I showed at the top of this issue come in fine from  props
        const renderedPins = _.map(this.state.markers, site => {
            const {title, description, coordinate, id} = site;

            return (
                <Marker
                    key={id}
                    title={title}
                    description={description}
                    coordinate={coordinate}
                />
            );
        });

        // if I inspect renderedSites, I see the Marker element, but it doesn't render
        return renderedSites;
    };

  render() {
      if(this.state.isLoading) {
          return(
              <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator size="large" color="#484848" animating={true}/>
              </View>
          )
      } else {
          return(
              <MapView>
                  {this.state.pins.map(pin => {
                      {/*<MapView.Marker coordinate={{latitude: pin.lat, longitude: pin.long}}*/}
                                      {/*// image={'../assets/images/pin.png')}*/}
                      {/*>*/}
                      {/*</MapView.Marker>*/}
                  })}
              </MapView>
          )
      }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
