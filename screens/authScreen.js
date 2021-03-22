import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,Button,TouchableWithoutFeedback,Keyboard, Alert } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import * as Yup from 'yup'
import {Formik} from 'formik'
import Checkbox from 'expo-checkbox'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/AuthActions.js' 
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
    <View style={{marginRight:130}}>
      {log ?(<Text  style={{paddingBottom:60,fontSize:22,fontWeight:'bold'}}>Log In</Text>):(<Text style={{alignItems:'flex-start',paddingBottom:60,fontSize:27,fontWeight:'bold'}}>Create Account</Text>)}
      </View>
      <Formik
       initialValues={{email:'',password:''}}
        validationSchema={schema}
        onSubmit={(values,actions)=>{
          actions.resetForm()
        formhandler(values)
        Keyboard.dismiss
        }}
        >
      {(prop)=>(
        <View style={styles.cont}>
        <View style={{marginRight:220}}>
        <Text style={styles.txt}>Your Email</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TextInput
         value={prop.values.email}
         onChangeText={prop.handleChange('email')}
         style={styles.inpe}
         returnKeyType="done"
         keyboardType='email-address'
         autoCompleteType='email'
        />
        {!prop.errors.email && prop.values.email.length>0 && <Ionicons name="checkmark-circle-outline" size={30} color="green" />}
        </View>
        <Text style={{color:'red'}}>{prop.touched.email && prop.errors.email}</Text>
        <View style={{marginRight:220}}>
        <Text style={styles.txt}>Password</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginRight:10}} >
        <TextInput
        value={prop.values.password}
        onChangeText={prop.handleChange('password')}
        style={styles.inpp}
        secureTextEntry={pass}
        returnKeyType="done"
        keyboardType='default'
        autoCompleteType='password'
        />
        <TouchableWithoutFeedback  onPress={()=>{setPass(!pass)}}>
          {pass ?<Ionicons name='eye-outline' size={24} />:(<Ionicons name='eye-off-outline' size={24} />)}
        </TouchableWithoutFeedback>
        </View>
        <Text style={{color:'red'}}>{prop.touched.password && prop.errors.password}</Text>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
        <Checkbox
        value={checked}
        onValueChange={setChecked}
        color={checked ?'#5349d6': undefined}
        />
         <Text>I agree to the <Text style={{color:'blue',textDecorationLine:'underline'}}>Terms & Conditions</Text> and <Text style={{color:'blue',textDecorationLine:'underline'}}>Privacy Policy</Text></Text>
        </View>
        <View style={styles.btn}>
        {log ?(<Button  color='#5349d6'  title ='Log In' onPress={prop.handleSubmit} disabled={!checked}/> ):(<Button  color='#5349d6'  title ='Create Account' onPress={prop.handleSubmit} disabled={!checked}/>)}
        </View>
       {!log && <Button  color='#00BFFF'  title ='Sign Up With Google' />}
       { !log && <View style={{flexDirection:'row',paddingTop:40,alignItems:'center',width:190,justifyContent:'flex-end'}}>
            <Text>Already have an account?  </Text>
            <Button title='Log In' color='blue' onPress={()=>{setLog(!log)}}/>
        </View>}
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
     alignItems:'center'
    },
    cont:{
        justifyContent:'center',
     alignItems:'center'
    },
    inpp:{
     marginLeft:20,
     borderColor:'#ddd',
     borderWidth:1,
     borderRadius:5,
     padding:4,
     width:290,
     maxHeight:70,
    
    },
    inpe:{
     
      borderColor:'#ddd',
      borderWidth:1,
      borderRadius:5,
      padding:4,
      width:290,
      maxHeight:70,
     
     },
    viw:{
  
    },
    txt:{
     fontWeight:'bold',
     paddingBottom:5,
     
    },
    btn:{
        padding:20,
        justifyContent:'space-between',
        alignItems:'center',
    },
    bt:{
        padding:20,
        justifyContent:'space-between',
        alignItems:'center',
    }

  });
  