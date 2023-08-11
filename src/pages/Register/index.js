import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Input, Button, Gap, Loading} from './../../components';
import {colors, useForm, storeData} from './../../utils';
import {Fire} from './../../config';
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
    console.log(form);

    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;

        // data
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: user.uid,
        };

        // Set loading
        setLoading(false);

        // Reset form
        setForm('reset');

        // https://firebase.com/users
        // Insert user's data
        Fire.database()
          .ref('users/' + user.uid + '/')
          .set(data);

        // Local storage for user's data
        storeData('user', form);

        console.log(user);
        navigation.replace('UploadPhoto', data);
      })
      .catch(error => {
        setLoading(false);
        const errorMessage = error.message;

        // Show flash message
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header
          onPress={() => {
            navigation.goBack();
          }}
          title="Daftar Akun"
        />
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
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
    backgroundColor: colors.white,
  },
});
