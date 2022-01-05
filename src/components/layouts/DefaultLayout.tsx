import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../styles/GlobalStyles";
import theme from "../../styles/themes/themes";

const DefaultLayout: React.FC = ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default DefaultLayout;
