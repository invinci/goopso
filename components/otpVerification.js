import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import RestService from '../utilities/RestService';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window'),
    back_icon = require('image!back_icon'),
    NavigationBar = require('react-native-navbar');

class otpVerification extends Component {
  constructor(props){
    super(props);
    this.state={
      otp1:'',
      otp2:'',
      otp3:'',
      otp4:'',
      isVisible:false
    }
  }

  resend(){
    let context = this;
    let payLoad={
      "logintoken": context.props.data.login_token,
    }
    console.log('otp ----- ',payLoad)
    context.setState({
      isVisible:true
    })
    //console.log('payLoad ------- ', payLoad)
    RestService.putHttp('User/resendOTP', payLoad).then((result) => {
      console.log('result ---- ',result)
      context.setState({
        isVisible:false
      })
      if(result.statusCode == 200){
        alert(result.message)
      }
      else{
        alert(result.message)
      }
    })
  }

  submit(){
    let context = this;
    let payLoad={
      "logintoken": context.props.data.login_token,
      "otp":context.state.otp1+context.state.otp2+context.state.otp3+context.state.otp4
    }
    console.log('otp ----- ',payLoad)
    context.setState({
      isVisible:true
    })
    //console.log('payLoad ------- ', payLoad)
    RestService.putHttp('User/Verify', payLoad).then((result) => {
      console.log('result ---- ',result)
      context.setState({
        isVisible:false
      })
      if(result.statusCode == 200){
        Toast.show(result.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        context.props.navigator.resetTo({
          component: require('./UserProfile')
        })
      }
      else{
        alert(result.message)
      }
    })
  }
  render() {
    let context = this;
    return (
      <View style={{flex:1}}>
        <NavigationBar
            leftButton= {
              <TouchableOpacity  onPress={() => context.props.navigator.pop()}>
                <Image source={{uri: 'back'}} style={{height:20,width:20,right:10,resizeMode:"contain", left: 6}}/>
              </TouchableOpacity>}
            style = {{backgroundColor:'#5a0fb4'}} />
        <View style={styles.container}>
          <View style={{alignItems:'center', marginTop:(Screen.height/100)*5}}>
            <Text style={{fontSize:22,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}>Enter OTP</Text>
          </View>
          <View style={{marginHorizontal:(Screen.width/100)*10,marginTop:(Screen.height/100)*6}}>
            <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro'}}>OTP</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={1}
                onSubmitEditing={(event) => { this.refs.otp2.focus(); }}
                style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro',textAlign:'center'}}
                onChangeText={(otp1) => context.setState({otp1})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='otp2'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={1}
                onSubmitEditing={(event) => { this.refs.otp3.focus(); }}
                style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro',textAlign:'center'}}
                onChangeText={(otp2) => context.setState({otp2})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='otp3'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={1}
                onSubmitEditing={(event) => { this.refs.otp4.focus(); }}
                style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro',textAlign:'center'}}
                onChangeText={(otp3) => context.setState({otp3})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='otp4'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={1}
                style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro',textAlign:'center'}}
                onChangeText={(otp4) => context.setState({otp4})}
              />
            </View>
          </View>
          <TouchableOpacity onPress={()=>context.submit()} style={{marginTop:(Screen.height/100)*15,alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,padding:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'transparent',borderRadius:5,}}>
            <Text style={{color:'#5a0fb4', fontWeight:'700',fontSize:18,fontFamily:'din round pro'}}>VERIFY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>context.resend()} style={{marginTop:(Screen.height/100)*15,alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,padding:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'transparent',borderRadius:5,}}>
            <Text style={{color:'#5a0fb4', fontWeight:'700',fontSize:18,fontFamily:'din round pro'}}>RESEND OTP</Text>
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
    flex:1,
    borderBottomWidth:1,
    marginVertical:(Screen.width/100)*5,
    marginHorizontal:(Screen.width/100)*5,
    borderColor:'#b7b7b7',
    height:30,
  }
});

module.exports = otpVerification;