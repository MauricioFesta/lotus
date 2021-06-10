

import { loginReducer} from './login';
import { perfilReducer} from './perfil';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  loginState: loginReducer,
  perfilState: perfilReducer
 
});