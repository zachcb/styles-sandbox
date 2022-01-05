import { DefaultTheme } from "styled-components";
import { typography } from "./typography";
import { layout } from "./layout";

/**
 * The app's themes. To introduce an additional theme, add an entry with the
 * same names as `default. Missing names will fall back to the values defined in
 * the `default` theme (see below for an example).
 *
 * NOTE I'm not satisfied with the color names I've chosen here. This is a WIP.
 */
const darkTheme: DefaultTheme = {
  colors: {
    bg: "#282828",
    bgAccent: "#3c3836",
    primary: "#fbf1c7",
    primaryAccent: "#d5c4a1",
    // NOTE `primaryAccent1` is missing from this theme. Wherever it is used,
    // the value from the `default` theme is substituted.
    warning: "#d65d0e",
    warningAccent: "#fe8019",
    warningAccent1: "#e0853a",
  },
};

const lightTheme: DefaultTheme = {
  colors: {
    bg: "#fbf1c7",
    bgAccent: "#ebdbb2",
    primary: "#282828",
    primaryAccent: "#665c54",
    primaryAccent1: "#928374",
    warning: "#cc241d",
    warningAccent: "#fb4934",
    warningAccent1: "#e86c5d",

    // Alernative way
    button: {
      primary: {
        bg: "#fbf1c7",
        text: "#282828",
      },
      warning: {
        bg: "#fbf1c7",
        text: "#282828",
      },
    },
  },
};

const theme = (target = {}) => ({
  ...[{ dark: darkTheme }, { light: lightTheme }].map((theme) => ({
    ...theme,
    ...typography,
    ...layout,
  })),
});

export default theme;
