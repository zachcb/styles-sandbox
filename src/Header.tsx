import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from "./styles/themes/ThemeProvider"
import { ButtonBase } from './components/common/Button/styles/ButtonBase';
import { PaddingMain } from './styles/mixins/padding';
import { Shadow } from './styles/mixins/shadow';

const StyledHeader = styled.header`
  ${PaddingMain}
  ${Shadow("md")}
  align-items: center;
  background-color: ${props => props.theme.colors.bgAccent};
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: ${props => props.theme.layout.header.height};
  justify-content: space-between;
  width: 100%;
`;

const StyledH1 = styled.h1`
  font-size: 1.5em;
  margin: unset;
`;

const ToggleThemeButton = styled.button`
  ${ButtonBase({})}
`;

const Header: React.VFC = () => {
  const { themeType, setThemeType } = useContext(ThemeContext);

  function toggleTheme() {
    if (themeType === null) {
      setThemeType('dark');
    } else {
      setThemeType(null);
    }
  }

  return (
    <StyledHeader>
      <StyledH1>Demo App</StyledH1>

      <ToggleThemeButton onClick={toggleTheme}>Toggle Theme</ToggleThemeButton>
    </StyledHeader>
  );
};

export default Header;
