import {Container, Content} from "native-base";
import {ScrollView, Text, StyleSheet, Image, ActivityIndicator, Button, View} from "react-native";
import React from "react";
import {Col, Grid, Row} from "react-native-easy-grid";
import * as firebase from "firebase";


export default class PinModalContent extends React.Component {

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
        return (
            <Content>
                <ScrollView>
                    <Container style={{flex: 1, margin: 20, height: 'auto', paddingBottom: 10}}>
                        <Grid>
                            <Col>
                                <Row>
                                    {this.state.image === "" ? <ActivityIndicator style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flex: 1,
                                        }}/> :
                                        <Image
                                            source={{uri: this.state.image}}
                                            style={styles.image}
                                        />
                                    }
                                </Row>
                                <Row>
                                    <Text style={{fontSize: 30, fontWeight: "500", color:"#4D5656"}}>{this.props.pin.title}</Text>
                                </Row>
                                <Row>
                                    <Text style={{fontSize: 20, color:"#283747"}}>{this.props.pin.description}</Text>
                                </Row>
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
        height: 400,
        paddingBottom: 20,
    },

});