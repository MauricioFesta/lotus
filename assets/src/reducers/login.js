import { IS_EMPRESA } from '../actions/actionTypes';
import { AUTHENTICATED } from '../actions/actionTypes';

const initialState = {
    permissao: false,
    auth: false
    
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case IS_EMPRESA:

        return {
          ...state,
          permissao: action.permissao 
         
        };
      case AUTHENTICATED:

        return {
          ...state,
          auth: action.auth
         
        };

      default:
        return state;
    }
  };
