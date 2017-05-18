import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import RestService from '../../utilities/RestService';
import Toast from 'react-native-root-toast';
import NavigationBar from 'react-native-navbar';

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window'),
    back_icon = require('image!back_icon');
    //NavigationBar = require('react-native-navbar');

const Digits = require('react-native-fabric-digits');
const { DigitsLoginButton, DigitsLogoutButton } = Digits;

class EnterPassword extends Component {
  constructor(props){
    super(props);
    this.state={
      password:'',
      isVisible:false,
      logged: false,
      error: false,
      response:{}
    }
    this.completion = this.completion.bind(this);
    this.getSessionDetails = this.getSessionDetails.bind(this);
  }

  completion(error, response) {
    let context = this;
    if (error && error.code !== 1) {
      context.setState({ logged: false, error: true, response: {} });
    } else if (response) {
      // let payLoad={
      //   "first_name": context.props.data.fname,
      //   "last_name": context.props.data.lname,
      //   "username": context.props.data.uname,
      //   "email": context.props.data.email,
      //   "mobile": context.props.data.pnumb,
      //   "password": context.state.password
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
      const logged = JSON.stringify(response) === '{}' ? false : true;
      context.setState({ logged: logged, error: false, response: response }, context.getSessionDetails);
    }
  }

  // submit(pnumb){
  //   let context = this;
  //   if(context.state.password.length < 8){
  //     alert('Your password should be atleast 8 characters')
  //   }
  //   else if(context.state.password == ''){
  //     alert('Please enter a password')
  //   }
  //   else{
  //       let payLoad={
  //       "first_name": context.props.data.fname,
  //       "last_name": context.props.data.lname,
  //       "username": context.props.data.uname,
  //       "email": context.props.data.email,
  //       "mobile": pnumb,
  //       "password": context.state.password
  //     }
  //     context.setState({
  //       isVisible:true
  //     })
  //     console.log('payLoad ------- ', payLoad)
  //     RestService.postHttp('User/registerNewUser', payLoad).then((result) => {
  //       context.setState({
  //         isVisible:false
  //       })
  //       if(result.statusCode == 200){
  //         Toast.show(result.message, {
  //             duration: Toast.durations.LONG,
  //             position: Toast.positions.TOP,
  //             shadow: true,
  //             animation: true,
  //             hideOnPress: true,
  //             delay: 0,
  //           });
  //         context.props.navigator.resetTo({
  //           component: require('../LocateMap')
  //         })
  //       }
  //       else{
  //         alert(result.message)
  //       }
  //     })
  //   }
  // }

  getSessionDetails() {
    let context = this;
    if (this.state.logged) {
      this.refs.DigitsLogoutButton.getSessionDetails(function(sessionDetails) {
        Alert.alert('Success!', sessionDetails.phoneNumber);
        //console.log('getSessionDetails ******* ',sessionDetails)
        let payLoad={
        "first_name": context.props.data.fname,
        "last_name": context.props.data.lname,
        "username": context.props.data.uname,
        "email": context.props.data.email,
        "mobile": sessionDetails.phoneNumber,
        "password": context.state.password
      }
      context.setState({
        isVisible:true
      })
      //console.log('payLoad ------- ', payLoad)
      RestService.postHttp('User/registerNewUser', payLoad).then((result) => {
        //console.log('result *********** ',result)
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
            component: require('../LocateMap')
          })
        }
        else{
          alert(result.message)
        }
      })
      });
     }
  }

  render() {
    let context = this;
    const content = context.state.logged ?
      (<View style={styles.container}>
        <DigitsLogoutButton
          ref="DigitsLogoutButton"
          completion={context.completion}
          text="Logout"
          buttonStyle={styles.DigitsAuthenticateButton}
          textStyle={styles.DigitsAuthenticateButtonText}/>
      </View>) : (
      <DigitsLoginButton
        ref="DigitsLoginButton"
        options={{
          title: "",
          phoneNumber: "+1",
          appearance: {
            backgroundColor: {
              hex: "#5a0fb4",
              alpha: 1.0
            },
            accentColor: {
              hex: "#ffffff",
              alpha: 1.0
            },
            headerFont: {
              name: "din round pro",
              size: 16
            },
            labelFont: {
              name: "din round pro",
              size: 18
            },
            bodyFont: {
              name: "din round pro",
              size: 16
            }
          }
        }}
        completion={this.completion}
        text="Continue"
        buttonStyle={styles.DigitsAuthenticateButton}
        textStyle={styles.DigitsAuthenticateButtonText}/>)
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
            <Text style={{fontSize:22,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}>Enter Password</Text>
          </View>
          <View style={{marginHorizontal:(Screen.width/100)*10,marginTop:(Screen.height/100)*6}}>
            <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro'}}>Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              password={true}
              style={{flex:1,fontSize:16,fontWeight:'700',color:'#ffffff',fontFamily:'din round pro'}}
              onChangeText={(password) => context.setState({password})}
            />
          </View>
          {content}
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
  },
  DigitsAuthenticateButton: {
    marginTop:(Screen.height/100)*15,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
    marginHorizontal:10,
    padding:15,
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderColor:'transparent',
    borderRadius:5,
  },
  DigitsAuthenticateButtonText: {
    color:'#5a0fb4', 
    fontWeight:'700',
    fontSize:18,
    fontFamily:'din round pro'
  },
});

module.exports = EnterPassword;