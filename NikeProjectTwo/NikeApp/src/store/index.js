import { View, Text } from 'react-native'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './productSlice'
import { cartSlice } from './cartSlice'
import { apiSlice } from './apiSlice'

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
        api: apiSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`. Making react kit query work.
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

