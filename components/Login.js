import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  TextInput
} from 'react-native';

import RestService from '../utilities/RestService';
import Spinner from 'react-native-loading-spinner-overlay';
import NavigationBar from 'react-native-navbar';

var jwtDecode = require('jwt-decode');

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
    //back_icon = require('image!back_icon');
    //NavigationBar = require('react-native-navbar');
let lat = 0, lng = 0;

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      isVisible:false,
      username:'',
      password:'',
      latitude:'30.7046',
      longitude:'76.7179'
    }
  }
  
  async setUserInfo(data){
    await AsyncStorage.setItem('UserData', JSON.stringify(data));
    //console.log('data -----',data)
  };

  logIn(){
    let context = this;
        // payLoad = {
        //   "login_email":context.state.username,
        //   "password": context.state.password,
        //   "location": {
        //     "lat": context.state.latitude,
        //     "long": context.state.longitude
        //   }
        // };
    // if(context.state.username == ''){
    //   alert('Please enter your registered email or username')
    // }
    // else if(context.state.password == ''){
    //   alert('Please enter your password')
    // }
    // else{
    //     context.setState({
    //       isVisible:true
    //     })
    //     RestService.putHttp('User/login', payLoad).then((result) => {
    //       context.setState({
    //         isVisible:false
    //       })
    //       if(result.statusCode == 200){
    //         context.props.navigator.resetTo({
    //             component: require('./LocateMap'),
    //             // passProps: {
    //             //   getMapPosition: context.locatePosition,
    //             //   login_token: token
    //             // }
    //           })
    //       }
    //       else{
    //         alert(result.message)
    //       }
    //   })

              // context.props.navigator.resetTo({
              //   component: require('./LocateMap'),
              //   passProps: {
              //     getMapPosition: context.locatePosition,
              //     login_token: "dghfgfhdghfdghfg"
              //   }
              // })
              // return;

              console.log("ff",context)
      fetch('https://tangential-span-155900.appspot-preview.com/v1/User/login', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "login_email": context.state.username,
          "password": context.state.password,
          "location": {
            "lat": context.state.latitude,
            "long": context.state.longitude
          }
        })
      }).then((result) => {
        console.log('result ---- ',result)
          // if(result.ok){
            var token = result.headers.map['x-logintoken'][0];
            var decoded = jwtDecode(token)
            decoded.logintoken = token
            //console.log(decoded)
            if(decoded.is_confirmed){
              context.props.navigator.resetTo({
                component: require('./LocateMap'),
                passProps: {
                  getMapPosition: context.locatePosition,
                  login_token: token
                }
              })
              context.setUserInfo(decoded)
            }
            else{
              alert('Please check your credentials and try again!')
            }
          // }
        })
  }
  forgotPassword(){
    let context = this;
    context.props.navigator.push({
      component:require('./ResetPassword')
    })
  }

  componentDidMount(){
    let  context = this;
    context.locatePosition()
  }

  locatePosition(ulat, ulng) {
    let context = this;
    lat = ulat, lng = ulng;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        var crd = position.coords;
        var lat = crd.latitude.toString();
        var long = crd.longitude.toString();
        context.setState({
          latitude: lat,
          longitude: long
        })
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000}
    );
  }
  

  render() {
    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };

    const titleConfig = {
      title: 'Hello, world',
    };
    let context = this;
    return (
      <View style={{flex:1}}>
        <Spinner visible={this.state.isVisible} />
        <NavigationBar
            leftButton= {
              <TouchableOpacity  onPress={() => context.props.navigator.pop()}>
                <Image source={{uri: 'back_icon'}} style={{top:12,left:6}}/>
              </TouchableOpacity>}
            style = {{backgroundColor:'#5a0fb4'}} />
        <View style={styles.container}>
          <View style={{alignItems:'center', marginTop:(Screen.height/100)*5}}>
            <Text style={{fontSize:22,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}>Log In</Text>
          </View>
          <View style={{marginHorizontal:(Screen.width/100)*10,marginTop:(Screen.height/100)*6}}>
            <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro'}}>USERNAME/EMAIL</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}
              onChangeText={(username) => context.setState({username})}
            />
          </View>
          <View style={{marginHorizontal:(Screen.width/100)*10,marginTop:(Screen.height/100)*6}}>
            <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro'}}>PASSWORD</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCorrect={false}
              password={true}
              style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}
              onChangeText={(password) => context.setState({password})}
            />
          </View>
          <TouchableOpacity onPress={()=>context.forgotPassword()}><Text style={{fontSize:16,fontWeight:'700',color:'#ffffff',textAlign:'center',marginVertical:(Screen.height/100)*3,fontFamily:'din round pro'}}>Forgot Your Password?</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>context.logIn()} style={{alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,padding:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'transparent',borderRadius:5,}}>
            <Text style={{color:'#5a0fb4', fontWeight:'700',fontSize:18,fontFamily:'din round pro'}}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a0fb4',
  },
  inputContainer:{
    borderBottomWidth:1,
    marginVertical:16,
    marginHorizontal:(Screen.width/100)*10,
    borderColor:'#b7b7b7',
    height:30,
  }
});

module.exports = Login;