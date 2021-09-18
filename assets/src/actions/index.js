import {FORM,QUERY, VAGA_ONE} from '../actions/actionTypes'

export const perfilForm = value => ({
  type: FORM,
  form: value,

})

export const perfilQuery = value => ({
  type: QUERY,
  query: value,

})

export const vagaView = value => ({

  type: VAGA_ONE,
  vaga_one: value,

})



