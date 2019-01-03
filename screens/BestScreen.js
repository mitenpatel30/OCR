import React, { Component }  from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image, CameraRoll,Button, Modal} from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Constants, takeSnapshotAsync , takePictureAsync, ImageManipulator} from 'expo';
const flashModeOrder = {

  on: 'off',
};
class BestScreen extends Component {

  state = {
  hasCameraPermission: null,
  type: Camera.Constants.Type.back,
    flashMode: 'on',
};
async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
}
_saveToCameraRollAsync = async () => {
  if (this.camera) {
   let photo = await this.camera.takePictureAsync();
   console.log('photo');
photo = await ImageManipulator.manipulateAsync(photo.uri,
      [{ rotate: -360}
]);
    let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
    console.log('saveResult');
    this.setState(
        {
          image: photo.uri
        },
        () => {
          console.log(photo.uri);
          this.processImage(photo.uri, {
            height: photo.height,
            width: photo.width
          });
        }
      ),
    this.props.navigation.navigate('Gallery');
  }
}
toggleFlash = () => this.setState({ flashMode: flashModeOrder[this.state.flashmode] });
render() {
  const { hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={ (ref) => {this.camera = ref}}
          style={{ flex: 1 }}
          type={this.state.type}
          >
          <View
            style={{flex:1,
              backgroundColor: 'transparent',
              flexDirection: 'row',justifyContent:'center',alignItems:'flex-end', marginBottom:20
            }}
            collapsable={false}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="circle-outline"
                  style={{ color: 'white', fontSize: 100 }}
                  onPress={this._saveToCameraRollAsync}>
              </MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
          <Ionicons name="ios-flash" style={{ fontSize:50 ,color: 'white', fontWeight: 'bold',position: "absolute", bottom: 700, right: 330}}
          onPress={this.toggleFlash}
          />
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }
}
}
export default BestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
