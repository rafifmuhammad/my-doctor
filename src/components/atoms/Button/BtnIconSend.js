import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IconSendLight, IconSendDark} from './../../../assets';
import {colors} from './../../../utils';

const BtnIconSend = ({disable, onPress}) => {
  if (disable) {
    <View style={styles.container(disable)}>
      <IconSendDark />
    </View>;
  }

  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      <IconSendLight />
    </TouchableOpacity>
  );
};

export default BtnIconSend;

const styles = StyleSheet.create({
  container: disable => ({
    backgroundColor: disable ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
