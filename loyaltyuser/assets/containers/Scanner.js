import React from 'react';
import { Dimensions, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import FooterBar from './FooterBar';

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff'}}>
        <FooterBar/>
      </View>
      );
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff'}}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{                    
                height: Dimensions.get('window').height/1.6,
                width: Dimensions.get('window').width,
                marginBottom: '20%' 
            }}
          />
          <FooterBar/>
        </View>
      );
    }
  }

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
        Alert.alert('Codigo QR', result.data, [    
            {text: 'Cancel', onPress: () =>  this.setState({ lastScannedUrl: null}), style: 'cancel'},
            {text: 'OK', onPress: () => this.setState({ lastScannedUrl: null})}
        ]);
        this.setState({ lastScannedUrl: result.data });
      }
        
  }
}