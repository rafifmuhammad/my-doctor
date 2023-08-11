import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, List} from './../../components';
import {colors} from './../../utils';
import {Fire} from './../../config';
import {showMessage} from 'react-native-flash-message';

const ChooseDoctor = ({navigation, route}) => {
  const itemCategory = route.params;
  const [listDoctors, setListDoctors] = useState([]);

  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const callDoctorByCategory = category => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then(res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];

          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });

          setListDoctors(data);
        }
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
      <Header
        title={`Pilih ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {listDoctors.map(doctor => {
        return (
          <List
            key={doctor.id}
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            type="next"
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  copagentent: {
    flex: 1,
    color: colors.white,
  },
});
