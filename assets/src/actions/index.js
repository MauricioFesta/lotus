import {FORM} from '../actions/actionTypes'

export const perfilForm = value => ({
  type: FORM,
  form: value,
  foto_base64: value
})

