import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';
import {currencyFormat} from '../utils/constants';

// import components

import {
  COLORS,
  SPACING,
  HP,
  WP,
  BOXWITHSMALLSHADOW,
  BORDERRADIUS,
} from '../utils/themes';
import CustomText from './CustomText';

function ProductCard({onPressDelete, onPressEdit, title, oldPrice, newPrice}) {
  return (
    <View
      style={{
        ...BOXWITHSMALLSHADOW,
        backgroundColor: COLORS.secondary,
        paddingHorizontal: SPACING.xsmall,
        paddingVertical: SPACING.xxsmall,
        borderRadius: BORDERRADIUS.small,
        marginBottom: SPACING.xxsmall,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '70%'}}>
          <CustomText white>{title}</CustomText>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '30%',
            alignSelf: 'flex-end',
          }}>
          <CustomText semibold white xxlarge right>
            {currencyFormat(newPrice)}
          </CustomText>
          <CustomText
            semibold
            color={COLORS.error}
            large
            style={{
              //   marginBottom: SPACING.xxxsmall,
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}
            right>
            {currencyFormat(oldPrice)}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          marginTop: SPACING.xsmall,
        }}>
        <Icon
          onPress={onPressEdit}
          name={'edit'}
          color={COLORS.tertiary}
          size={HP('3%')}
          style={{marginRight: SPACING.xxsmall}}
        />
        <Icon
          onPress={onPressDelete}
          name={'trash-2'}
          color={COLORS.error}
          size={HP('3%')}
        />
      </View>
    </View>
  );
}

// ProductCard.propTypes = {
//   refRBSheet: PropTypes.object.isRequired,
//   title: PropTypes.string.isRequired,
//   header: PropTypes.bool,
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default React.memo(ProductCard);
