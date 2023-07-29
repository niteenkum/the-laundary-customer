import React, { Component ,Fragment} from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { dimensions, colors } from '../../res/appStyles';
import NetAlert from '../../utils/internet';

export default class Background extends Component {
              
  render() { //'dark-content':
    let { 
      image,
       bodyStyle,
        children,
        headerStyle ={},
        footerStyle={},
        statsbarColor=colors.tint,
        statsbar='light-content'
      } = this.props;
   // image = image ? image : require('../../../assets/images/background.png');
 
    return (
      <Fragment>
        <SafeAreaView  style={[styles.headerStyle,headerStyle]}  >
          <StatusBar backgroundColor={statsbarColor} barStyle={statsbar}/>
          </SafeAreaView>
           <SafeAreaView style={[styles.footerStyle, footerStyle]} >
           <View style={[styles.bodyStyle,bodyStyle]}>
            {children}
            </View>
            <NetAlert/>
         </SafeAreaView>
          </Fragment>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     flex:1
        // paddingTop: dimensions.statusBar,
    },
    headerStyle:{
      backgroundColor:colors.tint
    },
    bodyStyle:{flex:1,backgroundColor:colors.white},
   footerStyle:{
     flex:1,
      backgroundColor:colors.white
    }
})