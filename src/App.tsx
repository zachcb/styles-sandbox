import React from 'react';
import styled, { css } from 'styled-components';
import Header from './Header';
import { vars } from './styles';
import { ButtonBase, PaddingMain } from './mixins';

const StyledArticle = styled.article`
  background-color: ${vars.colors.bg};
  color: ${vars.colors.primary};
  display: flex;
  flex-direction: column;
  font-family: ${vars.typography.fontFamilyPrimary};
  height: 100%;
  width: 100%;
`;

const ContentDiv = styled.div`
  ${PaddingMain}
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
`;

const NavButtonMargin = css`
  margin-right: 10px;
  :last-child {
    margin-right: unset;
  }
`;

const PrimaryButton = styled.button`
  ${ButtonBase()}
  ${NavButtonMargin}
`;

const WarningButton = styled.button`
  ${ButtonBase({
    bg: vars.colors.warning,
    hoverBg: vars.colors.warningAccent,
    disabledBg: vars.colors.warningAccent1,
  })}
  ${NavButtonMargin}
`;

const App: React.VFC = () => {
  return (
    <StyledArticle>
      <Header />

      <ContentDiv>
        <h1>Welcome</h1>
        <p>This is a test</p>

        <nav>
          <PrimaryButton>Primary</PrimaryButton>
          <WarningButton>Warning</WarningButton>
          <WarningButton disabled>Warning [Disabled]</WarningButton>
        </nav>
      </ContentDiv>
    </StyledArticle>
  );
};

export default App;
