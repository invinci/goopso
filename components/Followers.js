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
import { List, ListItem, SearchBar } from 'react-native-elements'

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
    //back_icon = require('image!back'),
    //demoImg = require('image!demoImg'),
    //userIcon = require('image!user-icon'),
    //plusIcon = require('image!plus-icon'),
    //tick_icon = require('image!tick_icon'),
    //shareIcon = require('image!location_icon');
   // NavigationBar = require('react-native-navbar');

   const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]
class Followers extends Component {
  constructor(props){
    super(props);
  }

  
  componentWillMount() {
      
  }

  render() {
    let context = this;
    return (
      <View style={{flex:1}}>
        <NavigationBar
          title={<Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>BLOCKED FRIENDS</Text>}
          leftButton= {
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.pop()}>
              <Image source={{uri :'back_icon'}} style={{}}/>
            </TouchableOpacity>}
          style = {{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,.1)'}} />
          <View>
            <SearchBar
                lightTheme
                onChangeText={()=>console.log()}
                containerStyle={{backgroundColor :'#ddd9d9'}}
                inputStyle={{backgroundColor :'#ddd9d9'}}
                placeholder='Search' />
         </View>
        <ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{marginTop: 0, borderTopWidth:0}}>
            <List containerStyle={{marginBottom: 20, borderTopWidth:0, borderBottomWidth:0}}>
                {
                  list.map((l, i) => (
                    <ListItem
                     style={i === 0 ? {borderBottomWidth:1, borderBottomColor:"#cccc", paddingBottom:15, paddingRight: 10} : {borderBottomWidth:1, borderBottomColor:"#cccc", paddingTop: 15, paddingBottom:15, paddingRight: 10}}
                      roundAvatar
                      avatar={{uri:l.avatar_url}}
                      hideChevron
                      key={i}
                      title={
                        <View style={styles.subtitleView}>
                          <Text style={styles.ratingText}>{l.name}</Text>
                          <TouchableOpacity onPress={()=>alert("Friend unblocked!")}>
                              <Text style={styles.ratingText1}>UNBLOCK</Text>
                          </TouchableOpacity>
                        </View>
                      }
                    />
                  ))
                }
              </List>
        </ScrollView>
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbd9d9',
    fontFamily:'din round pro'
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
  },
  ratingText: {
    flex: 0.7,
    alignItems: 'flex-start',
    paddingLeft: 10,
    color: 'black',
    fontFamily:'din round pro'
  },
   ratingText1: {
    flex: 0.3,
    alignItems: 'flex-end',
    paddingLeft: 10,
    justifyContent:'flex-end',
    color: '#5a0fb4',
    fontWeight: 'bold',
    fontFamily:'din round pro'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
});

module.exports = Followers;







