import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from './../../components';
import {DummyDoctor1} from './../../assets';
import {colors} from './../../utils';

const ChooseDoctor = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Pilih Dokter Anak"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="wanita"
        type="next"
        onPress={() => navigation.navigate('Chat')}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="wanita"
        type="next"
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="wanita"
        type="next"
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="wanita"
        type="next"
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="wanita"
        type="next"
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
