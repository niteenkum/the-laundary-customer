import React from 'react';
import {View, Image} from 'react-native';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {scales, colors, spacing} from '../../../res/appStyles';
import Hilightview from '../../../components/hilighteView';

export const ServiceCard = props => {
  return (
    <Card onPress={props.onPress} type="list" style={props.cardstyle}>
      {props.index === 2 ? <Hilightview /> : null}
      {props.svg ? (
        <View
          style={{
            height: scales(60),
            width: scales(60),
          }}>
          {props.svg}
        </View>
      ) : (
        <Image
          source={props.image}
          style={{
            height: scales(50),
            width: scales(50),
            resizeMode: 'contain',
          }}
        />
      )}
      <View>
        <TextBox style={props.style} type="caption" numberOfLines={2}>
          {props.title}
        </TextBox>
      </View>
    </Card>
  );
};
