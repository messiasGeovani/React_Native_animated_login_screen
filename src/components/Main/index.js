/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';

export default function Main() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  useEffect(() => {
    // eslint-disable-next-line no-undef
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    // eslint-disable-next-line no-undef
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 150,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 150,
      }),
    ]).start();
  };
  const keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 150,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 150,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={{
            width: logo.x,
            height: logo.y,
          }}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity,
            transform: [
              {
                translateY: offset.y,
              },
            ],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#FFF',
  },
});
