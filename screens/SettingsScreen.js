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


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
      radius: 5
  }

  render() {
    return (
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
                    <Text>{this.state.radius} km</Text>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
        </Content>
    );
  }
}
