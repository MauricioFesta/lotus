import  {Store} from "../../store"

export const isAuthenticated = () => {
    
    console.log(Store.getState().loginState.auth)
    return Store.getState().loginState.auth

}
