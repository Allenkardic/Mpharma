import React from 'react';
import {View, FlatList, StyleSheet, Platform, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';
import {
  getProductsRequest,
  getProductsCleanUp,
} from '../store/api/get-products';

import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import ProductCard from '../components/ProductCard';
import PlusButton from '../components/PlusButton';
import Icon from 'react-native-vector-icons/Feather';
import {BOXWITHBIGSHADOW, COLORS, HP, SPACING, WP} from '../utils/themes';
import BottomSheet from '../components/BottomSheet';
import CustomButton from '../components/CustomButton';
function Product(props) {
  const {username} = props.route.params;
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
        message: 'error occured',
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
    showMessage({
      type: 'success',
      message: 'New product added',
    });
  };

  const handleDeleteProduct = id => {
    // this funtion deleted an item and returns items that are remaining
    // deleting is via identical ids
    const updateProduct = productData.filter(el => el.id !== id);
    setProductData(updateProduct);
  };

  const handleOnPressEdit = item => {
    // this funtion carries out deffient activities when the edit button on each card is pressed
    setEditBtnPressed(true);
    setTitleInput(item.name);
    setNewAmountInput(item.prices[0].price.toString());
    setOldAmountInput(item.prices[1].price.toString());
    setItemToEdit(item);
    openBottomSheet();
  };

  const handleConfirmEdit = () => {
    // update the product to waiting edit
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

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
      <Icon
        onPress={() => props.navigation.goBack()}
        name={'arrow-left'}
        size={HP('4%')}
        color={COLORS.lightWhite}
        style={{marginLeft: SPACING.xxsmall}}
      />

      <CustomText
        style={{
          ...styles.userText,
        }}
        white
        medium
        bold>
        Hi {username},
      </CustomText>
      <View style={{paddingHorizontal: SPACING.xsmall}}>
        <CustomText
          style={{
            marginBottom: SPACING.xsmall,
          }}
          color={COLORS.smokeWhite}
          small
          center>
          Products list
        </CustomText>
        <FlatList
          data={productData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <PlusButton onPress={plusBtnPressed} />

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? SPACING.small : SPACING.xxsmall,
  },
  userText: {
    marginLeft: SPACING.xsmall,
    marginTop: SPACING.xxsmall,
    marginBottom: SPACING.xsmall,
  },
});

export default Product;
