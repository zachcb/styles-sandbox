
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyles } from "../GlobalStyles";
import { themes } from "./themes"
/**
 * This context makes the current theme and `setTheme` available to child
 * components. If `theme` is `null`, the default theme is used.
 */
interface ThemeContextInfo {
  themeType: string | null;
  setThemeType: (theme: string | null) => void;
}

export const ThemeContext = React.createContext<ThemeContextInfo>({
  themeType: null,
  setThemeType: () => { },
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeType, setThemeType] = React.useState<string | null>(null);

  return (
    <StyledThemeProvider theme={themeType === 'dark' ? themes['dark'] : themes['light']}>
      <ThemeContext.Provider value={{ themeType, setThemeType }}>
        <GlobalStyles />
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};

