import { createGlobalStyle } from "styled-components";
// import { PaddingMain } from "./utilities/PaddingMain";
import genCssDecls from "./utilities/genCssDecls";

export const GlobalStyles = createGlobalStyle`
	body {
		height: 100%;
		width: auto;
		font-size: 16px;
	}

	#root {
		${genCssDecls()}
	}

  :root {
    --padding-main: {
      ${(props) => props.theme.layout.paddingMainPx}
    }
  }
`;
