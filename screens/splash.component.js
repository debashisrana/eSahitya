import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  View,
  StatusBar,
} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import Logo from '../assets/media/logo.png';
export const SplashScreen = () => {
  
return(
    <SafeAreaView style={{flex: 1}}>
    <StatusBar
      animated={true}
      backgroundColor="#ffffff"
      barStyle="dark-content"
      // showHideTransition={statusBarTransition}
      hidden={false}
    />
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.patternWrap}>
        <Image source={Logo} style={styles.logoImage} />
      </View>
      </Layout>
      </SafeAreaView>
)
}
var styles = StyleSheet.create({
    logoImage: {
      width: Dimensions.get('window').width -100,
      height: '100%',
      resizeMode: 'contain',
    },
    patternWrap: {
      top: 0,
      left: 0,
      width: '100%',
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
      alignItems:"center"
    },
   
  });
  