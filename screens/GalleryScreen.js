import React, { Component, PropTypes } from 'react'
import {
  CameraRoll,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

class CameraRollView extends Component {

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
      images: [],
      selected: '',
      fetchParams: { first: 5 },
      groupTypes: 'SavedPhotos',
    }
    this._selectImage = this._selectImage.bind(this)
  }

  componentDidMount() {
    // get photos from camera roll
    CameraRoll.getPhotos({first: 5}).then(
  (data) =>{
    const assets = data.edges
    const images = assets.map((asset) => asset.node.image);
        this.setState({
          isCameraLoaded: true,
          images: images
        })
  },
  (error) => {
     console.warn(error);
  }
);
  }

  _selectImage(uri) {
    this.setState({
      selected: uri,
    });
    console.log('Selected image: ', uri);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={styles.container}>
            <View style={styles.imageGrid}>
            { this.state.images.map(image => {
              return (
               <TouchableHighlight onPress={() => this._selectImage(image.uri)}>
                 <Image style={styles.image} source={{ uri: image.uri }} />
               </TouchableHighlight>
             );
            })}
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  image: {
      width: 100,
      height: 100,
      margin: 10,
  },
});

export default CameraRollView
