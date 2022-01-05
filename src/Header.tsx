import React from 'react';
import styled from 'styled-components';
import { ThemeContext } from './styles';
import { ButtonBase } from './components/common/Button/styles/ButtonBase';

const StyledDiv = styled.div`
  @apply --padding-main;
  align-items: center;
  background-color: ${props => props.theme.colors.bgAccent};
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: ${props => props.theme.layout.headerHeightPx};
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
