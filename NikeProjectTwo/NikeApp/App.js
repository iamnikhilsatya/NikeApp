import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/NavigationMain";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ShoppingCart from "./src/screens/ShoppingCart";
import { Provider } from 'react-redux';
import {store} from './src/store'
export default function App() {
  return (
    <Provider store={store}>
      <Navigation></Navigation>
      <StatusBar style="auto" />
    </Provider>
  );
}
