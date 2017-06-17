import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ListView,
  PropTypes,
  DatePickerIOS,
  Animated 
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Interactable from 'react-native-interactable';
import MapView from 'react-native-maps';
import flagPinkImg from '../img/flag-pink.png';
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
}
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class LocateMap extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._deltaY = new Animated.Value(Screen.height-100);
    this.state = {
      check: true,
      isFirstLoad: true,
       annotations: [],
      mapRegion: undefined,
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6' ,'row 7']),
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers:[{id:1,coordinate:{latitude: 37.78825,longitude: -122.4324}},{id:2,coordinate:{latitude: 37.77400,longitude: -122.4324}}],
    };

    this.onMapPress = this.onMapPress.bind(this);
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });
  }

  onSnap(event) {
    const { index } = event.nativeEvent;
    if (index === 2) {
      this.setState({ check: true });
      console.log("id", event.nativeEvent);
    }else{
      this.setState({ check: false });
      console.log("elseid", event.nativeEvent);
    }
  }

  renderData(data){
    return(
      <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#E0E0E0'}}>
        <View style={{flex:2,marginVertical:10}}>
          <View style={{flexDirection:'row'}}>
            <Image source={{uri:'demoImg'}} style={{height:40,width:40,borderRadius:20}} />
            <Text style={{padding:6,fontWeight:'600',fontFamily:'din round pro'}}>Kakha is chilling</Text>
          </View>
          <Text style={{fontWeight:'600',fontFamily:'din round pro',color:'#dadada'}}>at Food Court -- Just Now</Text>
        </View>
      </View>
    )
  }

  render() {
     if (this.state.isFirstLoad) {
      var onRegionChangeComplete = (region) => {
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
    <View style={{flex:1,marginHorizontal:0}}>
        <NavigationBar
          leftButton= {
            <TouchableOpacity style={{justifyContent:'center'}}>
              <Image source={{uri :'<goopso></goopso>'}} style={{height:20,width:120,left:10,resizeMode:"contain"}}/>
            </TouchableOpacity>}
          rightButton={
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.push({component:require('./UserProfile')})}>
                <Image source={{uri :'user-icon'}} style={{height:20,width:20,right:20,resizeMode:"contain"}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this.props.navigator.push({component:require('./AddContact')})}>
                <Image source={{uri: 'plus-icon'}} style={{height:20,width:20,right:10,resizeMode:"contain"}}/>
              </TouchableOpacity>
            </View>
          } />
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
        >
          {this.state.markers.map(marker=>(
        <MapView.Marker coordinate={marker.coordinate} key={marker.id}>
          <View style={{width:50,height:70,backgroundColor:'red',borderRadius:50,borderBottomLeftRadius: 90, borderBottomRightRadius:90, alignItems:'center',justifyContent:'flex-start'}}>
              <Image source={{uri: 'demoImg'}} style={{width: 40, height: 40,borderRadius:20}} />
          </View>
          </MapView.Marker>
))}
        </MapView>
        
      </View>
      <View style={ this.state.check ? {position: 'absolute',top: 0,bottom: 0,left: 0, right: 0, height: 30,} : {position: 'absolute', top: 0, bottom: 0,left: 0,right: 0}}>
          <Animated.View style={{
            backgroundColor: 'black',
            opacity: this._deltaY.interpolate({
              inputRange: [0, Screen.height-100],
              outputRange: [0.5, 0],
              extrapolateRight: 'clamp'
            })
          }} />
          <Interactable.View
            verticalOnly={true}
            snapPoints={[{y: 40},{y: Screen.height-300}, {y: Screen.height-100}]}
            boundaries={{top: -300}}
            initialPosition={{y: Screen.height-100}}
            animatedValueY={this._deltaY}
            onSnap={(event)=> this.onSnap(event)}
          //onDrag={()=> alert("OnDrag")}
          >
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderData.bind(this)}
                />
            </View>
          </Interactable.View>
        </View>
    </View>
    );
  }
}

LocateMap.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Screen.height - 50,
    width: Screen.width ,
    marginTop: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
  },
  panel: {
    height: Screen.height + 300,
    padding: 20,
    backgroundColor: '#f7f5eee8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  photo: {
    width: Screen.width-40,
    height: 225,
    marginTop: 30
  },
});

module.exports = LocateMap;