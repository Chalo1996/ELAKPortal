import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { groupCreditReducer } from "./reducers/groupCreditReducers";
import { authReducer } from "./features/authSlice";
import { funeralExpenseReducer } from "./features/gleSlice";
import { groupLifeAssuranceReducer } from "./features/glaSlice";
import { groupCriticalIllnessReducer } from "./features/gciSlice";
import { educationReducer } from "./features/eduSlice";
import { goalbasedReducer } from "./features/goalSlice";
import { callBackReducer } from "./features/callBackSlice";


const rootReducer = combineReducers({
  groupCredit: groupCreditReducer,
  auth: authReducer,
  funeralExpense: funeralExpenseReducer,
  groupLifeAssurance: groupLifeAssuranceReducer,
  groupCriticalIllness: groupCriticalIllnessReducer,
  education: educationReducer,
  goalBased: goalbasedReducer,
  callBack: callBackReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
