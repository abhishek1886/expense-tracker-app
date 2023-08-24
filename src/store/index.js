import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expensesReducer from "./expenses";
import themeReduce from "./themeReducer";
import uiReducer from './ui-slice';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  theme: themeReduce,
  ui: uiReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
