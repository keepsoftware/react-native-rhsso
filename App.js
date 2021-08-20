/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { authorize, revoke } from 'react-native-app-auth';


const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const config = {
    issuer: 'http://192.168.0.115:8080/auth/realms/Clientes/',
    clientId: 'users',
    redirectUrl: 'ubdi://connect',
    scopes: ['openid'],
    usePKCE: true,
    dangerouslyAllowInsecureHttpRequests: true,
    serviceConfiguration: { 
      authorizationEndpoint: 'http://192.168.0.115:8080/auth/realms/Clientes/protocol/openid-connect/auth', 
      tokenEndpoint: 'http://192.168.0.115:8080/auth/realms/Clientes/protocol/openid-connect/token', 
      revocationEndpoint: 'http://192.168.0.115:8080/auth/realms/Clientes/protocol/openid-connect/revoke'
    }
  };
  let result = {};

  const login = async() => {
    console.log('Login');
    
    try {
      result = await authorize(config);
      console.log('Auth:', result);
      // result includes accessToken, accessTokenExpirationDate and refreshToken
    } catch (error) {
      console.log(error);
    }


  }

  const logout = async() => {
    // console.log('Revoke:', result.accessToken);

    try {
      const revokea = await revoke(config, {
          tokenToRevoke: result.accessToken,
          includeBasicAuth: true,
          sendClientId: true,
      });

      console.log('Revoke:', revokea)
    } catch (error) {
      console.log(error);
    }

    

  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>



            <Button onPress={login} title="Login Keycloak"/>
            <Button onPress={logout} title="Logout Keycloak"/>




          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
