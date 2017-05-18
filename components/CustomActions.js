import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
var imagePicker = require('react-native-imagepicker');

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false,

    };
    this.onActionsPress = this.onActionsPress.bind(this);
    this.selectImages = this.selectImages.bind(this);
  }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  setModalVisible(visible = false) {
    this.setState({modalVisible: visible});
  }

  onActionsPress() {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.selectPhotoTapped();
          //break;
        case 1:
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.props.onSend({
                location: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
          break;
        default:
      }
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
        console.log('imageUri', imageUri, context, this);
       
          let images={ 
            image: imageUri
          };
          console.log("images", images);
          context.props.onSend(images);
        context.setImages(imageUri);
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

  selectImages(images) {
    this.setImages(images);
  }

  renderNavBar() {
    return (
      <NavBar style={{
        statusBar: {
          backgroundColor: '#FFF',
        },
        navBar: {
          backgroundColor: '#FFF',
        },
      }}>
        <NavButton onPress={() => {
          this.setModalVisible(false);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>
        <NavTitle style={{
          color: '#000',
        }}>
          {'Camera Roll'}
        </NavTitle>
        <NavButton onPress={() => {
          this.setModalVisible(false);

          const images = this.getImages().map((image) => {
            return {
              image: image.uri,
            };
          });
          this.props.onSend(images);
          this.setImages([]);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Send'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, this.props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={()=>this.selectPhotoTapped()}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: React.PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: React.PropTypes.func,
  options: React.PropTypes.object,
  icon: React.PropTypes.func,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  iconTextStyle: Text.propTypes.style,
};
