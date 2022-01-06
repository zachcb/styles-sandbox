import { createGlobalStyle } from "styled-components";
import { Theme } from "./themes/themes";

// import { PaddingMain } from "./utilities/PaddingMain";
import genCssDecls from "./utilities/genCssDecls";

export const GlobalStyles = createGlobalStyle`
	body {
		height: 100%;
		width: auto;
		font-size: 16px;
    font-family: ${({ theme }: { theme: Theme }) => theme.typography.fontFamily}
	}

	#root {
		${genCssDecls()}
	}
`;
// ${(props) => props.theme.layout.default.padding}
