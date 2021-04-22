import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import ProductReducer from './Products/reducer';
import DialogReducer from './Dialog/reducer';

import mysaga from "./saga/saga";
const sagaMiddleWare = createSagaMiddleware();
export const rootReducer = combineReducers({
    productState: ProductReducer,
    dialogState: DialogReducer,
});
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(mysaga);

export default store;
