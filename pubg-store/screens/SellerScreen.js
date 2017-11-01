import React from 'react';
import { ScrollView, 
  StyleSheet,
  Platform, 
  View, 
  Text, 
  TouchableOpacity,
  Alert,
  AlertIOS,
  Modal,
  TouchableHighlight,
  Button,
  TextInput,
  Image ,
  Dimensions,
} from 'react-native';

import ExpoItemView from './ExpoItemView';
import PopupDialog from 'react-native-popup-dialog';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import md5 from "react-native-md5";

class SellerScreen extends React.Component {
  constructor(props){
    super(props);
    this.bought = [];
    this.state = {
      curStuff: {},
      text: ''
    }
  }

  static navigationOptions = {
    title: 'Seller',
    drawerLabel: 'Home',
  };

  setNumber(item){
    if('ios' === Platform.OS){
      AlertIOS.prompt(
        'Enter number',
        null,
        n => {
          let num = parseInt(n);
          if(Number.isInteger(num)){
            let flag = false;
            this.bought.map((val, i) => {
              if(val.name == item.name){
                this.bought[i] = {
                  name: item.name,
                  price: item.price,
                  count: num, 
                  total: num * item.price
                };
                flag = true;
              }
            });
            
            if(!flag){
              this.bought.push({
                name: item.name,
                price: item.price,
                count: num, 
                total: num * item.price});
            }
          } else {
            AlertIOS.alert('Please Enter integer');
          }
        }
      );
    } else {
      this.setState({curStuff: item});
      this.popupDialog.show();
    }
  }

  addItems(item){
    let num = parseInt(this.state.text);
    if(Number.isInteger(num)){
      this.bought.push({
        name: item.name,
        price: item.price,
        count: num, 
        total: num * item.price});
      this.setState({curStuff: {}, text: ''});
      this.popupDialog.dismiss();
    } else {
      Alert.alert('Please Enter integer');
    }
    
  }

