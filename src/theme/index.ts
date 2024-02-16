import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    orange: {
      500: '#FF872C',
      700: '#FF9000',
    },
    blue: {
      800: '#363F5F',
      700: '#232129',
      600: '#312E38',
      500: '#5636D3',
      400: '#2E656A',
      300: '#3172B7',
      200: '#E6FFFA',
      100: '#EBF8FF'
    },
    white: {
      200: '#F4EdE8',
      100: '#FFFFFF'
    },
    red: {
      700: '#E83F5B',
      500: '#C53030'
    },
    green: '#12A454',
    gray: {
      500: '#666360',
      300: '#969CB3'
    },
    pink: {
      700: '#E83F5B',
      200: '#FDDEDE'
    }
  },
  fonts: {
    heading: 'Roboto_900Black',
    body: 'Roboto_400Regular'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 32
  }
})