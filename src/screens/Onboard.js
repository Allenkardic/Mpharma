import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import {COLORS, HP, SPACING} from '../utils/themes';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
function Onboarding(props) {
  const [titleInput, setTitleInput] = React.useState('');

  const handleContinue = () => {
    if (titleInput.length > 2) {
      props.navigation.navigate('Product', {username: titleInput});
    } else {
      showMessage({
        type: 'danger',
        message: 'Your username is required to continue',
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS == 'ios' ? SPACING.small : SPACING.xxsmall,
        paddingHorizontal: SPACING.xsmall,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
      <CustomText
        style={{marginBottom: SPACING.large}}
        color={COLORS.tertiary}
        xxlarge>
        Welcome to Mpharma product listing app
      </CustomText>
      <View style={{marginBottom: SPACING.medium}}>
        <CustomInput
          onChangeText={text => setTitleInput(text)}
          value={titleInput}
          placeholder="Enter username"
          editable={true}
          label="User Name"
          keyboardType={'default'}
        />
      </View>

      <CustomButton
        btnBackgroundColor={COLORS.yellow}
        title={'Proceed'}
        onPress={handleContinue}
      />
    </View>
  );
}

export default Onboarding;
