import { AUTHENTICATED, IS_EMPRESA , FORM} from '../actions/actionTypes'

export const loginIsEmpresa = value => ({
    type: IS_EMPRESA,
    permissao: value
  });


export const loginAuth = value => ({
  type: AUTHENTICATED,
  auth: value

});

export const perfilForm = value => ({
  type: FORM,
  form: value
})
