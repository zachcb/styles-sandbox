import React from 'react';
import styled from 'styled-components';
import genCssDecls from './genCssDecls';
import { noOp } from '../tools';

/**
 * This context makes the current theme and `setTheme` available to child
 * components. If `theme` is `null`, the default theme is used.
 */
interface ThemeContextInfo {
  theme: string | null;
  setTheme: (theme: string | null) => void;
}

export const ThemeContext = React.createContext<ThemeContextInfo>({
  theme: null,
  setTheme: noOp,
});

/**
 * This parent component declares all CSS variables for each theme.
 */
const DeclDiv = styled.div`
  ${genCssDecls()}
  height: 100%;
  width: 100%;
`;

const Themed: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<string | null>(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <DeclDiv className={theme ?? ''}>{children}</DeclDiv>
    </ThemeContext.Provider>
  );
};

export default Themed;
