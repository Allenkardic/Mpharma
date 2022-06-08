import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

function Onboarding(props) {
  const dispatch = useDispatch();

  // REDUX STATE
  const getProductsState = useSelector(s => s.getProducts);

  console.log(getProductsState, 'products');
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Product')}>
        hello world
      </Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text onPress={() => props.navigation.navigate('Product')}>
        hello world
      </Text>
    </View>
  );
}

export default Onboarding;
