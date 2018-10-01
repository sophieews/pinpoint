import {Text, View} from "react-native";
import {Col, Grid, Row} from "react-native-easy-grid";
import {CalloutImage} from "./CalloutImage";
import {MapView} from "expo";
import React from "react";


export default class CalloutContents extends React.Component{

    render() {
        return(
            <View >
                <Grid>
                    <Col size={3}>
                        <Row>
                            <Text style={{fontSize: 20, fontWeight: "500", color:"#4D5656"}}>{this.props.pin.title}</Text>
                        </Row>
                        <Row>
                            <Text style={{fontSize: 15, color:"#283747"}}>{this.props.pin.description}</Text>
                        </Row>
                    </Col>
                    <Col size={1}>
                        <CalloutImage pin={this.props.pin}/>
                    </Col>
                </Grid>
            </View>
        )
    }

}