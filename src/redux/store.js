import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

const allMiddlewares = [sagaMiddleware];

// Create Redux store with all middlewares
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...allMiddlewares))
);

// Run all sagas with saga middleware
sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
