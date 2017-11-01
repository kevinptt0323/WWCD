import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  NavigatorIOS,
  AppRegistry,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

import { BarCodeScanner, Permissions } from 'expo';

export default class BuyerScreen extends React.Component {
  static navigationOptions = {
    title: 'Buy',
  };

  render() {
    return (
      <View>
        {
          this.props.screenProps.bought.map((item) => {
            return <Text key={item.name}>{item.name + ' ' + item.total}</Text>
          })
        }
      </View>
    );
  }
}