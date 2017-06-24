import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
var imagePicker = require('react-native-imagepicker');
import { Button } from 'react-native-elements'

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
    //back_icon = require('image!back'),
    //demoImg = require('image!demoImg'),
    //userIcon = require('image!user-icon'),
   // plusIcon = require('image!plus-icon'),
    //tick_icon = require('image!tick_icon'),
   // shareIcon = require('image!location_icon');
   // NavigationBar = require('react-native-navbar');
class FollowersShareTo extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      imageSource: 'https://facebook.github.io/react/img/logo_og.png',
      sharing:false, text: '',    }
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
        // if(UserData.image.uri !== 'profile_icon')
        //   UserData.image.uri = UserData.image.uri + '?random_number='+new Date().getTime();

        context.props.navigator.userData = UserData;
        console.log('data ******** ',UserData)
        context.setState({
          isLoading: false,
          userData:UserData
        });

      });
  }

  selectPhotoTapped() {
    let context = this;

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      allowsEditing: true,
      storageOptions: {
      skipBackup: true
       }
    };

    imagePicker.open({
        takePhoto: true,
        useLastPhoto: false,
        chooseFromLibrary: true
    }).then(function(imageUri) {
        console.log('imageUri', imageUri, context);
        source = {uri: imageUri.replace('file://', ''), isStatic: true};
        context.setState({imageSource: imageUri});
        //context.updatePhoto();
    }, function() {
        console.log('user cancel');
    });
    
    // ImagePicker.showImagePicker(options, (response) => {
    // if (response.didCancel) {
    //   console.log('User cancelled photo picker');
    // }
    // else if (response.error) {
    //   console.log('ImagePicker Error: ', response.error);
    // }
    // else if (response.customButton) {
    //   console.log('User tapped custom button: ', response.customButton);
    // }
    // else {
    //   let source = {};
    //   if (Platform.OS === 'android')
    //     source = {uri: response.uri, isStatic: true};
    //   else
    //     source = {uri: response.uri.replace('file://', ''), isStatic: true};
    //   context.setState({imageSource: source});
    //   context.updatePhoto();
    // }
    // });
  }

  updatePhoto = () => {
    let context=this;
    
    let token = context.state.userData.logintoken,
        url = encodeURIComponent(token);
    let request = new XMLHttpRequest();
    let photo = {
      uri: context.state.imageSource,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    //console.log('333333333',photo);
    let requestObject = new FormData();
    requestObject.append('file', photo);
    //console.log(requestObject.append('data', photo))

    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let response = JSON.parse(request.response);
        let image = {uri: 'https://tangential-span-155900.appspot-preview.com/img/'+response.img};
        image.uri = image.uri + '?random_number='+new Date().getTime();
      } else {
        console.warn('error', e);
      }
    };

    request.open('PUT', 'https://tangential-span-155900.appspot-preview.com/User/Image/'+url,{'data':'sdfdsfssdf'});
   // console.log('........',requestObject);
    request.send(requestObject);
  }

  render() {
    let context = this;
    console.log("dddd", context)
    return (
      <View style={{flex:1}}>
        {/*<ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>*/}
        <View style={{flex:1, flexDirection: 'column'}}>
          <View style={[styles.container]}>
            <View style={[styles.options]}>
              <View style={{flexDirection:'row'}}>
                <Image
                  style={{width: 60, height: 80}}
                  source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <View style={{flex:1, height: 10}}>
                  <TextInput
                      style={{height: 80, borderColor: 'white', borderWidth: 1, marginLeft: 10}}
                      onChangeText={(text) => this.setState({text})}
                      value={this.state.text}
                      editable = {true}
                      maxLength = {40}
                      multiline
                      placeholder={'Write a caption'}
                      placeholderTextColor={'grey'}
                    />
                </View>
              </View>

            </View>

            <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./FriendsList')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="users" size={20} color="#adabab" />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>TAG PEOPLE</Text>
                </View>
                
              </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./Notifications')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="map-marker" size={20} color="#adabab" />
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>ADD LOCATION</Text>
                </View>
                
              </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./Followers')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                <Icon name="lock" size={20} color="#adabab" />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>BLOCKED</Text>
                </View>
                
              </View>

            </TouchableOpacity>
          </View>
           <View style={{flex: 0.2, padding: 20}}>
              <Button
                raised
                //icon={{name: 'cached'}}
                fontWeight={'bold'}
                buttonStyle={{backgroundColor: '#5a0fb4'}}
                title='SHARE' />
           </View>
          </View>
        {/*</ScrollView>*/}
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    //backgroundColor: '#dbd9d9',
    backgroundColor: '#FFFFFF',
  },
  inputContainer:{
    borderBottomWidth:1,
    marginVertical:16,
    marginHorizontal:(Screen.width/100)*10,
    borderColor:'#b7b7b7',
    height:30,
  },
  options:{borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#cccc',
    padding:20,
    backgroundColor: "white"
  }
});

module.exports = FollowersShareTo;