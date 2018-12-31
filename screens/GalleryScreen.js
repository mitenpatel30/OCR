import React, { Component, PropTypes } from 'react'
import {
  CameraRoll,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Modal
} from 'react-native';

class GalleryScreen extends Component {
  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
      images: [],
      selected: '',
      fetchParams: { first: 21 },
      groupTypes: 'SavedPhotos',
    }
    this._selectImage = this._selectImage.bind(this)
  }
  componentDidMount() {
    CameraRoll.getPhotos({first: 21}).then(
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
      width: 120,
      height: 120,
      margin: 1,
  },
});

export default GalleryScreen
