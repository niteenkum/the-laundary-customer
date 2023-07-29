import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {Environment} from '../../config/environment';
const {WEB_URL} = Environment;
const WAB = [
  '/storage/pages/privacy-policy.html',
  '/storage/pages/privacy-policy.html',
  '/storage/pages/terms-and-conditions.html',
  '/storage/pages/licenses.html',
];

export default class WebPage extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    const headername =
      params && params.headerName ? params.headerName.name : 'WEBPAGE';
    return {
      headerTitle: headername,
      headerRight: <View />,
    };
  };
  constructor(props) {
    super(props);
    const headerName = props.navigation.getParam('headerName', {});
    this.state = {
      headerName,
      loader: false,
    };
  }
  onError = () => {
    console.log('erroe');
    this.setState({loader: false});
  };
  onLoadEnd = () => {
    console.log('end');
    this.setState({loader: false});
  };
  onLoadStart = () => {
    console.log('start');
    this.setState({loader: true});
  };
  render() {
    const {headerName = {}} = this.state;
    const WebUrl = WEB_URL + WAB[headerName.id ? headerName.id : 0];
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: WebUrl}}
          onError={this.onError}
          onLoadEnd={this.onLoadEnd}
          onLoadStart={this.onLoadStart}
          renderLoading={{startInLoadingState: true}}
          style={{flex: 1, marginLeft: 10, marginRight: 10}}
        />
        {this.state.loader ? (
          <Text style={{position: 'absolute', top: 20, left: '40%'}}>
            Loading...
          </Text>
        ) : null}
      </SafeAreaView>
    );
  }
}
