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
import { List, ListItem } from 'react-native-elements'

let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window');
    //back_icon = require('image!back'),
    //demoImg = require('image!demoImg'),
    //userIcon = require('image!user-icon'),
    //plusIcon = require('image!plus-icon'),
   // tick_icon = require('image!tick_icon'),
    //shareIcon = require('image!location_icon');
   // NavigationBar = require('react-native-navbar');

   const list = [
  {
    name: 'Rajeev has uploaded a new photo!',
    subtitle: 'Uploaded anew photo by 10 Am',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: 'Ravi kumar has poked you!',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Poked you and has sent a message'
  },
]
class Notifications extends Component {
  constructor(props){
    super(props);
  }

  
  componentWillMount() {
      
  }

  renderList(){
    return(
        <List containerStyle={{marginBottom: 20, borderTopWidth:0, borderBottomWidth:0}}>
            {
           list.map((data, index) => (
                    <ListItem
                    style={index === 0 ? {borderBottomWidth:1, borderBottomColor:"#cccc", paddingBottom:15, paddingRight: 10} : {borderBottomWidth:1, borderBottomColor:"#cccc", paddingTop: 15, paddingBottom:15, paddingRight: 10}}
                    roundAvatar
                    avatar={{uri:data.avatar_url}}
                    key={index}
                    hideChevron
                    title={data.name}
                    titleStyle={{fontWeight:'bold', fontFamily:'din round pro'}}
                    subtitle={
                    <View  style={styles.subtitleView}>
                        <Text style={styles.ratingText}>{data.subtitle}</Text>
                    </View>
                    }
                />
             ))
            } 
        </List>
    );
  }

  render() {
    let context = this;
    return (
      <View style={{flex:1}}>
        <NavigationBar
          title={<Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>NOTIFICATIONS</Text>}
          leftButton= {
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.pop()}>
              <Image source={{uri: 'back'}} style={{height:20,width:20,right:10,resizeMode:"contain", left: 6}}/>
            </TouchableOpacity>}
          style = {{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,.1)'}} />
        <ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {this.renderList()}
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
    //marginVertical:16,
   // marginHorizontal:(Screen.width/100)*10,
    borderColor:'#b7b7b7',
    height:30,
  },
  options:{borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#cccc',
    padding:20,
    backgroundColor: "white"
  },
   subtitleView: {
    flexDirection: 'row',
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
    fontFamily:'din round pro'
  }
});

module.exports = Notifications;


