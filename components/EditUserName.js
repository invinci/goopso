import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';

let logo = require('image!logo'),
    Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window'),
    back_icon = require('image!back_icon');
    //NavigationBar = require('react-native-navbar');

class EditEmail extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'ravik',
      lastName:''
    }
  }
  continue(){
    let context = this;
    if(context.state.firstName == '' && context.state.lastName == ''){
      alert('Please enter the details')
    }
    else if(context.state.firstName == ''){
      alert('Please enter your first name')
    }
    else if(context.state.lastName == ''){
      alert('Please enter your last name')
    }
    else{
      // context.props.navigator.push({
      //   component: require('./EnterDateOfBirth'),
      //   passProps: {
      //     'fname': context.state.firstName,
      //     'lname': context.state.lastName
      //   }
      // })
    }
  }
  render() {
    let context = this;
    return (
      <View style={{flex:1}}>
        <NavigationBar
             title={<Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>USERNAME</Text>}
            leftButton= {
              <View style={{flexDirection:'row', padding: 10}}>
                <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.pop()}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>CANCEL</Text>
                </TouchableOpacity>
              </View>}
            rightButton={
              <View style={{flexDirection:'row', padding: 10}}>
                <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.push({component:require('./AddContact')})}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16, color: '#5a0fb4'}}>DONE</Text>
                </TouchableOpacity>
              </View>
          }
             />
        <ScrollView style={{flex: 1,backgroundColor: '#dbd9d9'}}>
          <View style={{flex: 1, flexDirection:'row', marginTop: 20, backgroundColor:'white',height: 60, padding: 20}}>
            <View style={{flex: 0.3}}>
              <Text style={{color:'#b7b7b7',fontSize:16,fontWeight:'600',fontFamily:'din round pro',color:'black'}}>UserName</Text>
            </View>
            <View style={{flex: 0.7}}>
              <TextInput
                autoCorrect={false}
                style={{height: 30,fontSize:16,fontWeight:'700',color:'black',fontFamily:'din round pro'}}
                value={context.state.firstName}
                onChangeText={(firstName) => context.setState({firstName})}
              />
            </View>
          </View>
          <View style={{alignItems:'center',marginVertical:10, paddingLeft: 6}}>
            <Text style={{color:'#b7b7b7',fontSize:14,fontFamily:'din round pro'}}>
              You can update your username here on <Text style={{fontWeight: 'bold'}}>Goopso</Text>. If you do, other people will be able to find you by this username and contact you without knowing your phone number. </Text>
              
                
             
          </View>
          <View style={{alignItems:'center',marginVertical:10, paddingLeft: 0}}>
          <Text style={{color:'#b7b7b7',fontSize:14,fontFamily:'din round pro'}}>
               You can use <Text style={{fontWeight: 'bold'}}>a-z, 0-9 </Text>and underscore.  
               Minimum length is 5 characters  </Text>
          </View>
        </ScrollView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#5a0fb4',
  },
  inputContainer:{
    borderBottomWidth:1,
    marginVertical:16,
    marginHorizontal:(Screen.width/100)*10,
    borderColor:'#b7b7b7',
    height:30,
  }
});

module.exports = EditEmail;