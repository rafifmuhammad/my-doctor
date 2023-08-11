import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, Profile, List, Gap} from './../../components';
import {ILNullPhoto} from './../../assets';
import {colors, getData} from './../../utils';
import {Fire} from './../../config';
import {showMessage} from 'react-native-flash-message';

const UserProfile = ({navigation, onPress}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};

      setProfile(data);
    });
  }, []);

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then(res => {
        console.log('Success sign out');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          avatar={profile.photo}
          isRemove={false}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <List
        name="Language"
        desc="Available 12 languages"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="On Google Play Store"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Read Our Guidelines"
        type="next"
        icon="help"
        onPress={() => signOut()}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
