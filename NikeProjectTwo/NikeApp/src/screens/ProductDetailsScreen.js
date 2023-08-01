import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import products from "../data/products";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";

const ProductDetailsScreen = ({route}) => {
  const id = route.params.id

  const {data, isLoading, error} = useGetProductQuery(id)
  // const product = useSelector((state) => state.products.selectedProduct)
  const product = data?.data
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  // const product = products[0];
  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({product}))
  };

  if(isLoading) {
    return <ActivityIndicator/>
  }
  if (error) {
    return <Text>Error in fetching the product</Text>
  }

  return (
    <View>
      <ScrollView>
        {/* Image carosel */}
        <FlatList
          data={product?.images}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item }}
                style={{ width: width, aspectRatio: 1 }}
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product?.name}</Text>
          {/* Price  */}
          <Text style={styles.price}>${product?.price}</Text>
          {/* Description */}
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
      {/* Add cart button */}
      <Pressable style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    // letter spacing is like padding between the array of eleements
    //TODO: check the differece
    letterSpacing: 1,
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    // line height gives the spacing between the lines
    //TODO: check the differece
    lineHeight: 30,
    marginVertical: 10,
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
});
