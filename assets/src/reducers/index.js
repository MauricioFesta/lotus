
import { perfilReducer } from './perfil';
import { vagasReducer } from './vagas'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({

  perfilState: perfilReducer,
  vagasState: vagasReducer

});