import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "../../styles/themes/ThemeProvider";

const DefaultLayout: React.FC = ({ children }) => {
  // Allows for alernate Theme anywhere in the app
  const specialTheme = {}

  return (
    <ThemeProvider>
      <StyledThemeProvider theme={specialTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default DefaultLayout;
