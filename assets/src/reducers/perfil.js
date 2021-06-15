import { FORM } from '../actions/actionTypes';


const initialState = {
  form: {},
  foto_base64: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.freepik.com%2Fvetores-gratis%2Fperfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg&imgrefurl=https%3A%2F%2Fbr.freepik.com%2Fvetores-premium%2Fperfil-de-avatar-de-homem-no-icone-redondo_2651713.htm&tbnid=GMuus4m5xBr62M&vet=12ahUKEwjO2oStgprxAhUvjZUCHfvGAoIQMygAegUIARDUAQ..i&docid=6dr0r1EUqlvnOM&w=626&h=626&q=image%20perfil&ved=2ahUKEwjO2oStgprxAhUvjZUCHfvGAoIQMygAegUIARDUAQ"
 
};

export const perfilReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM:

      return {
        ...state,
        form: action.form,
        foto_base64: action.foto_base64

      };
  
    default:
      return state;
  }
};
