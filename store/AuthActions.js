export const SIGN_UP='SIGN_UP'
export const LOG_IN='LOG_IN'
export const signUp=(email,password)=>{
    return async dispatch=>{
     const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_hxN8MtbD47p4u-Ok2bG4DDodNeAFemo',{
      method:'POST',
      headers:{
       'Content-Type':'application/json',
      },
      body:JSON.stringify({email:email,password:password,returnSecureToken:true})
     }) 
     if(!res.ok){
      let message
      const errData =await res.json()
      console.log(errData)
      const errid=errData.error.message
      if(errid==="EMAIL_EXISTS"){
       message="Email Exits, Please Sign Up With Another Email"
      }
      else if(errid==="OPERATION_NOT_ALLOWED"){
       message="Password sign-in is disabled for this project"
      }
      throw new Error(message)
     }
     const data= await res.json()
     dispatch({
      type:SIGN_UP,
      payload:{
      token:data.idToken,
      userId:data.localId
      }
     })
     
   }
   
   }
    export const logIn=(email,password)=>{
       return async dispatch=>{
         
        const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_hxN8MtbD47p4u-Ok2bG4DDodNeAFemo',{
         method:'POST',
         headers:{
          'Content-Type':'application/json',
         },
         body:JSON.stringify({email:email,password:password,returnSecureToken:true})
        }) 
        if(!res.ok){
         let message
         const errData =await res.json()
         console.log(errData)
         const errid=errData.error.message
         if(errid==="EMAIL_NOT_FOUND"){
          message="Email Not Found, Please Sign Up"
         }
         else if(errid==="INVALID_PASSWORD"){
          message="Password is invalid,Please enter valid password"
         }
         throw new Error(message)
        }
        const data= await res.json()
        dispatch({
         type:LOG_IN,
         payload:{
            token:data.idToken,
            userId:data.localId
            }
        })
       
       }
       } 