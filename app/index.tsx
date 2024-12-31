import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: googleOAuth } = useOAuth({ strategy: 'oauth_google' });
  const { signIn, isLoaded } = useSignIn();
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const handleAppleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const handleEmailLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({ identifier: email });

      if (result.status === 'needs_first_factor') {
        // Navigate the user to a confirmation screen or handle OTP
        Alert.alert(
          'Check Your Email',
          'We’ve sent you a sign-in link. Please check your email to continue.'
        );
      }
    } catch (err) {
      console.error('Email sign-in error', err);
      Alert.alert('Error', 'Something went wrong while signing in with email.');
    }
  };

  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://galaxies.dev');
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image source={require('@/assets/images/todoist-logo.png')} style={styles.loginImage} />
      <Image source={require('@/assets/images/login.png')} style={styles.banner} />
      <Text style={styles.title}>Organize your work and life, finally.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn]} onPress={handleAppleLogin}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={[styles.btnText]}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.btnText]}>Continue with Google</Text>
        </TouchableOpacity>

        {/* <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={Colors.lightText} j
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        /> */}
        <TouchableOpacity style={[styles.btn]} onPress={handleEmailLogin}>
          <Ionicons name="mail" size={24} />
          <Text style={[styles.btnText]}>Continue with Email</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          By continuing you agree to Todoist's{' '}
          <Text style={styles.link} onPress={openLink}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={openLink}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  banner: {
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    marginHorizontal: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  btn: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightBorder,
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
