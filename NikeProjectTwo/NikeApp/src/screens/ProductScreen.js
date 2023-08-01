import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
// import product from "../data/products";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux'
import { productsSlice } from "../store/productSlice";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductScreen = ({navigation}) => {

  // const navigation = useNavigation()
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.products.products)
  const { data, isLoading, error} = useGetProductsQuery()
  const products = data?.data

  if (isLoading) {
    return <ActivityIndicator/>
  }
  if (error) {
    return <Text>Error in Fetching the data</Text>
  }


  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            // update selected product
            // dispatch(productsSlice.actions.setSelectedProduct(item.id))
            navigation.navigate("Product Details", {id: item._id});
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    // when the height should be  equal to width we will use aspectRatio: 1
    aspectRatio: 1,
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
});
