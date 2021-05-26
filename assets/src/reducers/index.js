

import { loginReducer} from './login';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  loginState: loginReducer,
 
});