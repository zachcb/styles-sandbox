import React from 'react';
import styled, { css } from 'styled-components';
import Header from './Header';
import TextViewer from './TextViewer';
import { Button } from "./components/common/Button/Button"
import DefaultLayout from './components/layouts/DefaultLayout';

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
  @apply --padding-main;
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
  ${Button.selector} {
    margin-right: 10px;

    :last-child {
      margin-right: unset;
    }
  }
`;

const App: React.VFC = () => {
  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

export default App;
