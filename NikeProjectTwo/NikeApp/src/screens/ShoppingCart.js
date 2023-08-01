import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Alert } from "react-native";
import React from "react";
import cart from "../data/cart";
import { useSelector } from "react-redux";
import CartListItem from "../components/CartListItem";
import { selectDeliveryPrice, selectSubTotal, selectTotal } from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSlice";

const ShoppingCartTotal = () => {
    const subTotal =  useSelector(selectSubTotal);
    const deliveryFee = useSelector(selectDeliveryPrice)
     const total = useSelector(selectTotal)

    return (
  <View style={styles.totalsContainer}>
    <View style={styles.row}>
      <Text style={styles.text}>Sub Total</Text>
      <Text style={styles.text}>{subTotal}$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Delivery</Text>
      <Text style={styles.text}>{deliveryFee} US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.textBold}>Total</Text>
      <Text style={styles.text}>{total}US$</Text>
    </View>
  </View>
)};
const ShoppingCart = () => {
  const subTotal =  useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice)
   const total = useSelector(selectTotal)
    const cartItems = useSelector((state) => state.cart.items)
    const [createOrder, {data, error, isLoading}] = useCreateOrderMutation()
    console.log(error, isLoading, data)
    const onCreateOrder = async() => {
      const result = await createOrder({
        items: cartItems,
        subTotal,
        deliveryFee,
        total,
        customer: {
          name: "Nikhil",
          address: "Nizampet",
          email: "satyanikhil2000@gmail.com",
        }
      });
      if (result.data?.status === 'OK') {
        Alert.alert(
          "order has been submitted",
          `Your order reference is: ${result.data.data.ref}`
        )
      }
    }
  return (
    <View style={styles.flexItem}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotal}
      />
      <Pressable onPress={onCreateOrder}
      style={styles.button}>
        <Text style={styles.buttonText}>
          Checkout {isLoading && <ActivityIndicator/>}
          </Text>
      </Pressable>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  totalsContainer: {
    flex: 1,
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  flexItem: {
    height: "100%",
  },
});
