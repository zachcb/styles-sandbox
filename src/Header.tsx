import React from 'react';
import styled from 'styled-components';
import { ThemeContext, vars } from './styles';
import { ButtonBase, PaddingMain } from './mixins';

const StyledDiv = styled.div`
  ${PaddingMain}
  align-items: center;
  background-color: ${vars.colors.bgAccent};
  box-sizing: border-box;
  display: flex;
  height: ${vars.layout.headerHeightPx};
  justify-content: space-between;
  width: 100%;
`;

const StyledH1 = styled.h1`
  font-size: 1.5em;
  margin: unset;
`;

const ToggleThemeButton = styled.button`
  ${ButtonBase()}
`;

const Header: React.VFC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  function toggleTheme() {
    if (theme === null) {
      setTheme('dark');
    } else {
      setTheme(null);
    }
  }

  return (
    <StyledDiv>
      <StyledH1>Demo App</StyledH1>

      <ToggleThemeButton onClick={toggleTheme}>Toggle Theme</ToggleThemeButton>
    </StyledDiv>
  );
};

export default Header;
