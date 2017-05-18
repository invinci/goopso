import React, { Component } from 'react';
import {
  View,
  ProgressBarAndroid,
  ActivityIndicator,
  Platform
} from 'react-native';

class Loader extends Component {

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        {(Platform.OS === 'ios') ?
        <ActivityIndicator size="large"/> : 
        <ProgressBarAndroid styleAttr="Normal"/>
        }
      </View>
    );

  }

}

module.exports = Loader;
