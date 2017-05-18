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
var IndexedListView =  require('@remobile/react-native-indexed-listview');
let context;
let Screen = require('Dimensions').get('window'),
    {height, width} = Dimensions.get('window'),
    back_icon = require('image!back'),
    demoImg = require('image!demoImg'),
    userIcon = require('image!user-icon'),
    plusIcon = require('image!plus-icon'),
    tick_icon = require('image!tick_icon'),
    shareIcon = require('image!location_icon');
   // NavigationBar = require('react-native-navbar');

const list= {
                'A': [
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'B': [
                     {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'C': [
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'D': [
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'E': [
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'F': [
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'G': [
                 {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                    {name: 'Amy Farha', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: 'Chris Jackson', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}},
                ],
                'H': [
                    {name: '阿三', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: '阿哥', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: '阿拉斯加', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: '阿星', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                    {name: '阿杜', img:{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}},
                ],
            };
class FriendsList extends Component {
  constructor(props){
    super(props);
  }

  
  componentWillMount() {
      
  }

  renderRow(obj, sectionID, rowID) {
        return (
            <TouchableOpacity style={styles.row} 
              onPress={()=>{
                            context.props.navigator.push({
                               component: require('./FriendProfile')
                            })
                          }
              }>
                <Image
                    resizeMode='stretch'
                    source={obj.img}
                    style={styles.avatar}
                    />
                <Text sytle={styles.name}>{obj.name}</Text>
            </TouchableOpacity>
        )
    }

     renderSectionHeader(obj, sectionID) {
        return (
            <View style={{backgroundColor:'#e2dede', paddingTop: 10, paddingBottom: 10, flex: 1, paddingLeft: 10}} >
                <Text >{sectionID}</Text>
            </View>
        );
    }

  render() {
     context = this;
    return (
      <View style={{flex:1}}>
        <NavigationBar
          title={<Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>FRIENDS</Text>}
          leftButton= {
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.pop()}>
              <Image source={back_icon} style={{}}/>
            </TouchableOpacity>}
          style = {{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,.1)'}} />
          <View>
            <SearchBar
                lightTheme
                onChangeText={()=>console.log()}
                containerStyle={{backgroundColor :'#ddd9d9'}}
                inputStyle={{backgroundColor :'#ddd9d9'}}
                placeholder='Search for a friend...' />
         </View>
               <View style={styles.container}>
                <IndexedListView
                    list={list}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    showAlphabetaList={false}
                    />
            </View>
      </View>
       
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -1
        //  paddingTop: 24,
    },
    row: {
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginHorizontal: 20,
    },
    name: {
        fontSize: 16,
    }
});

module.exports = FriendsList;


