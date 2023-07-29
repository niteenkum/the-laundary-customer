import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {MenuIcon} from '../components/icons/menuIcon';
import {SearchIcon} from '../components/icons/searchIcon';
import {colors} from '../res/appStyles';
import TextBox from './TextBox';
import {SvgIcon} from '../utils/Svgicons';
export const DrawerBtn = props => (
  <TouchableOpacity style={{padding: 5}} onPress={props.onPress}>
    {props.drawer ? (
      <MenuIcon />
    ) : (
      <SvgIcon style={{paddingLeft: 5}} type="BACK" color="#ffffff" />
    )}
  </TouchableOpacity>
);
export const SearchBar = props => (
  <TouchableOpacity onPress={props.onPress}>
    <SearchIcon />
  </TouchableOpacity>
);
export const HeaderBox = props => {
  const [sbar, setSBar] = useState(false);
  const {drawer = false} = props;
  return (
    <View style={{width: '100%'}}>
      {/* <StatusBar backgroundColor={colors.tint} barStyle="light-content" /> */}
      {sbar ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 60,

            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TextInput
            autoFocus={true}
            onChangeText={props.onSearchTextChange}
            placeholder="Search"
            style={{flex: 0.8}}
          />
          <Text
            onPress={() => {
              props.onStopSearch ? props.onStopSearch() : null;
              setSBar(!sbar);
            }}
            style={{fontSize: 20, padding: 5, color: '#ccc', padding: 5}}>
            X
          </Text>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 60,
            backgroundColor: colors.tint,
            alignItems: 'center',
          }}>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <DrawerBtn drawer={drawer} onPress={props.onPressLeft} />
          </View>
          <TextBox
            style={{flex: 4, textAlign: 'center', fontSize: 22, color: '#FFF'}}>
            {props.title}
          </TextBox>
          {props.onSearchTextChange ? (
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
              <SearchBar onPress={() => setSBar(!sbar)} />
            </View>
          ) : (
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
              {props.renderRigth ? props.renderRigth : null}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
