import React from 'react'
import {View,Text,StyleSheet } from 'react-native'
const lastScreen = () => {
    return (
        <View style={styles.msg}>
         <Text>Yayy!! You Just logged in  </Text>
        </View>
    )
}

export default lastScreen
const styles=StyleSheet.create({
    msg:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})