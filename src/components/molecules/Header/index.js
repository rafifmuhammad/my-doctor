import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Gap from './../../atoms/Gap';
import Button from './../../atoms/Button';
import {colors, fonts} from './../../../utils';
import DarkProfile from './DarkProfile';

const Header = ({onPress, title, profession, type, avatar}) => {
  if (type === 'dark-profile') {
    return (
      <DarkProfile
        title={title}
        profession={profession}
        avatar={avatar}
        onPress={onPress}
      />
    );
  }

  return (
    <View style={styles.container(type)}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: type => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: type === 'dark' ? 16 : 0,
    borderBottomRightRadius: type === 'dark' ? 16 : 0,
  }),
  text: type => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});
