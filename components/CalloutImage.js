import React from "react";
import * as firebase from "firebase";
import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export class CalloutImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: ""
        }
    }

    async componentDidMount() {
        await this.getSelectedImage(this.props.pin)
    }


    async getSelectedImage(pin) {
        let imageRef = firebase.storage().ref("images/" + pin.photo);
        await imageRef.getDownloadURL()
            .then((url) => {
                this.setState({ image: url});
            })
            .catch((error) => {
                console.log(error)
                // Handle any errors
        })
    }
    render() {
       if(this.state.image === "") {
           return (
               <View style={styles.container}>
                   <Icon
                       name={'image'}
                       size={20}
                       style={{alignSelf: 'center'}}
                   />
               </View>
           );
       } else {
           return (
               <Image source={{uri: this.state.image}}
                   // style={{ width: 50, height: 50, alignSelf:'center', backgroundColor: "grey", margin: 5, borderRadius: 20} }
                      style={{
                          alignSelf: 'center',
                          height: 50,
                          width: 50,
                          borderRadius: 25
                      }}
                      resizeMode='cover'/>
           )
       }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#d3d3d3",
        width: 50, height: 50, alignSelf:'center', margin: 5, borderRadius: 35
    }
})

