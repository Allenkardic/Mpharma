import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
  StatusBar,
} from 'react-native';

import {COLORS, BORDERRADIUS, HP, SPACING} from '../utils/themes';
import numbro from 'numbro';

import DateIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';
import CustomText from './CustomText';

function CustomInput(props) {
  const {
    iconName,
    placeholder,
    label,
    value,
    onChangeText,
    backgroundColor,
    onFocus,
    style,
    secureTextEntry,
    onPressIcon,
    multiline,
    textArea,
    error,
    onBlur,
    keyboardType,
    onLabelInfoClick,
    inputRef,
    changeVisibility,
    width,
    textcolor,
    editable,
  } = props;
  return (
    <View style={styles.container}>
      {label && (
        <CustomText base style={styles.labelText}>
          {label}
        </CustomText>
      )}
      {iconName === 'NGN' ? (
        <View>
          <TextInput
            keyboardType="numeric"
            placeholderTextColor={COLORS.greyDark}
            style={[
              {
                ...styles.numberStyle,
                ...style,
                height: 40,
                borderColor: error ? COLORS.red : COLORS.grey,
                backgroundColor: backgroundColor,
              },
            ]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={text => onChangeText(text)}
            value={numbro(value)}
            autoCorrect={false}
            selectTextOnFocus={true}
            autoCompleteType="off"
            autoCapitalize="none"
            multiline={false}
            onFocus={onFocus}
            ref={inputRef}
            editable={editable}
            {...props}
          />
          {error && (
            <CustomText small error>
              {error}
            </CustomText>
          )}
        </View>
      ) : textArea ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor:
              error && error.length > 1 ? COLORS.error : COLORS.secondary,
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: COLORS.secondary,
            paddingHorizontal: SPACING.xxxsmall,
            borderRadius: BORDERRADIUS.small,
            ...style,
            ...style,
          }}>
          <TextInput
            keyboardType={keyboardType}
            placeholderTextColor={COLORS.greyDark}
            style={[
              {
                ...styles.numberStyle,
                ...style,
                // height: 70,
                // borderColor:
                //   error && error.length > 1 ? COLORS.red : COLORS.inputGrey,
                // backgroundColor: backgroundColor,
                // paddingHorizontal: SPACING.xxxsmall,
                // color: COLORS.black,
                height: '100%',
                width: '100%',
                lineHeight: Platform.OS === 'android' ? 20 : 0,
                fontFamily: 'Montserrat-Medium',
                color: COLORS.white,
              },
            ]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={text => onChangeText(text)}
            value={value}
            autoCorrect={false}
            selectTextOnFocus={true}
            autoCompleteType="off"
            autoCapitalize="none"
            numberOfLines={textArea && 6}
            multiline={true}
            onFocus={onFocus}
            ref={inputRef}
            editable={editable}
            {...props}
          />
          {error && error.length > 1 && (
            <CustomText small error>
              {error}
            </CustomText>
          )}
        </View>
      ) : (
        <View>
          <View
            style={{
              height: Platform.OS == 'android' ? HP('5.5%') : HP('5%'),
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor:
                error && error.length > 1 ? COLORS.error : COLORS.lightWhite,
              borderWidth: 1,
              borderStyle: 'solid',
              backgroundColor: COLORS.smokeWhite,
              paddingHorizontal: SPACING.xxxsmall,
              borderRadius: BORDERRADIUS.small,
              ...style,
            }}>
            <TextInput
              keyboardType={keyboardType}
              placeholderTextColor={COLORS.placeholderGrey}
              style={[
                {
                  height: '100%',
                  width: '100%',
                  lineHeight: Platform.OS === 'android' ? 20 : 0,
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.descText,
                },
              ]}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              value={value}
              autoCorrect={false}
              selectTextOnFocus={true}
              autoCompleteType="off"
              autoCapitalize="none"
              multiline={false}
              onFocus={onFocus}
              ref={inputRef}
              editable={editable}
              {...props}
            />
            {/* {iconName == 'password' && (
              <View>
                {secureTextEntry ? (
                  <Icon
                    onPress={onPressIcon}
                    name={'eye-off'}
                    size={Platform.OS == 'android' ? HP('3.5%') : HP('3%')}
                    color={COLORS.lighterGrey}
                  />
                ) : (
                  <Icon
                    onPress={onPressIcon}
                    name={'eye'}
                    size={Platform.OS == 'android' ? HP('3.5%') : HP('3%')}
                    // size={Platform.OS == 'android' ? 10 : 10}
                    color={COLORS.placeholderGrey}
                    // color={COLORS.black}
                  />
                )}
              </View>
            )} */}
          </View>

          {error && error.length > 1 && (
            <CustomText small error>
              {error}
            </CustomText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: SPACING.xxsmall,
    // borderColor: 'red',
    // borderWidth: 0.4,
    // borderStyle: 'solid',
  },
  labelText: {
    color: COLORS.greyDark,
    marginBottom: SPACING.mini,
  },

  selectTextStyle: {
    color: COLORS.greyDark,
  },
  numberStyle: {
    minHeight: 40,
    borderRadius: BORDERRADIUS.medium,
    width: '100%',

    alignItems: 'center',
    alignSelf: 'center',

    color: COLORS.black,
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: COLORS.black,
  },
  errorStyle: {
    color: COLORS.red,
  },
});

export default React.memo(CustomInput);
