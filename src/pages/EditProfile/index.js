import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Profile, Input, Button, Gap} from './../../components';
import {ILNullPhoto} from './../../assets';
import {colors, getData, storeData} from './../../utils';
import {Fire} from './../../config';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photo: ILNullPhoto,
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});

      setProfile(data);
    });
  }, []);

  // Update user's profile
  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password kurang dari 6 karakter!',
          type: 'danger',
        });
      } else {
        updatePassword();
        updateProfileData();

        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  // Function Update Password
  const updatePassword = () => {
    // Update password
    Fire.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          showMessage({
            message: err.message,
            type: 'danger',
          });
        });
      }
    });
  };

  // Function Update Profile
  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;

    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(res => {
        console.log(res); // Should be undefined
        storeData('user', data);
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'danger',
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200},
      response => {
        if (response.didCancel) {
          showMessage({
            message: 'Anda belum memilih foto!',
            type: 'danger',
          });
        } else {
          console.log(response);
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );

          const source = {uri: response.assets[0].uri};
          setPhoto(source);
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile avatar={photo} isRemove onPress={() => getImage()} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => {
              changeText('fullName', value);
            }}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => {
              changeText('profession', value);
            }}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={profile.email}
            onChangeText={value => {
              changeText('email', value);
            }}
            disable
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={value => {
              setPassword(value);
            }}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={() => update()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
