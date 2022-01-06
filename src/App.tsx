import React, { useContext } from 'react';
import styled, { css, useTheme } from 'styled-components';
import Header from './Header';
import TextViewer from './TextViewer';
import { Button } from "./components/common/Button/Button"
import DefaultLayout from './components/layouts/DefaultLayout';
import { PaddingMain } from './styles/mixins/padding';

const StyledArticle = styled.article`
  background-color: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.typography.fontFamilyPrimary};
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

const TextViewerContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  & > button {
    margin-right: 10px;

    :last-child {
      margin-right: unset;
    }
  }
`;

const App: React.VFC = () => {
  return (
    <StyledArticle>
      <Header />

      <ContentDiv>
        <h1>Welcome</h1>
        <p>This is a test</p>

        <Nav>
          <Button primary>Primary</Button>
          <Button warning>Warning</Button>
          <Button warning disabled>Warning [Disabled]</Button>
        </Nav>

        <TextViewerContainerDiv>
          <TextViewer
            title="Generated theme declarations"
            subtitle="See src/styles/utilities/genCssDecls.ts"
            text={require('./styles/utilities/genCssDecls').default()}
          />
          <TextViewer
            title="Generated `colors` object"
            subtitle="See src/utilities/genColors.ts"
            text={JSON.stringify(
              require('./styles/utilities/genColors').default(),
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
