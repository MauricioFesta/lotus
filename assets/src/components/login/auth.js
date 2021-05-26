import  {Store} from "../../store"

export const isAuthenticated = () => {
    
    return Store.getState().loginState.auth

}
