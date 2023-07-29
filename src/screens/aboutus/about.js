import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { colors } from '../../res/appStyles';
import TextBox from '../../components/TextBox';

const website = 'www.deorwine.com';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openWebsite = () => {
    Linking.canOpenURL('https://www.deorwine.com').then(supported => {
      if (supported) {
        Linking.openURL('https://www.deorwine.com');
      } else {
       
      }
    });
  };

  render() {
    return (
      <View>
        <View style={{backgroundColor: colors.borderGrey, height: 200, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../assets/images/pin.png')} style={{width: 30, height: 30, resizeMode: 'contain'}}/>
        </View>
        <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <TextBox style={{width: '25%', fontWeight: '500',}}>Mon to Fri</TextBox>
                <TextBox> : 08:00 AM - 08:00 PM</TextBox>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10,}}>
                <TextBox style={{width: '25%', fontWeight: '500',}}>Saturday</TextBox>
                <TextBox> : 08:00 AM - 08:00 PM</TextBox>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <TextBox style={{width: '25%', fontWeight: '500',}}>Sunday</TextBox>
                <TextBox style={{textAlign: 'left'}}> : Closed</TextBox>
            </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10, paddingHorizontal: 15}}>
            <TextBox style={{fontWeight: '500',}}>
                Description 
                <TextBox style={{textAlign: 'justify', fontWeight: 'normal'}}> : Lorem ipsum dolor sit amet, adipiscing elit, sed do ei usmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation laboris nisi ut aliquip.
                </TextBox>
            </TextBox>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10, paddingHorizontal: 15}}>
            <TextBox style={{fontWeight: '500',}}>Visit our website : </TextBox>
            <TextBox onPress={this.openWebsite} style={{color: colors.link}}>{website}</TextBox>
        </View>

      </View>
    );
  }
}
