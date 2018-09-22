import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Container,
    Header,
    Button,
    Content,
    List,
    Icon,
    ListItem,
    Text,
    Left,
    Body,
    Right,
    Switch,
    Separator
} from 'native-base';
import { View} from "react-native";
import * as AsyncStorage from "react-native";


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        radius: null,
        modalVisible: false
    };

    async componentDidMount() {
        const radius = await this.get('radius');
        this.setState({radius: radius});
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
        return (
            <View>
                <Content style={{backgroundColor: "#fff"}}>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#ff6156" }}>
                                <MaterialCommunityIcons active name="map-marker-radius" style={{color: "#fff"}} size={20}/>
                            </Button>
                        </Left>
                        <Body>
                        <Text>Pin Radius</Text>
                        </Body>
                        <Right>
                            {/*<Picker/>*/}
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Content>
            </View>
        );
    }
}
