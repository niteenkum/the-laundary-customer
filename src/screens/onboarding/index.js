import React, { Component } from 'react'
import { StyleSheet, Text, View, Image,Dimensions } from 'react-native'
import Swiper from '../../components/Swiper'
import Background from '../../components/background';
import NextBtn from '../../components/roundBtn/nextBtn';
import TextBox from '../../components/TextBox';
import { colors } from '../../res/appStyles';
import {setAsyncStorage} from '../../utils/asyncStorage'
import { STORAGES } from '../../res/ConstVariable';
import SplashScreen from 'react-native-splash-screen';
import RoundBtn from '../../components/roundBtn';
import AuthBackground from '../../components/background/Authbackground';
import OnBordingIcon from '../../res/svgs/OnBording';
const WinWidth=Dimensions.get('window').width/1.5
const onboardingData = [
	{
		title: 'Book your retreat',
        description: "Choose the place and time according to your needs. The Laundry Machine is your cleaning butler.",
        image: 'FIRST'
	},
	{
		title: 'Professional washing',
        description: "The Laundry Machine washes your clothes using ad hoc washing methods. Hand ironing 'as it once was'",
        image: 'SECONT'
	},
	{
		title: 'Fill the basket',
        description: 'Choose the service and select the garments.',
        image: 'THIRD'
	},
 
]

export default class Onboarding extends Component {
	state = {
		activeIndex: 0
	}
	componentDidMount(){
		SplashScreen.hide()
		setAsyncStorage(STORAGES.FIRST_TIME,"UserLoginFirstTime")
	}
	render() {
		return (
			<AuthBackground>
				<View style={{flex: 1}}>
					<View style={styles.wrapper}>
						<Swiper 
							loop={false}
							autoplay={true} 
							index={this.state.activeIndex}
							activeDotColor={colors.tint}
							activeDotStyle={{marginRight: 10,}}
							dotStyle={{marginRight: 10}}
						>
							{onboardingData.map((item, index) => (
								<View key={index+1} style={styles.slide}>
									<View style={styles.image}><OnBordingIcon type={item.image}/></View>
									<TextBox type="title2" style={styles.title}>{item.title}</TextBox>
									<TextBox type="caption3" style={styles.description}>{item.description}</TextBox>
								</View>
							))}
						</Swiper>
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<RoundBtn
             onPress={() => this.props.navigation.navigate('Auth')} 
              style={{width:'50%' ,   alignSelf: 'center',}}
              title="Skip"
           
              />
						{/* <R 
							onPress={}
						/> */}
					</View>
				</View>
			</AuthBackground>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 5
	},
	
	slide: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	image: {
		height: WinWidth,
		width: WinWidth,
	 
		marginBottom: 25,
	},

	title: {
		marginBottom: 10,
		color:colors.tint
	},

	description: {
		paddingHorizontal: 40,
		textAlign: 'center',
		lineHeight: 22,
		color:colors.tint
	}
})