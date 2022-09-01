import { StyleSheet } from "react-native";

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
})

export { authStyle }