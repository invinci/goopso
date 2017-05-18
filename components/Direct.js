import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

class Direct extends Component {

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <Text>Hello, this is Direct screen</Text>
      </View>
    );

  }

}

module.exports = Direct;
