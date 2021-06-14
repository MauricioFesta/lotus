
import { perfilReducer} from './perfil';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({

  perfilState: perfilReducer
 
});