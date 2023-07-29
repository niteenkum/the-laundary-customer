import {Dimensions, Platform, StatusBar, PixelRatio} from 'react-native';
import {ifIphoneX, getStatusBarHeight} from '../utils/isIphoneX';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const colors = {
  tint: '#074279',
  primary: '#074279',
  primary2: '#0080ff',
  orange: '#ff2600',
  white: '#fff',
  grey: '#464646',
  darkGrey: '#2c2c2c',
  lightGrey: '#a2a2a2',
  lightGrey2: '#a8a8ab',
  lightBlack: '#292929',
  transBlack: '#292929AA',
  lightBlue: '#d9f7ff',
  lightYellow: '#fffee6',
  lightPurple: '#feeaff',
  menuBg: '#2e2e2e',
  listTitle: '#3f3f3f',
  stepsTxt: '#334d5d',
  bgGrey: '#f2f2f2',
  background: '#e1e1e1',
  borderGrey: '#cccccc',
  borderGrey2: '#d9d9d9',
  green: '#00a651',
  red: '#ff2600',
  lightGreen: '#2ac594',
  background2: '#f0f0f0',
  link: '#1812ff',
  lightOrangeBg: '#f9f9f9',
  progressBg: '#e3e3e3',
  progressFill: '#ffa800',
  addressInputBorder: '#999999',
  lightGreen1: "#64aa7c",
  lightorange: "#e28743",
  skyblue:"#1e81b0"
};

const widthPercentageToDP = (
  iphoneWidthPercent,
  androidWidthPercent = iphoneWidthPercent,
) => {
  const elemWidth =
    typeof iphoneWidthPercent === 'number'
      ? isIos
        ? iphoneWidthPercent
        : androidWidthPercent
      : parseFloat(isIos ? iphoneWidthPercent : androidWidthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const HeightPercentageToDP = (
  iphoneHeightPercent,
  androidHeightPercent = iphoneHeightPercent,
) => {
  const elemHeight =
    typeof iphoneHeightPercent === 'number'
      ? isIos
        ? iphoneHeightPercent
        : androidHeightPercent
      : parseFloat(isIos ? iphoneHeightPercent : androidHeightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

export const deviceDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  WPTDP: widthPercentageToDP,
  HPTDP: HeightPercentageToDP,
};

export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return isIos
    ? dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 896 ||
        dimen.width === 896
    : dimen.height > 736;
};

export const isIphone6 = () => {
  const dimen = Dimensions.get('window');
  return dimen.height > 600 && dimen.height < 750;
};

export const fonts = {
  reguler: 'OpenSans-Regular',
  bold: 'OpenSans-Bold',
  semibold: 'OpenSans-SemiBold',
};

export const heiWidScale = 0.125;
export const dimensions = {
  statusBar: getStatusBar(true),
  topExtraSpace: 6,
  topSpace: this.statusBar + 6,
  roundBtnHeight:
    Math.min(deviceDimensions.height, deviceDimensions.width) * 0.2,
  bottomButtonHeight: deviceDimensions.HPTDP(heiWidScale * 60),
  numKeyboardHeight: deviceDimensions.height * 0.67,
  iphoneXBottomSpace,
  tabBarHeight: deviceDimensions.HPTDP(isIphoneX() ? '7.5%' : '10%', '10%'),
  safeHeight:
    deviceDimensions.height -
    getStatusBar(true) -
    (isIphoneX() ? iphoneXBottomSpace : 0),
};

export const scales = (size, type = 'height') => {
  if (type == 'height') {
    return deviceDimensions.HPTDP(heiWidScale * size);
  }
  return deviceDimensions.WPTDP(heiWidScale * size);
};

const iphoneXBottomSpace = scales(35);

function getStatusBar() {
  return !isIos ? StatusBar.currentHeight : getStatusBarHeight();
}
export const fontScale = 0.123;

export const fontSize = size => {
  return deviceDimensions.HPTDP(fontScale * size);
};
export const marginPaddingScale = 0.125;
export const svgWidthScale = 0.122;
export const svgHeightScale = 0.126;

export const spacing = size => {
  return deviceDimensions.HPTDP(marginPaddingScale * size);
};
export const fontSizes = {
  FONT_8: 8,
  FONT_10: 10,
  FONT_11: 11,
  FONT_12: 12,
  FONT_13: 13,
  FONT_14: 14,
  FONT_15: 15,
  FONT_16: 16,
  FONT_17: 17,
  FONT_18: 18,
  FONT_20: 20,
  FONT_22: 22,
  FONT_32: 32,
  FONT_50: 50,
};
