import React from 'react';
import {
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Card from '../../components/card';
import {spacing, colors} from '../../res/appStyles';
import TextBox from '../../components/TextBox';
import {ScrollView} from 'react-native-gesture-handler';
import Background from '../../components/background';
const CREEN_WIDTH = Dimensions.get('window').width;
const TopServicesData = [
  {
    id: 1,
    name: `Garments`,
    service: `For Normal Household Wear`,
    img: require('../../../assets/images/dress.png'),
  },
  {
    id: 2,
    name: `Washing`,
    service: `Machine wash & Turmble Dry`,
    img: require('../../../assets/images/washing-machine.png'),
  },
  {
    id: 3,
    name: `Folding`,
    service: `Tumble Dried Garments Folded to Perfection`,
    img: require('../../../assets/images/towels.png'),
  },
];
const TopServicesData2 = [
  {
    id: 1,
    name: `Packaging`,
    service: `All Garments stacked together and packaged`,
    img: require('../../../assets/images/package.png'),
  },
  {
    id: 2,
    name: `Turnaround`,
    service: `Takes 48 Hours from Pickup to Delivery`,
    img: require('../../../assets/images/time.png'),
  },
];
const Washfold = item => {
  const data = {
    type: 'WASH & FOLD',
  };
  const Box = items => {
    console.log(items, '>>>>>>>>>>>>>>>>>>>>>>');
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: colors.tint,
          borderRadius: 12,
          height: 105,
          width:CREEN_WIDTH/3.6,
          marginHorizontal: 10,
          top: 10,

          alignSelf: 'center',
          backgroundColor: colors.white,
        }}>
      
        <View
          style={{
            position: 'absolute',
            borderWidth: 2,
            marginHorizontal: 10,
            top: -20,
            borderColor: colors.tint,
            borderRadius: 10,
            height: 40,
            width: 40,
            backgroundColor: colors.tint,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 24, width: 24, tintColor: colors.white}}
            source={items.item.img}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            marginLeft: spacing(3),
            marginHorizontal: 8,
            paddingVertical: spacing(7),
            paddingHorizontal: spacing(4),
            top: 20,
          }}>
          <TextBox
            numberOfLines={1}
            style={{
              color: colors.listTitle,
            }}
            type="heading3">
            {items.item.name}
          </TextBox>
          <TextBox
            numberOfLines={4}
            style={{
              color: colors.listTitle,
              width: '99%',
              top: 4,
            }}
            type="caption0">
            {items.item.service}
          </TextBox>
        </View>
      </View>
      // </Card>
    );
  };
  return (
    <>
      <Background>
        <Image
          style={{
            height: '35%',
            width: '100%',
            resizeMode: 'cover',
       
            bottom: 10,
          }}
          source={require('../../../assets/images/washing.png')}
        />
        <ScrollView>
          <View style={{height: 150, marginTop: 10}}>
            <FlatList
              data={TopServicesData}
              //  ContentContainerStyle={styles.ContentContainerStyles}
              horizontal
              keyExtractor={item => item.id}
              renderItem={Box}
            />
          </View>
          <View style={{height: 150, marginTop: 5}}>
            <FlatList
              data={TopServicesData2}
              //  ContentContainerStyle={styles.ContentContainerStyles}
              horizontal
              keyExtractor={item => item.id}
              renderItem={Box}
            />
          </View>
          {/* {box()}
      </View>
       <View style= {{alignItems: 'center', flexDirection:"row"}}>
        {box()} */}

          <Card>
          <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  height: 8,
                  width: 8,
                  resizeMode: 'cover',
                  top: 5,
                  marginHorizontal: 2,
                   tintColor:colors.tint
                }}
                source={require('../../../assets/images/star_fill.png')}
              />
              <TextBox
                numberOfLines={1}
                style={{
                  color: colors.tint,
                }}
                type="heading3">
                POINTS TO REMEMBER
              </TextBox>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.dot}></View>
              <TextBox type="caption0">
                Most suitable for night wears, t-shirt and jeans, bedsheets &
                pillow covers, towels
              </TextBox>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.dot}></View>
              <TextBox type="caption0">
                Garments susceptible of bleeding color shall not be given
              </TextBox>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.dot}></View>
              <TextBox type="caption0">
                Tough stains can’t be cleaned in this process
              </TextBox>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.dot}></View>
              <TextBox type="caption0">
                Garments not suited for this process will be identified post
                pickup & communicated
              </TextBox>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.dot}></View>
              <TextBox type="caption0">
                Turnaround time may increase on unforeseen circumstances such as
                machines breakdown, power cut, logistics problems
              </TextBox>
            </View>
          </Card>
        </ScrollView>
      </Background>
    </>
  );
};

export default Washfold;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    height: 115,
    with: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 15,
  },
  jobsText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '400',
  },

  imageStyle: {height: 18, width: 18, tintColor: colors.white},
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: colors.grey,
    height: 45,
    borderRadius: 10,
    position: 'absolute',
    top: '80%',
    width: '87%',
    alignSelf: 'center',
  },
  serchIcon: {
    height: 20,
    width: 20,
    tintColor: colors.lightBlack,
    marginHorizontal: 10,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: colors.lightBlack,
    top: 5,
    marginHorizontal: 5,
  },
  searchcontaner: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 1,
    paddingVertical: 8,
    marginVertical: 16,
    top: '5%',
    // bottom:"90%",
  },
  padding: {paddingHorizontal: 15},
  ContentContainerStyles: {
    backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  textBlue: {fontSize: 13, fontWeight: '500', color: 'blue'},
  recentText: {fontSize: 13, fontWeight: '400'},
  verticalPadding: {
    padding: 10,
    paddingVertical: 15,
  },
  janeText: {color: colors.white, fontWeight: '300', fontSize: 13},
});
