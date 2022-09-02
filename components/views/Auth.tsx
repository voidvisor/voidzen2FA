/**
 * @format
 */

import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import { authStyle as style } from '../core/Style';
import { Appbar, Button, Headline, Subheading, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBiometrics from 'react-native-biometrics';
import EncryptedStorage from 'react-native-encrypted-storage';
import Account from '../Account';

const rnBiometrics = new ReactNativeBiometrics();

const Auth = () => {
  const [auth, setAuth] = React.useState(false);
  const [accList, setAccList] = React.useState([{uuid: 'test'}]);

  const { colors } = useTheme();

  const promptBiometrics = async () => {
    if (auth === false) {
      try {
        const { success } = await rnBiometrics.simplePrompt({promptMessage: 'Unlock Authenticator'});
        setAuth(success);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const retrieveList = async () => {
    if (auth === true) {
      try {
        const list = await EncryptedStorage.getItem('list');
        if (list) {
          setAccList(JSON.parse(list!));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  React.useEffect(() => {
    promptBiometrics();
    retrieveList();
  }, [auth])

  const renderAuth = ({ item }) => (
    <Account uuid={item.uuid} />
    /* awaiting custom implementation */
  )

  if (auth) {
  return (
    <>
    <Appbar.Header>
      <Appbar.Action icon="lock" color={colors.surface} onPress={() => setAuth(false)} style={style.lockButton} />
    </Appbar.Header>
    <FlatList contentContainerStyle={{flexDirection: 'column', flex: 1}} renderItem={renderAuth} data={accList} ListEmptyComponent={
      <View style={style.lockedView}>
        <Icon name='help' size={200} color={colors.accent} />
        <Headline>It's empty here.</Headline>
        <Subheading>Add some accounts using the plus button!</Subheading>
      </View>
    } />
    </>
  )
  } else {
    return (
    <View style={style.lockedView}>
        <Icon name='lock' size={200} color={colors.accent} />
        <Headline style={{paddingBottom: 6}}>Authenticator Locked</Headline>
        <Button mode='contained' dark={true} onPress={() => promptBiometrics()}>PRESS TO UNLOCK</Button>
      </View>
    )
  }
}

export default Auth;