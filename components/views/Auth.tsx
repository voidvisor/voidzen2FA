import React from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors as nativeColors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { authStyle as style } from '../core/Style';
import { themeColors } from '../core/Themes';
import Section from '../Section';
import { Appbar, Button, Headline } from 'react-native-paper';
import ReactNativeBiometrics from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const rnBiometrics = new ReactNativeBiometrics()

const Auth = () => {
  const [auth, setAuth] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
      backgroundColor: isDarkMode ? nativeColors.darker : nativeColors.lighter,
  };

  const Colors = isDarkMode ? themeColors.dark : themeColors.light;

  const promptBiometrics = async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'});
      setAuth(success);
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    promptBiometrics();
  } , [])

  if (auth) {
  return (
    <>
    <Appbar.Header>
      <Appbar.Action icon="lock" color={Colors.white} onPress={() => setAuth(false)} style={style.lockButton} />
    </Appbar.Header>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? nativeColors.black : nativeColors.white,
        }}>
        <Section title="Step One">
          <Text>Edit </Text>
          <Text style={style.highlight}>App.tsx </Text>
          <Text>
            to change this screen and then come back to see your edits.
          </Text>
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          <Text>Read the docs to discover what to do next:</Text>
        </Section>
        <LearnMoreLinks />
      </View>
    </ScrollView>
    </>
  );
  } else {
    return (
      <View style={style.lockedView}>
        <Icon name='lock' size={200} color={Colors.secondary} />
        <Headline style={{paddingBottom: 6}}>Authenticator Locked</Headline>
        <Button mode='contained' dark={true} onPress={() => promptBiometrics()}>PRESS TO UNLOCK</Button>
      </View>
    )
  }
}

export default Auth;