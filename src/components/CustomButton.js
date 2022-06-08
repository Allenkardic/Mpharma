import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Touchable,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

//import components
import CustomText from './CustomText';

import {
  BORDERRADIUS,
  COLORS,
  HP,
  WP,
  BOXWITHSMALLSHADOW,
  BOXWITHSHADOW,
} from '../utils/themes';

function CustomButton({
  btnBackgroundColor = COLORS.primary,
  btnColor = COLORS.tertiary,
  curved = false,
  onPress,
  title,
  disabled = false,
}) {
  return (
    <TouchableHighlight
      onPress={disabled ? null : onPress}
      style={{
        ...styles.container,
        ...BOXWITHSMALLSHADOW,
        height: Platform.OS === 'android' ? HP('6%') : HP('5.5%'),
        borderRadius: curved ? BORDERRADIUS.xlarge : BORDERRADIUS.small,
        backgroundColor: btnBackgroundColor,
        borderColor: btnBackgroundColor,
        borderWidth: 1.5,
        borderStyle: 'solid',
      }}
      underlayColor={COLORS.primary}>
      <View>
        <CustomText large color={btnColor} bold>
          {title}
        </CustomText>
      </View>
    </TouchableHighlight>
  );
}

CustomButton.propTypes = {
  btnBackgroundColor: PropTypes.string,
  btnColor: PropTypes.string,
  nextIconColor: PropTypes.string,
  curved: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
  nextIcon: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextIconStyle: {
    position: 'absolute',

    top: 0,
    bottom: 0,
    right: '-15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(CustomButton);
