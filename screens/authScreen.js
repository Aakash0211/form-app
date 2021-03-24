import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Button,TouchableWithoutFeedback,Keyboard, Alert,TouchableHighlight,Image,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import * as Yup from 'yup'
import {Formik} from 'formik'

import {useDispatch} from 'react-redux'
import * as authActions from '../store/AuthActions.js' 
import {TextInput,Checkbox} from 'react-native-paper'
const authScreen = (props) => {
    const [log,setLog]=useState(false)
    const [checked,setChecked]=useState(false)
    const [pass,setPass]=useState(true)
    const [err,setErr]=useState()
    useEffect(()=>{
      if(err){
      Alert.alert('An Error Ocurred',err,[{text:'OK'}],{cancelable:true})}
    }
    ,[err])
    
    const dispatch=useDispatch()
    const formhandler=async (values)=>{ 
     if(log){
       setErr(null)
      
      try{
     await dispatch(authActions.logIn(values.email,values.password))
     props.navigation.navigate('Last')
     }
     catch(err){
       setErr(err.message)
     }
   }
     else{
       setErr(null)
       
       try{
          await dispatch(authActions.signUp(values.email,values.password))
          props.navigation.navigate('Last')
        }
        catch(err){
          setErr(err.message)
     
        }
     }
   
    }
  const schema=Yup.object().shape({
    email:Yup.string()
          .required()
          .email(),
    password:Yup.string()
              .min(8)
               .required()
  })  
  

    return (
      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
    <View style={{marginRight:195}}>
      {log ?(<Text  style={{paddingBottom:45,fontSize:27,fontWeight:'bold',marginRight:30}}>Log In</Text>):(<View style={{paddingBottom:42}}><Text style={{alignItems:'flex-start',fontSize:27,fontWeight:'bold'}}>Create </Text><Text style={{fontSize:27,fontWeight:'bold'}}>Account</Text></View>)}
      </View>
      <Formik
       initialValues={{email:'',password:''}}
        validationSchema={schema}
        onSubmit={(values,actions)=>{
          actions.resetForm()
        formhandler(values)
        Keyboard.dismiss
        }}
        validateOnChange={true}
        >
      {(prop)=>(
        <View style={styles.cont}>
        <View style={{marginRight:210}}>
        <Text style={styles.txt}>Your Email</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TextInput
        mode="flat"
        underlineColor="white"
         value={prop.values.email}
         onChangeText={prop.handleChange('email')}
         style={styles.inpe}
         returnKeyType='done'
         keyboardType='email-address'
         autoCompleteType='email'
         underlineColorAndroid="transparent"
         right={<TextInput.Icon
           name={()=>{return(!prop.errors.email && prop.values.email.length>0 && <Ionicons name="checkmark-sharp" size={20} color="blue" />)}}
         />}
        />
        </View>
        <Text style={{color:'red'}}>{prop.touched.email && prop.errors.email}</Text>
        <View style={{marginRight:210}}>
        <Text style={styles.txt}>Password</Text>
        </View>
        <View style={{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'}} >
        <TextInput
        mode='flat'
        underlineColor="white"
        value={prop.values.password}
        onChangeText={prop.handleChange('password')}
        style={styles.inpp}
        secureTextEntry={pass}
        returnKeyType="done"
        keyboardType='default'
        autoCompleteType='password'
        underlineColorAndroid="transparent"
        right={<TextInput.Icon
          name={()=>{return( pass ?<Ionicons name='eye-outline' size={24} />:(<Ionicons name='eye-off-outline' size={24} />))}}
          onPress={()=>{setPass(!pass)}}
        />}
        />
        
        </View>
        <Text style={{color:'red',marginLeft:20}}>{prop.touched.password && prop.errors.password}</Text>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingHorizontal:35,paddingTop:15}}>
        <Checkbox
        status={checked?'checked':'unchecked'}
        onPress={()=>{setChecked(!checked)}}
        color={checked ?'#0062FF': undefined}
        
        />
         <Text>I agree to the <Text style={{color:'#0062FF',textDecorationLine:'underline'}}>Terms & Conditions</Text> and <Text style={{color:'#0062FF',textDecorationLine:'underline'}}>Privacy Policy</Text></Text>
        </View>
        <View style={styles.btn}>
        {log ?(<View style={styles.btk}><Button   color='#0066ff'   title ='Log In' onPress={prop.handleSubmit} disabled={!checked}/></View> ):(<View style={styles.btk}><Button  color='#0066ff'  title ='Create Account' onPress={prop.handleSubmit} disabled={!checked}/></View>)}
        </View>
       {!log && <TouchableOpacity style={{borderWidth:1,borderColor:"#0062FF",borderRadius:10,flexDirection:'row',width:300,
     height:47,justifyContent:'space-evenly',alignItems:'center'}}>
          <Image style={{width:"7%",height:20}} source={{uri:'https://pics.freeicons.io/uploads/icons/png/2659939281579738432-512.png'}}/>
          <Text>Sign Up With Google</Text>
         </TouchableOpacity>
         }
       { log ?(<View style={{flexDirection:'row',paddingTop:40,alignItems:'center',width:190,justifyContent:'flex-end'}}>
            <Text>Didn't have an account </Text>
            <TouchableOpacity onPress={()=>{setLog(!log)}}><Text style={{textDecorationLine:'underline',color:'#0062FF'}}>Sign Up</Text></TouchableOpacity>
        </View>): (<View style={{flexDirection:'row',paddingTop:40,alignItems:'center',width:190,justifyContent:'flex-end'}}>
            <Text>Already have an account?  </Text>
            <TouchableOpacity   onPress={()=>{setLog(!log)}}><Text style={{textDecorationLine:'underline',color:'#0062FF'}}>Log In</Text></TouchableOpacity>
        </View>)}
        </View>
      )}
      </Formik>
    </View>
    </TouchableWithoutFeedback>

    )
}

export default authScreen


const styles = StyleSheet.create({
    container: {
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     marginTop:108
    },
    cont:{
        justifyContent:'center',
     alignItems:'center'
    },
    inpp:{
    
     borderColor:'white',
     borderWidth:1,
     borderRadius:10,
     
     backgroundColor:'#F0F8FF',
     padding:4,
     width:300,
     height:47,
    
    },
    inpe:{
       
      borderColor:'white',
      borderWidth:1,
      borderRadius:10,
      padding:4,
      width:300,
      height:47,
      backgroundColor:'#F0F8FF'
     
     },
    viw:{
  
    },
    txt:{
     fontWeight:'bold',
     paddingBottom:5,
     
    },
    btn:{
        borderRadius:15,
        padding:40,
        justifyContent:'space-between',
        alignItems:'center',
    },
    bt:{
        padding:20,
        justifyContent:'space-between',
        alignItems:'center',
    },
    btk:{
  
      borderRadius:10,
      width:300,
     height:47
    }
  });
  