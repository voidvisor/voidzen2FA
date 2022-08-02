import React, {type PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { authStyle as style } from '../Style';
import Section from '../Section';

const Auth = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return(
        <SafeAreaView style={backgroundStyle}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
        </SafeAreaView>
    );
}

export default Auth;