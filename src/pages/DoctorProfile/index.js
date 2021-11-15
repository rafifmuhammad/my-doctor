import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from './../../utils';
import {Header, Profile, ProfileItem, Button, Gap} from './../../components';
import {DummyDoctor1} from './../../assets';

const DoctorProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Profile
        name="Nairobi Putri Hayza"
        desc="Dokter Anak"
        avatar={DummyDoctor1}
      />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value="Universitas Indonesia, 2020" />
      <ProfileItem label="Tempat Praktik" value="Universitas Indonesia, 2020" />
      <ProfileItem label="No. STR" value="Universitas Indonesia, 2020" />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chat')}
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
