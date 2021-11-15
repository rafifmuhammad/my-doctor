import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header} from './../../components';
import {Input, Button, Gap, Loading} from './../../components';
import {colors, useForm} from './../../utils';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const onContinue = () => {
    const auth = getAuth();

    console.log(form);
    setLoading(true);

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential, success) => {
        setLoading(false);
        console.log('register success: ', success);
        setForm('reset');
      })
      .catch(error => {
        const errorMessage = error.message;

        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });

    // navigation.navigate('UploadPhoto');
  };

  return (
    <>
      <View style={styles.page}>
        <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email"
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
            <Gap height={40} />
            <Button title="Continue" onPress={() => onContinue()} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
