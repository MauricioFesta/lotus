import { AUTHENTICATED, IS_EMPRESA } from '../actions/actionTypes'

export const loginIsEmpresa = value => ({
    type: IS_EMPRESA,
    permissao: value
  });


export const loginAuth = value => ({
  type: AUTHENTICATED,
  auth: value

});
