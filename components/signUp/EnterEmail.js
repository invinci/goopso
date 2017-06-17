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

import RestService from '../../utilities/RestService';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import NavigationBar from 'react-native-navbar';

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
   // NavigationBar = require('react-native-navbar');

class EnterEmail extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      isVisible:false
    }
  }
  validateEmail() {
    let context = this;
    if(context.state.email == '' && !context.state.email.trim()){
      alert('Please enter your email')
    }
    else{
      context.setState({
        isVisible:true
      })
      RestService.getHttp('User/checkEmail',{email:context.state.email}).then((result) => {
        //console.log('result ----- ',result)
        context.setState({
          isVisible:false
        })
        if (result.statusCode == 200) {
          context.submit()
        }
        else{
          alert(result.message)
        }
      })
    }
  }
  submit(){
    let context = this;
    context.props.navigator.push({
      component:require('./EnterPassword'),
      passProps:{
        'fname': context.props.data.fname,
        'lname': context.props.data.lname,
        'uname': context.props.data.uname,
        'email': context.state.email
      }
    })
    // let payLoad={
    //   "first_name": context.props.data.fname,
    //   "last_name": context.props.data.lname,
    //   "username": context.props.data.uname,
    //   "email": context.state.email,
    //   "mobile": context.props.data.pnumb,
    //   "password": context.props.data.pword
    // }
    // context.setState({
    //   isVisible:true
    // })
    // console.log('payLoad ------- ', payLoad)
    // RestService.postHttp('User/registerNewUser', payLoad).then((result) => {
    //   console.log('result resgister ---- ',result)
    //   context.setState({
    //     isVisible:false
    //   })
    //   if(result.statusCode == 200){
    //     Toast.show(result.message, {
    //         duration: Toast.durations.LONG,
    //         position: Toast.positions.TOP,
    //         shadow: true,
    //         animation: true,
    //         hideOnPress: true,
    //         delay: 0,
    //       });
    //     context.props.navigator.resetTo({
    //       component: require('../StartPage')
    //     })
    //   }
    //   else{
    //     alert(result.message)
    //   }
    // })
  }
  render() {
    let context = this;
    return (
      <View style={{flex:1}}>
        <Spinner visible={this.state.visible} />
        <NavigationBar
            leftButton= {
              <TouchableOpacity  onPress={() => context.props.navigator.pop()}>
                <Image source={{uri : 'back_icon'}} style={{top:12,left:6}}/>
              </TouchableOpacity>}
            style = {{backgroundColor:'#5a0fb4'}} />
        <View style={styles.container}>
          <View style={{alignItems:'center', marginTop:(Screen.height/100)*5}}>
            <Text style={{fontSize:22,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}>Enter Email</Text>
          </View>
          <View style={{marginHorizontal:(Screen.width/100)*10,marginTop:(Screen.height/100)*6}}>
            <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro'}}>Email</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}
              onChangeText={(email) => context.setState({email})}
            />
          </View>
          <TouchableOpacity onPress={()=>context.validateEmail()} style={{marginTop:(Screen.height/100)*15,alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,padding:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'transparent',borderRadius:5,}}>
            <Text style={{color:'#5a0fb4', fontWeight:'700',fontSize:18,fontFamily:'din round pro'}}>CONTINUE</Text>
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

module.exports = EnterEmail;