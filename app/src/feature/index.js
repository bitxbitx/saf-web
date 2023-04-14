import { configureStore } from "@reduxjs/toolkit";

// Auth
import { authApi } from "./services/auth/auth.services";
import { userApi } from "./services/auth/user.services";

// Ecom
import { orderApi } from "./services/ecom/order.services";
import { productApi } from "./services/ecom/product.services";
import { productCategoryApi } from "./services/ecom/productCategory.services";
import { promoCodeApi } from "./services/ecom/promoCode.services";
import { shopLocationApi } from "./services/ecom/shopLocation.services";
import { wishlistApi } from "./services/ecom/wishlist.services";


const store = configureStore({
    reducer: {
        // Auth
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

        // Ecom
        [orderApi.reducerPath]: orderApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productCategoryApi.reducerPath]: productCategoryApi.reducer,
        [promoCodeApi.reducerPath]: promoCodeApi.reducer,
        [shopLocationApi.reducerPath]: shopLocationApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        // Auth
        authApi.middleware,
        userApi.middleware,

        // Ecom
        orderApi.middleware,
        productApi.middleware,
        productCategoryApi.middleware,
        promoCodeApi.middleware,
        shopLocationApi.middleware,
        wishlistApi.middleware,

    )
});

export default store;
