import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from "next-redux-wrapper";
import filterData from './slices/filter';
import singleData from './slices/single';
import userData from './slices/user';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage
}

const combineReducer = combineReducers({
    filterData,
    singleData,
    userData,
})

const persistedReducer = persistReducer(persistConfig, combineReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store)

// export const wrapper = createWrapper(makeStore)


