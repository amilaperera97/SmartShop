/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image,Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartItem = (props) => {
  const Separator = () => (
    <View style={styles.separator} />
  );

  let imageUrl = 'https://aldprdproductimages.azureedge.net/media/$Aldi_GB/18.11.21%20REVERSION%20ERRORS/4088600212531_0.jpg';

  if (props.title == 'Protein Yogurt 200g') {
    imageUrl = 'https://aldprdproductimages.azureedge.net/media/$Aldi_GB/18.11.21%20REVERSION%20ERRORS/4088600212531_0.jpg';
  } else if (props.title == 'Apple Juice 1 Litre') {
    //apple
    imageUrl = 'https://aldprdproductimages.azureedge.net/media/resized/$Aldi_GB/16.06.21/4088600123929_0_XL.jpg';
  } else if (props.title == 'Chocolate Milk') {
    //milk
    imageUrl = 'https://aldprdproductimages.azureedge.net/media/resized/$Aldi_GB/ALL_RESIZED3/25027105_0_XL.png';
  }



  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Image style={styles.stretch} source={{uri: imageUrl}}/>
        {/* <Text style={styles.quantity}>{props.quantity}-</Text> */}
        <Text style={styles.mainText}> {props.title}</Text>
        <Text style={styles.mainText}>   £{props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Icon name="trash" size={23} color="red" />
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
  stretch: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default CartItem;
