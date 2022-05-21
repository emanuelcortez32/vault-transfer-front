import { configureStore } from '@reduxjs/toolkit';
import web3Reducer from './reducers/web3slice';

export const store = configureStore({
    reducer: {
        web3: web3Reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;