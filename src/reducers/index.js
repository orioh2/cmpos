import { combineReducers} from "redux";
import loginReducer from './login.reducer'
import appReducer from './app.reducer'
import stockReducer from './stock.reducer'
import stockEditReducer from "./stock.edit.reducer";
import shopReducer from "./shop.reducer";
import transactionReducer from "./transaction.reducer";

import {reducer as form} from 'redux-form'


export default combineReducers({
    loginReducer,
    appReducer,
    stockReducer,
    stockEditReducer,
    shopReducer,
    transactionReducer,
    form});
