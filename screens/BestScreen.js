import React, { Component }  from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image, CameraRoll,Button} from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Constants, takeSnapshotAsync , takePictureAsync} from 'expo';
class BestScreen extends Component {

  state = {
  hasCameraPermission: null,
  type: Camera.Constants.Type.back,
};

async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
}
_saveToCameraRollAsync = async () => {
  if (this.camera) {
   let photo = await this.camera.takePictureAsync()
   console.log('photo');
   let result = photo.uri;
    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    console.log('saveResult');
    this.props.navigation.navigate('Gallery');
  }
}
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
          type={this.state.type}>
          <View
            style={{flex:1,
              backgroundColor: 'transparent',
              flexDirection: 'row',justifyContent:'center',alignItems:'flex-end',marginBottomn:20
            }}
            collapsable={false}>
            <TouchableOpacity
              >
              <MaterialCommunityIcons name="circle-outline"
                  style={{ color: 'white', fontSize: 100 }}
                  onPress={this._saveToCameraRollAsync}>
              </MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
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
