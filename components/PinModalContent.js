import {Container, Content} from "native-base";
import {ScrollView, Text, StyleSheet, Image} from "react-native";
import React from "react";
import {Col, Grid, Row} from "react-native-easy-grid";


export default function PinModalContent(props) {
    return (
        <Content>
            <ScrollView>
                <Container style={{flex: 1, margin: 20, height: 'auto', paddingBottom: 10}}>
                    <Grid>
                        <Col>
                            <Row>
                                <Image
                                    source={require("../assets/images/port-hills-web.jpg")}
                                    style={styles.image}
                                />
                            </Row>
                            <Row>
                                <Text style={{fontSize: 30, fontWeight: "500", color:"#4D5656"}}>{props.pin.title}</Text>
                            </Row>
                            <Row>
                                <Text style={{fontSize: 20, color:"#283747"}}>{props.pin.description}</Text>
                            </Row>
                        </Col>
                    </Grid>
                </Container>
            </ScrollView>
        </Content>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: 100,
        height: 200,
        paddingBottom: 20,
    }
});