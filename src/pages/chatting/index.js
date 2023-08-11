import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Header, ChatItem, InputChat} from './../../components';
import {colors, fonts, getData, getChatTime, setDateChat} from './../../utils';
import {Fire} from './../../config';
import {showMessage} from 'react-native-flash-message';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();

    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatId}/allChat/`;

    Fire.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        if (snapshot.val()) {
          // Parsing
          const dataSnapshot = snapshot.val();
          const allDataChat = [];

          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });

          setChatData(allDataChat);
          console.log(allDataChat);
        }
      });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatId}/allChat/${setDateChat(today)}/`;
    const urlMessageUser = `messages/${user.uid}/${chatId}/`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatId}/`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };

    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(res => {
        setChatContent('');

        // Save message into messages path for user
        Fire.database().ref(urlMessageUser).set(dataHistoryChatForUser);

        // Save message into messages path for doctor
        Fire.database().ref(urlMessageDoctor).set(dataHistoryChatForDoctor);
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
        title={dataDoctor.data.fullName}
        profession={dataDoctor.data.profession}
        avatar={{uri: dataDoctor.data.photo}}
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;

                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <InputChat
        value={chatContent}
        onChangeText={value => {
          setChatContent(value);
        }}
        onButtonPress={() => chatSend()}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