  render() {
    let items = [
      {name: 'cutlery', price: 10, icon: 'cutlery'}, 
      {name: 'apple', price: 20, icon: 'apple'}, 
      {name: 'lemon', price: 100, icon: 'lemon-o'}, 
      {name: 'desktop', price: 30, icon: 'desktop'}, 
      {name: 'headphone', price: 50, icon: 'headphones'}, 
      {name: 'coffee', price: 87, icon: 'coffee'}, 
      {name: 'pencil', price: 666, icon: 'pencil'}, 
      {name: 'paint brush', price: 88, icon: 'paint-brush'}, 
      {name: 'android', price: 123, icon: 'android'}, 
      {name: 'bicycle', price: 77, icon: 'bicycle'}, 
      {name: 'motorcycle', price: 4, icon: 'motorcycle'}, 
      {name: 'umbrella', price: 777, icon: 'umbrella'}, 
      {name: 'television', price: 9487, icon: 'television'},
      {name: 'fubol', price: 222, icon: 'futbol-o'},
    ];

    let payment = ['visa', 'mastercard', 'paypal', 'JCB'];
    let paymentIconName = ['cc-visa', 'cc-mastercard', 'paypal', 'cc-jcb'];
    
     return (
      <ScrollView>
        <Button
          onPress={() => this.props.navigation.navigate(
            'Payment', 
            {
              bought: this.bought, 
              payment,
              paymentIconName
            })
          }
          title="Payment"
        />
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
          <View>
            <Text>{this.state.curStuff.name}</Text>
            <TextInput
              style={{height: 40}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Button title="add" onPress={this.addItems.bind(this)}/>
          </View>
        </PopupDialog>
        {
          items.map((item, i) => {
            if(2 == i%3 || items.length-1 == i){
              views = items.slice(i - i%3, i + 1).map((it) => {
                return(
                  <TouchableOpacity style={styles.item} key={`c${it.name}`} 
                    onPress={this.setNumber.bind(this, it)}> 
                    <Icon name={it.icon} color="gray" size={70} style={{marginLeft: 75}} />
                    <Text>{it.name}</Text>
                  </TouchableOpacity>
                )
              })

              return (
                <View style={styles.Row} key={i}>
                  {views}
                </View>
              )
            }
          })
        }
      </ScrollView>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Payment',
  };

  state = {
    showCard: false,
    uri: 'https://media1.giphy.com/avatars/100soft/WahNEDdlGjRZ.gif',
  }

  pay(method){

    let items = this.props.navigation.state.params.bought.map((val)=>{
      return {
        name: val.name,
        amount: val.count,
        price: val.price
      };
    });
    let postdata = {
      items,
      payment: method,
      payment_auth: md5.hex_md5( Date.now() +"" ),
      store: "NCTU"
    };

    switch(method){
      case 'visa':  
        this.setState({uri: 'http://jubeatwww.com.tw/VISA.gif'});
        break;
      case 'mastercard':
        this.setState({uri: 'http://jubeatwww.com.tw/MASTER.gif'});
        break;
      case 'paypal':
        this.setState({uri: ''});
        break;
      case 'jcb':
        this.setState({uri: 'http://jubeatwww.com.tw/JCB.gif'})
        break;
    }

    this.setState({showCard: true});

    fetch('http://pubg.nctu.me:8000/v1/transaction/transac/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postdata)
    }).then(res => res.json())
    .then( (res) => {
      setTimeout(
        () => {
          this.setState({showCard: false});
          Alert.alert(
            '交易成功', 
            null,
            [{text: 'OK', onPress: () => this.props.navigation.goBack()}]);
        }, 
        3000);
    });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <ScrollView>
        <View style={this.state.showCard ? {display: 'none'} : null}>
          <View style={styles.Row}>
            <View style={styles.paymentIcon}>
              <Icon.Button 
                name={state.params.paymentIconName[0]} 
                backgroundColor="transparent" 
                onPress={this.pay.bind(this, 'visa')}
                color="gray" 
                size={100}></Icon.Button>
            </View>
            <View style={styles.paymentIcon}>
              <Icon.Button 
                name={state.params.paymentIconName[1]} 
                backgroundColor="transparent" 
                onPress={this.pay.bind(this, 'mastercard')}
                color="gray" 
                size={100}></Icon.Button>
            </View>
          </View>
          <View style={styles.Row}>
            <View style={styles.paymentIcon2}>
              <Icon.Button 
                name={state.params.paymentIconName[2]} 
                backgroundColor="transparent" 
                onPress={this.pay.bind(this, 'paypal')}
                color="gray" 
                size={100}></Icon.Button>
            </View>
            <View style={styles.paymentIcon2}>
              <Icon.Button 
                name={state.params.paymentIconName[3]} 
                backgroundColor="transparent" 
                onPress={this.pay.bind(this, 'jcb')}
                color="gray" 
                size={100}></Icon.Button>
            </View>
          </View>
          <View style={{marginTop: 40}}>
            <ExpoItemView bought={state.params.bought} />
          </View>
          <View style={styles.backBtn}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Cancel" />
          </View>
          

        </View>
        <View style={styles.imageContainer} 
          style={ this.state.showCard ? 
             {height: Dimensions.get('window').height} : {display: 'none'}}>
          <Image style={styles.image} source={{uri: this.state.uri}} />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  Row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: 'transparent',
    //borderWidth: 1,
    //borderStyle: 'solid',
    //borderColor: 'black',
    flex: 0.3,
    height: 200,
    justifyContent: 'center'
  },
  paymentIcon: {
    flex: 0.5,
    height: 100
  },
  paymentIcon2: {
    flex: 0.5,
    height: 100,
    marginTop: 100
  },
  backBtn: {
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
};

const drawer = DrawerNavigator(
  {
    Home: {
      screen: SellerScreen,
    },
    Payment: {
      screen: MyNotificationsScreen,
    },
    
  },
  {
    contentOptions: {
    activeTintColor: '#e91e63',
    },
  }
);

export default drawer;