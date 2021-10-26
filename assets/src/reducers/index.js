
import { perfilReducer } from './perfil';
import { vagasReducer } from './vagas'
import {postagemReducer} from './postagem'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({

  perfilState: perfilReducer,
  vagasState: vagasReducer,
  postagemState: postagemReducer

});