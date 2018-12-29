import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
      return (
    <View style={styles.container}>
      <View style ={ { backgroundColor:'black',
                        padding:0,
                        borderRadius:10,
                        shadowRadius:20,
                        shadowOpacity:0.5
                      }}>
        <Button
        onPress = {() => this.props.navigation.navigate('Camera')}
        title = "Camera"
        color='white'
      />
      </View>
    </View>
  );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:50,
        flexDirection:'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    cameradesign: {
      flex:1,
      alignItems:'center',
      justifyContent:'flex-end'
    }
});
