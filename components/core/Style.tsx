import { StyleSheet } from "react-native";

const sectionStyle = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
});

const authStyle = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
    lockButton: {
      marginLeft: 'auto',
      marginRight: 6,
    },
    lockedView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
    }
});

export { sectionStyle, authStyle };