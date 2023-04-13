import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/product";
import { adminApi } from "./services/admin";
import { customerApi } from "./services/customer";
import { authApi } from "./services/auth";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware, adminApi.middleware, customerApi.middleware, authApi.middleware)
});

export default store;
