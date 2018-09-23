import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Button,
    Content,
    Icon,
    ListItem,
    Text,
    Left,
    Body,
    Right,
} from 'native-base';
import {View} from "react-native";
import { AsyncStorage, Picker, Modal } from "react-native"
import Feather from "react-native-vector-icons/Feather"


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    constructor(props) {
        super(props);

        this.state = {
            radius: null,
            modalVisible: false
        };
    }

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

    async setRadius() {
        try {
            await AsyncStorage.setItem('radius', this.state.radius);
        } catch (error) {
            console.log(error.message);
        }
    }

    setModalVisible(isVisible) {
        this.setState({modalVisible: isVisible});
    }

    render() {
        return (
                <Content style={{backgroundColor: "#fff"}}>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={styles.modal}>
                            <View style={styles.modalView}>
                                <Content style={styles.modalContent}>
                                        <Feather onPress={() => {
                                            this.setModalVisible(false);
                                            this.setRadius();
                                        }}
                                        style={styles.closeIcon}
                                        size={25}
                                        name={'x'}/>
                                    <View style={styles.pickerView}>
                                        <Picker
                                            selectedValue={this.state.radius}
                                            style={{ height: 50, width: 100}}
                                            onValueChange={(itemValue, itemIndex) => this.setState({radius: itemValue})}>
                                            <Picker.Item label="500 m" value="500" />
                                            <Picker.Item label="1 km" value="1000" />
                                            <Picker.Item label="2 km" value="2000" />
                                            <Picker.Item label="5 km" value="5000" />
                                            <Picker.Item label="10 km" value="10000" />
                                        </Picker>
                                    </View>
                                </Content>
                            </View>
                        </View>
                    </Modal>

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
                            <Text>{this.state.radius}</Text>
                            <Icon active name="arrow-forward" onPress={() => {this.setModalVisible(true)}}/>
                        </Right>
                    </ListItem>
                </Content>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(33, 33, 33, 0.5)'
    },
    modalView: {
        width: 300,
        height: 250
    },
    modalContent: {backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#000',
    },
    closeIcon: {
        textAlign: 'right',
        paddingRight: 10,
        paddingTop: 10
    },
    pickerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


