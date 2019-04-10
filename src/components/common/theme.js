const colors = {
  pivotalDark: "#27363f",
  pivotalHighlight: "#45968f",
  gray: "#8d8e8e",
  grayLight: "#f8f8f8",
  red: "red",
  white: "white",
  blue: "#2185c5",
}

const fonts = {
  text: "Karla",
  logo: "Source Sans Pro",
  title: "Source Sans Pro",
}

const fontSizes = [12, 14, 16, 20, 24, 32]

const lineHeights = [20, 24, 28, 32]

export default {
  fonts,
  colors,
  fontSizes: {
    body: fontSizes[2],
  },
  lineHeights: {
    body: lineHeights[1],
  },
  link: {
    color: "#2185c5",
    hover: {
      color: "#2185c5",
    },
  },
  header: {
    backgroundColor: colors.grayLight,
  },
  navigation: {
    color: colors.pivotalDark,
    hover: {
      color: colors.pivotalHighlight,
    },
  },
  footer: {
    color: colors.gray,
    backgroundColor: colors.grayLight,
    link: {
      color: colors.gray,
      hover: {
        color: colors.pivotalHighlight,
      },
    },
  },
}
