import React from 'react';
import styled from 'styled-components';

const DemoStyledButton = styled.button`
  color: red;
`;

const App: React.VFC = () => {
  return (
    <main>
      <DemoStyledButton>Click me</DemoStyledButton>
    </main>
  );
};

export default App;
