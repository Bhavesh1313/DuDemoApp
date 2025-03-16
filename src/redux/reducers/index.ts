import { combineReducers } from 'redux';
import loginReducer from './loginSlice';
import languageReducer from './languageSlice';

export const rootReducer = combineReducers({
    login: loginReducer,
    language: languageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
