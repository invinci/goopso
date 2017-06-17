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
import NavigationBar from 'react-native-navbar';

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
   // back_icon = require('image!back'),
    //demoImg = require('image!demoImg'),
    //tick_icon = require('image!tick_icon'),
    //phone = require('image!phone'),
    //send_text = require('image!send_text');
    //NavigationBar = require('react-native-navbar');
let lat = 0, lng = 0;
class FriendProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
    }
  }

  render() {
    let context = this;
    return (
      <View style={{flex:1}}>
        <NavigationBar
          leftButton= {
            <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
              <Image source={{ uri :'back_icon'}} style={{top:20,left:6}}/>
            </TouchableOpacity>}
          style = {{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,.1)', height:(Screen.height/100)*10}} />
        <View style={styles.container}>
          <TouchableOpacity style={{justifyContent:'center' ,marginVertical:20,alignItems:'center'}}>
            <Image source={{uri: 'demoImg'}} style={{height:150,width:150,borderRadius:75}}/>
          </TouchableOpacity>
          <Text style={{textAlign:'center', fontSize:22, fontWeight:'700',fontFamily:'din round pro'}}>Vera Lair</Text>
          <Text style={{marginTop:10,textAlign:'center', color:'#b7b7b7',fontWeight:'600',fontSize:16,fontFamily:'din round pro'}}>Is off the grid</Text>
          <Text style={{textAlign:'center', color:'#b7b7b7',fontWeight:'600',fontSize:16,fontFamily:'din round pro'}}>last seen at Arena -- 38 min. ago</Text>
          <View style={{flexDirection:'row',marginVertical:20}}>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{fontSize:22, fontWeight:'700',fontFamily:'din round pro'}}>1284</Text>
              <Text style={{color:'#b7b7b7',fontWeight:'600',fontSize:16,fontFamily:'din round pro'}}>Posts</Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{fontSize:22, fontWeight:'700',fontFamily:'din round pro'}}>34K</Text>
              <Text style={{color:'#b7b7b7',fontWeight:'600',fontSize:16,fontFamily:'din round pro'}}>Followers</Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{fontSize:22, fontWeight:'700',fontFamily:'din round pro'}}>394</Text>
              <Text style={{color:'#b7b7b7',fontWeight:'600',fontSize:16,fontFamily:'din round pro'}}>Following</Text>
            </View>
          </View>
          <View style={{height:(Screen.height/100)*9, backgroundColor:'#5a0fb4',marginHorizontal:20,borderWidth:1,borderColor:'transparent',borderRadius:5,alignItems:'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
              <Image source={tick_icon} style={{marginHorizontal:10,marginVertical:5}}/>
              <Text style={{fontSize:20,fontWeight:'800',color:'#ffffff',fontFamily:'din round pro'}}>FOLLOWING</Text>
            </View>
          </View>
          <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'rgba(0,0,0,.1)',padding:20,marginVertical:20}}>
            <View style={{flexDirection:'row'}}>
              <Image source={{uri :'phone'}} style={{height:20,width:20}}/>
              <Text style={{fontWeight:'700',left:15,fontFamily:'din round pro'}}>CALL VERA</Text>
            </View>
          </View>
          <TouchableOpacity style={{flexDirection:'row',paddingLeft:20}} onPress={()=>this.props.navigator.push({component:require('./Chat')})}>
            <Image source={{uri : 'send_text'}} style={{height:20,width:20}}/>
            <Text style={{fontWeight:'700',left:15,fontFamily:'din round pro'}}>SEND A TEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#5a0fb4',
  },
  inputContainer:{
    borderBottomWidth:1,
    marginVertical:16,
    marginHorizontal:(Screen.width/100)*10,
    borderColor:'#b7b7b7',
    height:30,
  }
});

module.exports = FriendProfile;