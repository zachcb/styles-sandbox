import React from 'react';
import styled, { css } from 'styled-components';
import Header from './Header';
import TextViewer from './TextViewer';
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
  overflow: auto;
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

const TextViewerContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
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

        <TextViewerContainerDiv>
          <TextViewer
            title="Generated theme declarations"
            subtitle="See src/styles/genCssDecls.ts"
            text={require('./styles/genCssDecls').default()}
          />
          <TextViewer
            title="Generated `colors` object"
            subtitle="See src/styles/genColors.ts"
            text={JSON.stringify(
              require('./styles/genColors').default(),
              null,
              2
            )}
          />
        </TextViewerContainerDiv>
      </ContentDiv>
    </StyledArticle>
  );
};

export default App;
