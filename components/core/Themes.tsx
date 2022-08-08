import { DefaultTheme } from "react-native-paper"

const themeColors = {
    light: {
        primary: '#9966cc',
        secondary: '#b19cd9',
        white: '#ffffff',
        lightGray: '#cccccc',
    },
    dark: {
        primary: '#191919',
        secondary: '#4d4d4d',
        white: '#ffffff',
        lightGray: '#cccccc',
    },
}

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: themeColors.light.primary,
    },
}

export { themeColors, lightTheme }