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

import PhoneNumberPicker from 'react-native-country-code-telephone-input'
import NavigationBar from 'react-native-navbar';

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window'),
    back_icon = require('image!back_icon');
    //NavigationBar = require('react-native-navbar');

class EnterPhoneNumber extends Component {
  constructor(props){
    super(props);
    this.state={
      mobileNum:'',
    }
  }

  PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
    this.setState({
      countryName: country.name, 
      callingCode: callingCode, 
      phoneNo:phoneNumber
    });
  }

  submit(){
    let context = this;
    context.props.navigator.push({
      component: require('./EnterEmail'),
      passProps: {
        'fname': context.props.data.fname,
        'lname': context.props.data.lname,
        'uname': context.props.data.uname,
        'pword': context.props.data.pword,
        'pnumb': '+'+context.state.callingCode+'-'+context.state.phoneNo
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
                <Image source={back_icon} style={{top:12,left:6}}/>
              </TouchableOpacity>}
            style = {{backgroundColor:'#5a0fb4'}} />
        <View style={styles.container}>
          <View style={{alignItems:'center', marginTop:(Screen.height/100)*5}}>
            <Text style={{fontSize:22,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}>Enter Mobile Number</Text>
          </View>
          <View style={{marginHorizontal:(Screen.width/100)*10,marginTop:(Screen.height/100)*6}}>
            <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro'}}>Mobile Number</Text>
          </View>
          <PhoneNumberPicker
            countryHint={{name: 'United States', cca2: 'US', callingCode:"1"}}
            onChange={this.PhoneNumberPickerChanged.bind(this)}/>
          <TouchableOpacity onPress={()=>context.submit()} style={{marginTop:(Screen.height/100)*15,alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,padding:15,backgroundColor:'#ffffff',borderWidth:1,borderColor:'transparent',borderRadius:5,}}>
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
    marginHorizontal:(Screen.width/100)*10,
    borderColor:'#b7b7b7',
    height:30,
  }
});

module.exports = EnterPhoneNumber;