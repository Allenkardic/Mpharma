import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';

import {COLORS, HP, WP, BOXWITHBIGSHADOW} from '../utils/themes';

function PlusButton({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
      }}>
      <Icon name={'plus'} size={HP('4%')} color={COLORS.white} />
    </TouchableOpacity>
  );
}

PlusButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    ...BOXWITHBIGSHADOW,
    position: 'absolute',
    bottom: HP('6%'),
    right: WP('7%'),
    backgroundColor: COLORS.success,
    width: HP('7%'),
    height: HP('7%'),
    borderRadius: HP('7%') / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});

export default React.memo(PlusButton);
