import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Input, Link, Button, Gap} from './../../components';
import {ILLogo} from './../../assets';
import {colors, fonts, useForm, storeData} from './../../utils';
import {Fire} from './../../config';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const login = () => {
    dispatch({type: 'SET_LOADING', value: true});

    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            if (resDB.val()) {
              // Store user's data into the local storage
              storeData('user', resDB.val());

              navigation.replace('MainApp');
            }
          });
        dispatch({type: 'SET_LOADING', value: false});
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'danger',
        });

        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={() => login()} />
          <Gap height={30} />
          <Link title="Create New Account" size={16} align="center" />
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
