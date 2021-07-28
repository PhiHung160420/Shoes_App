import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';
import ProductPrice from '../../components/ProductPrice';
import {COLORS, SIZES} from '../../constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AwesomeAlert from 'react-native-awesome-alerts';

const ProductItem = ({item, listSize}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state show hide alert
  const [showAlert, setShowAlert] = useState(false);

  const swipeableRef = useRef(null);

  // hide alert
  const handlerShowAlert = () => {
    setShowAlert(true);
    swipeableRef.current.close();
  };

  // show alert
  const handlerHideAlert = () => {
    setShowAlert(false);
  };

  // right swiper
  const rightSwiper = (progress, dragY) => {
    const scale = dragY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        style={styles.rightSwiperContainer}
        onPress={handlerShowAlert}>
        <Animated.View style={{transform: [{scale}]}}>
          <Feather name="trash-2" size={50} color={appTheme.textColor} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={rightSwiper}>
      <View
        style={[
          styles.productItemContainer,
          {
            backgroundColor: appTheme.flatlistbackgroundItem,
            shadowColor: appTheme.shadowColor,
          },
        ]}>
        {/* ALERT */}
        <AwesomeAlert
          show={showAlert}
          title="Confirm"
          message="Are you sure want to delete this shoes ?"
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          onCancelPressed={handlerHideAlert}
          onConfirmPressed={handlerHideAlert}
          contentContainerStyle={styles.alertContainerStyle}
          titleStyle={styles.titleAlertStyle}
          messageStyle={styles.messageAlertStyle}
          cancelButtonStyle={styles.cancelButtonStyle}
          confirmButtonStyle={styles.confirmButtonStyle}
          cancelButtonTextStyle={styles.cancelBtnTextStyle}
          confirmButtonTextStyle={styles.confirmBtnTextStyle}
        />
        {/* ALERT */}

        <View style={styles.leftItemContainer}>
          {/* NAME */}
          <Text style={[styles.productName, {color: appTheme.textColor}]}>
            {item.name}
          </Text>
          {/* NAME */}

          {/* PRICE */}
          <ProductPrice>{item.price}</ProductPrice>
          {/* PRICE */}

          {/* QUANTITY - SIZE */}
          <View style={styles.productInfo}>
            {/* QUANTITY */}
            <View style={styles.quantityContainer}>
              {/* DESC BUTTON */}
              <TouchableOpacity style={styles.ascQuantity}>
                <Feather name="minus" size={20} color="black" />
              </TouchableOpacity>
              {/* DESC BUTTON */}

              {/* QUANTITY */}
              <Text style={[styles.quantityText, {color: appTheme.textColor}]}>
                1
              </Text>
              {/* QUANTITY */}

              {/* ASC BUTTON */}
              <TouchableOpacity style={styles.descQuantity}>
                <Feather name="plus" size={20} color="white" />
              </TouchableOpacity>
              {/* ASC BUTTON */}
            </View>
            {/* QUANTITY */}

            <View style={styles.seperateContainer}>
              <View style={styles.seperate} />
            </View>

            {/* SIZE */}
            <View style={styles.sizeContainer}>
              <View
                style={[
                  styles.sizeTextContainer,
                  {
                    backgroundColor:
                      appTheme.name == 'dark'
                        ? COLORS.gainsboro
                        : COLORS.darkgray,
                  },
                ]}>
                <Text style={styles.sizeText}>42</Text>
              </View>
              <ModalDropdown
                options={listSize}
                defaultValue={'42'}
                style={styles.sizeStyle}
                dropdownStyle={styles.sizeDropdown}
                dropdownTextStyle={styles.sizeTextDropdown}
                showsVerticalScrollIndicator={false}>
                <Feather name="chevron-down" size={25} />
              </ModalDropdown>
            </View>
            {/* SIZE */}
          </View>
          {/* QUANTITY - SIZE */}
        </View>
        {/* IMAGE */}
        <View style={styles.rightItemContainer}>
          <Image
            source={{uri: item.image}}
            style={[
              styles.imageProduct,
              {
                shadowColor:
                  appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.black,
              },
            ]}
          />
        </View>
        {/* IMAGE */}
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    borderRadius: SIZES.radius * 3,
    width: SIZES.width - 15,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  leftItemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  rightItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  productInfo: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 15,
  },
  ascQuantity: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
  },
  descQuantity: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  seperateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  seperate: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: 'black',
  },
  sizeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  sizeStyle: {
    backgroundColor: 'transparent',
  },
  sizeTextContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 15,
  },
  sizeDropdown: {
    backgroundColor: COLORS.green,
  },
  sizeTextDropdown: {
    fontSize: 15,
  },
  imageProduct: {
    width: 150,
    height: 130,
    shadowOffset: {
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  rightSwiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    backgroundColor: '#dc143c',
    width: 90,
    borderRadius: SIZES.radius * 2,
  },
  alertContainerStyle: {
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleAlertStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageAlertStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButtonStyle: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  confirmButtonStyle: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: COLORS.green,
  },
  cancelBtnTextStyle: {
    fontSize: 20,
    color: COLORS.black,
  },
  confirmBtnTextStyle: {
    fontSize: 20,
    color: COLORS.black,
  },
});

export default ProductItem;