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
import { ScrollView } from 'react-native-gesture-handler';
import Background from '../../components/background';
const TopServicesData = [
  {
    id: 1,
    name: `Garments`,
    service: `For Office Wear & Delicate Clothes`,
     img: require('../../../assets/images/dress.png')
  },
  {
    id: 2,
    name: `Washing`,
    service: `Garments Machine/Hand Washed & Dried as per Fabric`,
     img: require('../../../assets/images/washing-machine.png')
  },
  {
    id: 3,
    name: `Cuff & Collar`,
    service: `Guaranteed Scrubbing of Cuff & Collar`,
     img: require('../../../assets/images/towels.png')
    },
  
];
const TopServicesData2 = [

   {
    id: 1,
    name: `Steam Ironing`,
    service: `Garments Steam Ironed with Shirt card of Butter Paper Inserts`,
     img: require('../../../assets/images/iron.png')
  },
  {
    id: 2,
    name: `Packaging`,
    service: `Each garments packed separately and easy to carry`,
    img: require('../../../assets/images/package.png')
  },
  {
    id: 3,
    name: `Turnaround`,
    service: `Takes 72 Hours from Pickup to Delivery`,
      img: require('../../../assets/images/time.png')
  },
];
const CREEN_WIDTH = Dimensions.get('window').width;
const PremiumLaundary = item => {
  const data = {
    type: 'PREMIUM LAUNDRY',
  };
  const Box = items => {
    console.log(items, '>>>>>>>>>>>>>>>>>>>>>>');
    return (
      <View
        style={{
         borderWidth: 2,
          borderColor: colors.lightorange,
          borderRadius: 12,
          height: 105,
          width: CREEN_WIDTH /3.6,
          marginHorizontal: 10,
          top:10,
         alignSelf:'center',
          backgroundColor: colors.white,
        }}>
        {/* <View
            style={{justifyContent:"center",alignItems:'center'
            
            }}>
            <Image
              style={{height: 40, width: 40,}}
              source={require('../../../assets/images/dry_clean.png')}
            />
             </View>  */}
        <View
          style={{
            position: 'absolute',
            borderWidth: 2,
            marginHorizontal: 15,
            top: -20,
            borderColor: colors.lightorange,
            borderRadius: 10,
            height: 40,
            width: 40,
            backgroundColor: colors.lightorange,
            justifyContent:"center",alignItems:'center'
           
          }}>
           <Image
              style={{height: 24, width: 24,tintColor:colors.white}}
              source={items.item.img}
            />
        
          </View>
        <View
          style={{
            ustifyContent: 'space-between',
             marginLeft: spacing(3),
            marginHorizontal:8,
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
              top:4
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
        source={require('../../../assets/images/hanger_cloths.jpg')}
      />
      <ScrollView>
        <View style={{height:150,marginTop:10,}}>
          <FlatList
            data={TopServicesData}
        
            horizontal
            keyExtractor={item => item.id}
            renderItem={Box}
          />
          </View>
          <View style={{height:150,marginTop:10,}}>
          <FlatList
            data={TopServicesData2}
        
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
                   tintColor:colors.lightorange
                }}
                source={require('../../../assets/images/star_fill.png')}
              />
            <TextBox
              numberOfLines={1}
              style={{
                color: colors.lightorange,
              }}
              type="heading1">
              POINTS TO REMEMBER
            </TextBox>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.dot}></View>
            <TextBox type="caption0">
             Best for Branded, expensive, white garments
            </TextBox>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.dot}></View>
            <TextBox type="caption0">
              Steam Ironing as applicable
            </TextBox>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.dot}></View>
            <TextBox type="caption0">
           Guaranteed cuff & collar cleaning
            </TextBox>
          </View>
        
        </Card>
        </ScrollView>
        </Background>
    </>
  );
};

export default PremiumLaundary;
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
