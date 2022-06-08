import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

export const SIZE = {
  screenWidth,
  screenHeight,
};

export const COLORS = {
  //base color
  primary: '#0c1728',
  secondary: '#333d49',
  tertiary: '#72bbe2',
  success: '#219653',
  error: '#fe3b30',
  yellow: '#fff9da',
  descText: '#121515',
  blue: '#032e90',

  //neutral
  black: '#060606',
  white: '#ffffff',

  //color variations
  darkGray: '#5E5F62',
  midGrey: '#6A6969',
};

export const HP = hp;
export const WP = wp;

export const SIZES = {
  //font sizes
  mini: 8,
  base: 10,
  small: 12,
  normal: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
  xxxlarge: 28,

  //dimensions
  screenWidth,
  screenHeight,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
};

export const FONTS = {
  mini: {fontSize: SIZES.mini, letterSpacing: 0},
  base: {fontSize: SIZES.base, letterSpacing: 0},
  small: {fontSize: SIZES.small, letterSpacing: 0},
  normal: {fontSize: SIZES.normal, letterSpacing: 0},
  medium: {fontSize: SIZES.medium, letterSpacing: 0},
  large: {fontSize: SIZES.large, letterSpacing: 0},
  xlarge: {fontSize: SIZES.xlarge, letterSpacing: 0},
  xxlarge: {fontSize: SIZES.xxlarge, letterSpacing: 0},
  xxxlarge: {fontSize: SIZES.xxxlarge, letterSpacing: 0},
};

const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

const scaledSize = size => Math.ceil(size * scale);

// guideline height for standard 5" device screen is 680
function RFValue(fontSize, standardScreenHeight = 680) {
  const {height, width} = Dimensions.get('window');
  const standardLength = width > height ? width : height;
  const offset =
    width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

  const deviceHeight =
    Platform.OS === 'android' ? standardLength - offset : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

export const FONTSIZE = {
  mini: RFValue(SIZES.mini),
  base: RFValue(SIZES.base),
  small: RFValue(SIZES.small),
  normal: RFValue(SIZES.normal),
  medium: RFValue(SIZES.medium),
  large: RFValue(SIZES.large),
  xlarge: RFValue(SIZES.xlarge),
  xxlarge: RFValue(SIZES.xxlarge),
  xxxlarge: RFValue(SIZES.xxxlarge),
};

export const SPACING = {
  xxmini: scaledSize(2),
  mini: scaledSize(4),
  xxxsmall: scaledSize(6),
  xxsmall: scaledSize(12),
  xsmall: scaledSize(24),
  small: scaledSize(32),
  medium: scaledSize(48),
  large: scaledSize(64),
  xlarge: scaledSize(96),
  xxlarge: scaledSize(128),
  xxxlarge: scaledSize(170),
};

export const BOXWITHSMALLSHADOW = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
};

export const BOXWITHSHADOW = {
  borderWidth: 0.3,
  borderStyle: 'solid',
  borderColor: '#fafafa',
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 1,
};

export const BOXWITHBIGSHADOW = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 5},
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 5,
};

export const BORDERRADIUS = {
  small: scaledSize(5),
  medium: scaledSize(10),
  large: scaledSize(15),
  xlarge: scaledSize(20),
  round: scaledSize(50),
};

export const FONTWEIGHT = {
  xbold: '700',
  bold: '600',
  regular: '400',
  light: '300',
};
export const CURRENCIES = {
  naira: '₦',
};

export const IMAGES = {
  //   payment_1: require('../../assets/images/payment_1.png'),
};

export default {
  COLORS,
  SIZES,
  FONTS,
  SPACING,
  BOXWITHSMALLSHADOW,
  BOXWITHSHADOW,
  BOXWITHBIGSHADOW,
  IMAGES,
  BORDERRADIUS,
  FONTSIZE,
  HP,
  WP,
  CURRENCIES,
  SIZE,
};
