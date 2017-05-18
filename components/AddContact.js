import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ListView
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
var Contacts  = require('react-native-unified-contacts');

let search        = require('image!search-icon'),
	demoImg       = require('image!demoImg'),
	Dimensions    = require('Dimensions'),
    windowSize    = Dimensions.get('window'),
    Screen        = require('Dimensions').get('window');

class AddContact extends Component {
	constructor(props){
		super(props);
		
		//console.log('contactList ********* ',contactList)
		this.state={
			searchInput:'',
			isVisible:false,
			dataSource: new ListView.DataSource({
	          rowHasChanged: (row1, row2) => row1 !== row2,
	        }),
		}
	}

	componentWillMount() {
    	this.getContactList();
  	}

	getContactList(){
		let context = this;
		context.setState({
	      isVisible: true
	    });
		Contacts.getContacts( (error, contacts) =>  {
			context.setState({
		      isVisible: false
		    });
	  		if (error) {
		    	console.error(error);
		  	}
		  	else {
	     		context.setState({
            		dataSource: context.state.dataSource.cloneWithRows(contacts)
          		});
		  	}
		});
	}

	renderData(data){
	 	//console.log('data ****** ',data)
		return(
			<View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#E0E0E0',marginHorizontal:20}}>
				<View style={{flex:2,marginVertical:10}}>
					<View style={{flexDirection:'row'}}>
						<Image source={demoImg} style={{height:40,width:40,borderRadius:20}} />
						<Text style={{padding:12,fontWeight:'600',fontFamily:'din round pro'}}>{data.givenName}</Text>
					</View>
				</View>
				<View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
					<Text style={{fontWeight:'600',fontFamily:'din round pro'}}>Pending</Text>
				</View>
			</View>
		)
	}

  	render() {
    return (
      <View style={{flex: 1}}>
      	<Spinner visible={this.state.isVisible} />
      	<NavigationBar
      		title={<Text style={{fontWeight:'700',fontFamily:'din round pro',fontSize:16}}>ADD</Text>}
      		rightButton={<TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{justifyContent:'center',right:30}}><Text style={{fontWeight:'700',color:'#5a0fb4',fontFamily:'din round pro',fontSize:16}}>DONE</Text></TouchableOpacity>}
      		/>
  			<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#EEEEEE',marginHorizontal:20}}>
  				<Image source={search} style={{height:20,width:20}} resizeMode='contain'/>
  				<TextInput
	  				style={{height:40,width:(Screen.width/100)*83.5}} 
	  				onChangeText={(searchInput)=>{this.setState({searchInput})}}
	  				placeholder="Search for a friend"
	  				returnKeyType="search" />
			</View>
		<ListView
        	dataSource={this.state.dataSource}
        	renderRow={this.renderData.bind(this)}
      	/>
      </View>
    );

  }

}

module.exports = AddContact;
