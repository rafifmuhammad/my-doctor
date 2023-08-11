import {AsyncStorage} from 'react-native';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    console.log('Error saving data');
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);

      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    console.log('Error retrieving data');
  }
};
