import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

let logo = require('image!logo'),
    Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');

class StartPage extends Component {
  logIn(){
    let context = this;
    context.props.navigator.push({
      component:require('./Login')
    })
  }
  signUp(){
    let context = this;
    context.props.navigator.push({
      component:require('./signUp/EnterFnameLname')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:6, alignItems:'center', marginTop:(Screen.height/100)*30}}>
          <Image source={logo} resizeMode='contain' style={{height:(Screen.height/100)*20,width:(Screen.width/100)*100}}/>
        </View>
        <TouchableOpacity onPress={()=>this.logIn()} style={{flex:1,alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,backgroundColor:'#ffffff',borderWidth:1,borderColor:'transparent',borderRadius:5,}}>
          <Text style={{color:'#5a0fb4', fontWeight:'700',fontSize:18, fontFamily:'din round pro'}}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.signUp()} style={{flex:1,alignItems:'center',justifyContent:'center',marginVertical:10,marginHorizontal:10,backgroundColor:'transparent',borderWidth:2,borderColor:'#ffffff',borderRadius:5,}}>
          <Text style={{color:'#ffffff', fontWeight:'700',fontSize:18, fontFamily:'din round pro'}}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a0fb4',
  }
});

module.exports = StartPage;