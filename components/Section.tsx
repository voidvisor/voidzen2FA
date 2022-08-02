import React, {type PropsWithChildren} from 'react';
import { useColorScheme, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { sectionStyle as style } from './core/Style';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={style.sectionContainer}>
      <Text
        style={[
          style.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          style.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default Section;