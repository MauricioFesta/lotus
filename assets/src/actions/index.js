import {FORM,QUERY} from '../actions/actionTypes'

export const perfilForm = value => ({
  type: FORM,
  form: value,

})

export const perfilQuery = value => ({
  type: QUERY,
  query: value,

})


