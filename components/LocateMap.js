import React, { Component } from 'react';
import {
  Image,
  MapView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListView,
  PropTypes
} from 'react-native';
import NavigationBar from 'react-native-navbar';

var Dimensions    = require('Dimensions'),
    windowSize    = Dimensions.get('window'),
    Screen        = require('Dimensions').get('window'),
   // NavigationBar = require('react-native-navbar'),
    goopsoIcon    = require('image!goopso'),
    userIcon      = require('image!user-icon'),
    plusIcon      = require('image!plus-icon'),
    demoImg       = require('image!demoImg');

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

class LocateMap extends Component {

  createAnnotation(longitude, latitude) {
    return {
      longitude,
      latitude,
      draggable: true,
      onDragStateChange: (event) => {
        if (event.state === 'starting') {
          this.setState({
            annotations: [this.createAnnotation(event.longitude, event.latitude)],
          });
        }
      },
    };
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isFirstLoad: true,
      annotations: [],
      mapRegion: undefined,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  componentWillMount(){
    console.log('willMount');
  }

  renderData(data){
   // console.log('data ****** ',data)
    return(
      <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#E0E0E0'}}>
        <View style={{flex:2,marginVertical:10}}>
          <View style={{flexDirection:'row'}}>
            <Image source={demoImg} style={{height:40,width:40,borderRadius:20}} />
            <Text style={{padding:6,fontWeight:'600',fontFamily:'din round pro'}}>Kakha is chilling</Text>
          </View>
          <Text style={{fontWeight:'600',fontFamily:'din round pro',color:'#E0E0E0'}}>at Food Court -- Just Now</Text>
        </View>
      </View>
    )
  }

  render() {
    if (this.state.isFirstLoad) {
      var onRegionChangeComplete = (region) => {
        //When the MapView loads for the first time, we can create the annotation at the
        //region that was loaded.
        this.setState({
          isFirstLoad: true,
          annotations: [this.createAnnotation(region.longitude, region.latitude)],
        });
      };
    }

  const rightButtonConfig = {
    title: 'Locate',
    tintColor:'#ffffff',
    handler: () => {
      this.props.data.getMapPosition(this.state.annotations[0].longitude, this.state.annotations[0].latitude);
      this.props.navigator.pop();
    },
  };

    return (
      <View style={{flex:1,marginHorizontal:20}}>
        <NavigationBar
          leftButton= {
            <TouchableOpacity style={{justifyContent:'center'}}>
              <Image source={goopsoIcon} style={{height:20,width:120,left:10,resizeMode:"contain"}}/>
            </TouchableOpacity>}
          rightButton={
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.push({component:require('./UserProfile')})}>
                <Image source={userIcon} style={{height:20,width:20,right:20,resizeMode:"contain"}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.push({component:require('./AddContact')})}>
                <Image source={plusIcon} style={{height:20,width:20,right:10,resizeMode:"contain"}}/>
              </TouchableOpacity>
            </View>
          } />
        <MapView
          style={styles.map}
          onRegionChangeComplete={onRegionChangeComplete}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          zoomEnabled={true}
          showsUserLocation={true}
        /> 
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderData.bind(this)}
        />
      </View>
    );
  }

};

var styles = StyleSheet.create({
  map: {
    height: (Screen.height/100)*41,
    //width: Screen.width
  }
});

module.exports= LocateMap;