import { LOG_IN, SIGN_UP,AUTH,  LOG_OUT } from "./AuthActions.js"

const initialState={
 token:null,
 userId:null
}
export default(state=initialState,action)=>{
   switch(action.type){
     case SIGN_UP:{
         return {
             token:action.payload.token,
             userId:action.payload.userId
         }
     }
     case LOG_IN:{
         return{
            token:action.payload.token,
            userId:action.payload.userId
         }
     }
     
     default:{
         return state
     }

   }
}