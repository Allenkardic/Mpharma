import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';

// import components

import {COLORS, SPACING, HP, WP} from '../utils/themes';
import CustomText from './CustomText';

function BottomSheet({
  refRBSheet,
  title,
  children,
  height = HP('40%'),
  closeButton,
  header = true,
  closeOnPressMask = true,
  closeOnDragDown = true,
}) {
  return (
    <View
      style={{
        ...styles.container,
      }}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={closeOnDragDown}
        closeOnPressMask={closeOnPressMask}
        height={height}
        customStyles={{
          container: {
            opacity: 1,
            borderTopLeftRadius: HP('5%'),
            borderTopRightRadius: HP('5%'),
            backgroundColor: COLORS.white,
          },
          draggableIcon: {
            opacity: 1,
            width: '10%',
            backgroundColor: COLORS.midGrey,
            zIndex: 3,
          },
        }}
        dragFromTopOnly={true}>
        <View style={{marginTop: !closeOnDragDown ? SPACING.small : 0}}>
          {closeButton && (
            <Icon
              onPress={() => refRBSheet.current.close()}
              name={'x'}
              color={COLORS.midGrey}
              size={HP('2.5%')}
              style={{alignSelf: 'flex-start', marginLeft: SPACING.xsmall}}
            />
          )}
        </View>
        {header && (
          <View style={styles.titleStyle}>
            <CustomText center semibold style={{color: COLORS.midGrey}}>
              {title}
            </CustomText>
          </View>
        )}
        <ScrollView>{children}</ScrollView>
      </RBSheet>
    </View>
  );
}

BottomSheet.propTypes = {
  refRBSheet: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.bool,
};
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

export default React.memo(BottomSheet);
