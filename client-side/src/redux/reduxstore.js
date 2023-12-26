import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer});


const persistConfig = {
    key: 'root', //This represents the key under which the persisted state will be stored in the storage medium.
                 //allowing user to differentiate multiple persisted stores in the same storage
    storage, //defines the storage medium where the state will be persisted. It can be localStorage, 
             //sessionStorage, AsyncStorage (in React Native), or a custom storage engine compatible w. the API.
    version: 1, //denotes the version of the persisted state. If I make changes to the shape or content of the
                //persisted state, incrementing the version number helps manage the migration of older state
                //shapes to newer ones
  }
   
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
//^^^^^^^^ the following 3 line of codes are replaced by the following code
/*   reducer: {
     user: userReducer,
  },
*/ 
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, //prevent browser prompting "not serializing" error
  }),
});

export const persistor = persistStore(store); // persistor is an obj that holds the reference to the persisted version of the store. It 
                                              // enhances the store by adding persistence functionality, such as automatically persisting
                                              // and rehydrating the state from storage (like localStorage or AsyncStorage)