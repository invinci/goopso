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

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
    //back_icon = require('image!back'),
    //demoImg = require('image!demoImg'),
    //userIcon = require('image!user-icon'),
   // plusIcon = require('image!plus-icon'),
    //tick_icon = require('image!tick_icon'),
   // shareIcon = require('image!location_icon');
   // NavigationBar = require('react-native-navbar');
class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      imageSource: 'https://facebook.github.io/react/img/logo_og.png',
      sharing:false    }
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
        <NavigationBar
          title={<Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>PROFILE</Text>}
          leftButton= {
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.pop()}>
              <Image source={{uri:'back_icon'}} style={{}}/>
            </TouchableOpacity>}
          style = {{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,.1)'}} />
        <ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TouchableOpacity onPress={()=>this.selectPhotoTapped()} style={{justifyContent:'center' ,marginVertical:20,alignItems:'center'}}>
                 <Image key={context.state.imageSource} source={{uri: context.state.imageSource }} style={{height:100,width:100,borderRadius:50}}/>
            </TouchableOpacity >
            <Text style={{textAlign:'center', fontSize:22, fontWeight:'700',fontFamily:'din round pro'}}>{context.state.userData ? context.state.userData.firstname + ' ' + context.state.userData.lastname: 'dsefesf'}</Text>
            <Text style={{marginTop:10,textAlign:'center', color:'#b7b7b7',fontWeight:'600',fontSize:16,fontFamily:'din round pro',marginBottom:20}}>you need to share your location to see what your friends are up to</Text>
            
            <View style={[styles.options,{marginBottom: 20}]}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="map-marker" size={20} color="#adabab" />
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>SHARE MY LOCATION</Text>
                </View>
                <View style={{flex:1, height: 10}}>
                  <Switch
                    onValueChange={(value) => this.setState({sharing: value})}
                    onTintColor="#5a0fb4"
                    style={{}}
                    value={this.state.sharing} />
                </View>
              </View>

            </View>

            <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./Account')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="cog" size={20} color="#adabab" />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>ACCOUNT</Text>
                </View>
                
              </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./FriendsList')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="users" size={20} color="#adabab" />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>FRIENDS</Text>
                </View>
                
              </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./Notifications')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                   <Icon name="bell" size={20} color="#adabab" />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>NOTIFICATIONS</Text>
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

             <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./About&Help')})} style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                <Icon name="question-circle" size={20} color="#adabab"  />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>ABOUT & HELP</Text>
                </View>
                
              </View>

            </TouchableOpacity>

             <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./StartPage')})} style={[styles.options,{marginTop : 20, marginBottom: 20}]}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                <Icon name="power-off" size={20} color="red"  />
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro', color:'red'}}>LOGOUT</Text>
                </View>
                
              </View>

            </TouchableOpacity>
{/*
            <View style={styles.options}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Image source={plusIcon} style={{height:20,width:20,right:3,resizeMode:"contain"}}/>
                  
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>Added me</Text>
                </View>
              
              </View>

            </View>

            <View style={styles.options}>
              <TouchableOpacity onPress={()=>this.props.navigator.push({component:require('./Chat')})} style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Image source={shareIcon}/>
                </View>
                <View style={{flex:5,alignItems:'flex-start'}}>
                  <Text style={{fontWeight:'700',fontFamily:'din round pro'}}>Messages</Text>
                </View>
                
              </TouchableOpacity>

            </View>*/}
          
          </View>
        </ScrollView>
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbd9d9',
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

module.exports = UserProfile;