import { FORM } from '../actions/actionTypes';


const initialState = {
  form: {},
 
};

export const perfilReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM:

      return {
        ...state,
        form: action.form

      };
  
    default:
      return state;
  }
};
