/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  AsyncStorage
} from 'react-native';

let UserProfile = require ('./components/UpdateProfile/EditPassword'),
    StartPage = require ('./components/StartPage'),
    Loader = require ('./components/Loader'),
    Chat = require ('./components/shareTo'),
    Followers = require ('./components/Notifications'),
    LocateMap = require('./components/LocateMap');

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLogin: false,
    };
  }
  async getUserData() {
      let context = this;
      let value = await AsyncStorage.getItem('UserData');
        return new Promise(function (fulfill, reject){
          // console.log('UserData', value)
          UserData = JSON.parse(value);
          fulfill();
      });
  }

  componentWillMount() {
      let context = this;
      context.getUserData().then(()=>{
        // console.log('UserData', UserData)
        context.setState({
          isLoading: false,
          isLogin: UserData ? true : false
        });

      });
  }

  render() {
    let context = this;
    if(context.state.isLoading)
     return <Loader/>

    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{
          component: context.renderComponent(),
          //component:require('./components/StartPage')
        }}
      renderScene={this.renderScene}
      configureScene={(route, routeStack) =>
        Navigator.SceneConfigs.PushFromRight} />
    );
  }

  renderScene(route, navigator) {
      let Component = route.component;
      return <Component navigator={navigator} route={route} data={route.passProps}/>;
  }

  renderComponent(){

    let context = this;

    if(context.state.isLogin)
      return LocateMap;
      //return UserProfile;
    else
      return LocateMap  ;
      //return StartPage;
      //return UserProfile;

  }
}

AppRegistry.registerComponent('Project', () => Project);
