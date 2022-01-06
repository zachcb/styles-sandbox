import React from 'react';
import styled from 'styled-components';

interface TextViewerProps {
  title: string;
  subtitle?: string;
  text: string;
}

const StyledDiv = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.layout.borderRadiusMdPx};
  color: ${props => props.theme.colors.bg};
  display: inline-block;
  font-family: ${props => props.theme.typography.fontFamilyPrimary};
  padding: 10px;
  margin: 20px 0;
`;

/**
 * NOTE Eventually we'd want to store these values in variables (in
 * ./styles/vars.ts).
 */
const StyledH1 = styled.h1`
  font-size: 1.3em;
  margin: 0;
  margin-bottom: 5px;
`;

const StyledH2 = styled.h2`
  font-size: 1.1em;
  font-style: italic;
  margin: 0;
`;

const StyledPre = styled.pre`
  font-family: ${props => props.theme.typography.fontFamilyPrimary};
  margin: 0;
  margin-top: 15px;
`;

const TextViewer: React.VFC<TextViewerProps> = ({ title, subtitle, text }) => {
  return (
    <StyledDiv>
      <StyledH1>{title}</StyledH1>
      {subtitle && <StyledH2>{subtitle}</StyledH2>}
      <StyledPre>{text}</StyledPre>
    </StyledDiv>
  );
};

export default TextViewer;
