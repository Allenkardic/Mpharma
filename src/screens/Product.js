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
  // state
  const [productData, setProductData] = React.useState([]);

  // REDUX STATE
  const getProductsState = useSelector(s => s.getProducts);

  const [titleInput, setTitleInput] = React.useState('');
  const [oldAmountInput, setOldAmountInput] = React.useState('');
  const [newAmountInput, setNewAmountInput] = React.useState('');
  const [editBtnPressed, setEditBtnPressed] = React.useState(false);
  const [itemToEdit, setItemToEdit] = React.useState({});

  React.useEffect(() => {
    async function getProductFunc() {
      dispatch(getProductsRequest());
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

  const resetInputs = () => {
    setTitleInput('');
    setNewAmountInput('');
    setOldAmountInput('');
  };

  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };

  const plusBtnPressed = () => {
    setEditBtnPressed(false);
    resetInputs();
    openBottomSheet();
  };

  const handleAddNewProduct = () => {
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
    resetInputs();
  };

  const handleDeleteProduct = id => {
    // this funtion deleted an item and returns items that are remaining
    // deleting is via identical ids
    const updateProduct = productData.filter(el => el.id !== id);
    setProductData(updateProduct);
  };

  const handleOnPressEdit = item => {
    setEditBtnPressed(true);
    setTitleInput(item.name);
    setNewAmountInput(item.prices[0].price.toString());
    setOldAmountInput(item.prices[1].price.toString());

    setItemToEdit(item);
    openBottomSheet();
  };

  const handleConfirmEdit = () => {
    const updatedProduct = [...productData].map(el => {
      if (el.id === itemToEdit.id) {
        el.name = titleInput;
        el.prices[0].price = parseFloat(newAmountInput);
        el.prices[1].price = parseFloat(oldAmountInput);
      }
      return el;
    });

    setProductData(updatedProduct);
    closeBottomSheet();
    resetInputs();
  };

  const renderItem = ({item}) => {
    const {id} = item;
    return (
      <ProductCard
        onPressDelete={() => handleDeleteProduct(id)}
        onPressEdit={() => handleOnPressEdit(item)}
        title={item?.name}
        newPrice={item?.prices[0]?.price}
        oldPrice={item?.prices[1]?.price}
      />
    );
  };

  console.log(editBtnPressed, 'kk');
  return (
    <View style={{backgroundColor: COLORS.primary, flex: 1}}>
      <CustomText white medium bold>
        hello
      </CustomText>
      <View style={{paddingHorizontal: SPACING.xsmall}}>
        <FlatList
          data={productData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        onPress={plusBtnPressed}
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
        title={editBtnPressed ? 'Update this product' : 'Add new product'}
        height={HP('50%')}>
        <View style={{paddingHorizontal: SPACING.xsmall}}>
          <CustomInput
            onChangeText={text => setTitleInput(text)}
            value={titleInput}
            placeholder="eg: bag"
            editable={true}
            label="Product name"
            keyboardType={'default'}
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
          <CustomButton
            title={editBtnPressed ? 'Update product' : 'Add product'}
            onPress={editBtnPressed ? handleConfirmEdit : handleAddNewProduct}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

export default Product;
