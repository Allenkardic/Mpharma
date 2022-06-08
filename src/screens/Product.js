import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {
  getProductsRequest,
  getProductsCleanUp,
} from '../store/api/get-products';

import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/Feather';
import {BOXWITHBIGSHADOW, COLORS, HP, SPACING, WP} from '../utils/themes';
import BottomSheet from '../components/BottomSheet';
import CustomButton from '../components/CustomButton';
function Product(props) {
  const dispatch = useDispatch();
  const refRBSheet = React.useRef();
  // satte
  const [productData, setProductData] = React.useState([]);

  // REDUX STATE
  const getProductsState = useSelector(s => s.getProducts);

  const [titleInput, setTitleInput] = React.useState('');
  const [oldAmountInput, setOldAmountInput] = React.useState('');
  const [newAmountInput, setNewAmountInput] = React.useState('');

  React.useEffect(() => {
    async function getProductFunc() {
      await dispatch(getProductsRequest());
    }
    getProductFunc();
  }, []);

  React.useEffect(() => {
    if (getProductsState?.error !== null && !getProductsState.isSuccessful) {
      showMessage({
        type: 'danger',
        message: getProductsState?.error?.message,
      });
      dispatch(getProductsCleanUp());
    } else {
      setProductData(getProductsState?.result?.products);
    }
  }, []);

  // console.log(getProductsState, 'sattes');

  // const renderItem = ({item}) => (
  //   console.log(item)
  //   <ProductCard
  //     title={item?.name}
  //     newPrice={item?.prices[0]?.price}
  //     oldPrice={item?.prices[0]?.price}
  //   />
  // );

  const renderItem = ({item}) => {
    // console.log(item, 'idd');
    return (
      <ProductCard
        title={item?.name}
        newPrice={item?.prices[0]?.price}
        oldPrice={item?.prices[1]?.price}
      />
    );
  };

  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };

  const handleAddNewProduct = () => {
    // const newProduct = [...productData, {id:productData.length+1, }]
    const newProduct = {
      id: uuid.v4(),
      name: titleInput,
      prices: [
        {
          id: uuid.v4(),
          price: parseFloat(newAmountInput),
          date: new Date().toISOString(),
        },
        {
          id: uuid.v4(),
          price: parseFloat(oldAmountInput),
          date: new Date().toISOString(),
        },
      ],
    };

    const payload = [...productData, newProduct];
    setProductData(payload);
    closeBottomSheet();
  };
  return (
    <View style={{backgroundColor: COLORS.primary, flex: 1}}>
      <CustomText medium bold>
        hello
      </CustomText>

      {/* <CustomInput
        onChangeText={text => setMyInput(text)}
        value={myInput}
        placeholder="eg: john@doe.com"
        editable={true}
        label="Email"
        keyboardType={'email-address'}
      /> */}

      {/* <ProductCard title={'Name of content'} oldPrice={200} newPrice={300} />
      <ProductCard title={'Name of content'} oldPrice={200} newPrice={300} />
      <ProductCard title={'Name of content'} oldPrice={200} newPrice={300} /> */}

      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        onPress={openBottomSheet}
        style={{
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
        }}>
        <Icon name={'plus'} size={HP('4%')} color={COLORS.white} />
      </TouchableOpacity>

      <BottomSheet
        header={true}
        closeButton={true}
        closeOnPressMask={true}
        closeOnDragDown={true}
        refRBSheet={refRBSheet}
        title={'Add new product'}
        height={HP('50%')}>
        <View style={{paddingHorizontal: SPACING.xsmall}}>
          <CustomInput
            onChangeText={text => setTitleInput(text)}
            value={titleInput}
            placeholder="eg: bag"
            editable={true}
            label="Product name"
            keyboardType={'email-address'}
          />

          <CustomInput
            onChangeText={text => setNewAmountInput(text)}
            value={newAmountInput}
            placeholder="eg: 2,00"
            editable={true}
            label="New Price"
            keyboardType={'numeric'}
          />

          <CustomInput
            onChangeText={text => setOldAmountInput(text)}
            value={oldAmountInput}
            placeholder="eg: 6,00"
            editable={true}
            label="Old Price"
            keyboardType={'numeric'}
          />
        </View>
        <View
          style={{
            paddingHorizontal: SPACING.xsmall,
            marginTop: SPACING.xsmall,
          }}>
          <CustomButton title={'Add product'} onPress={handleAddNewProduct} />
        </View>
      </BottomSheet>
    </View>
  );
}

export default Product;
