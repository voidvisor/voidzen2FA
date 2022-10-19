/**
 * @format
 */

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
    },
    flatListContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      margin: 16,
    },
    header: {
      zIndex: 1,
    },
})

const accountStyle = StyleSheet.create({
  pressable: {
    borderColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 20,
  },
  timerView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 'auto',
    marginEnd: 20,
  },
  timerSvg: {
    height: 40,
    width: 40,
    transform: [{rotate: '-90deg'}],
  },
  timerText: {
    position: 'absolute',
  },
  hotpRefresh: {
    marginStart: 'auto',
    marginEnd: 20,
  },
})

export { authStyle, accountStyle }