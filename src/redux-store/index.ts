import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { actions, sagas, reducers, selectors } from "./slices";

const rootSaga = function* () {
   yield all(sagas.map(s => s()));
};
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(reducers);

const store = configureStore({
   reducer: rootReducer,
   middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
export { actions, selectors };
