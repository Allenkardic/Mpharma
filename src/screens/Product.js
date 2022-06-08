import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductsRequest,
  getProductsCleanUp,
} from '../store/api/get-products';

import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS} from '../utils/themes';
function Product(props) {
  const dispatch = useDispatch();

  const [myInput, setMyInput] = React.useState('');

  React.useEffect(() => {
    async function getProductFunc() {
      await dispatch(getProductsRequest());
    }
    getProductFunc();
  }, []);

  // REDUX STATE
  const getProductsState = useSelector(s => s.getProducts);

  console.log(getProductsState, 'sattes');
  return (
    <View>
      <Text>hello world products</Text>
      <Text>hello world products</Text>
      <Text>hello world products</Text>
      <Text>hello world products</Text>
      <Text>hello world products</Text>
      <Text>hello world products</Text>
      <Text>hello world products</Text>

      <CustomText medium bold>
        hello
      </CustomText>

      <CustomInput
        onChangeText={text => setMyInput(text)}
        value={myInput}
        placeholder="eg: john@doe.com"
        editable={true}
        label="Email"
        keyboardType={'email-address'}
      />

      <View style={{marginLeft: 30}}>
        {/* <Icon name={'arrow-up-circle'} size={20} color={COLORS.primary} /> */}
        <Icon name={'arrow-up-circle'} size={20} color={COLORS.primary} />
      </View>
    </View>
  );
}

export default Product;
