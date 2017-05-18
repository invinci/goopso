import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

import NavigationBar from 'react-native-navbar';
var ScrollableTabView = require('react-native-scrollable-tab-view');

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window'),
    back_icon = require('image!back'),
    Followers = require('./Followers'),
    Direct    = require('./Direct');
class ShareTo extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={<Text style={{fontFamily:'din round pro', fontWeight:'800', fontSize:18}}>SHARE TO</Text>}
          leftButton = {
            <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{justifyContent:'center'}}>
              <Image source={back_icon} style={{left:6}}/>
            </TouchableOpacity>
          } />
        <ScrollableTabView 
          tabBarTextStyle={{fontFamily:'din round pro',color:'#5a0fb4',fontWeight:'700'}}
          tabBarInactiveTextColor="gray"
          tabBarUnderlineStyle={{borderBottomColor:'#5a0fb4'}}
          style={{marginHorizontal:(Screen.width/100)*10}}>
          <Followers tabLabel="FOLLOWERS" />
          <Direct tabLabel="DIRECT" />
        </ScrollableTabView>
      </View>
    );

  }

}

module.exports = ShareTo;
