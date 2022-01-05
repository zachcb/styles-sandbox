
import { css, useTheme } from 'styled-components';
import theme from 'styled-theming';

export interface ButtonBaseProps {
  bg?: string;
  color?: string;
  hoverBg?: string;
  disabledBg?: string;
}

const theme = useTheme()

const backgroundColor = theme.variants("mode", "kind", {
  default: {
    light: "",
    dark: ""
  },
  primary: {
    light: "",
    dark: ""
  },
  warning: {
    light: "",
    dark: ""
  }
})

const color = theme.variants("mode", "kind", {
  default: {
    light: "",
    dark: ""
  },
  primary: {
    light: "",
    dark: ""
  },
  warning: {
    light: "",
    dark: ""
  }
})

export const ButtonBase = (buttonProps: ButtonBaseProps) => css`
  ${props => `
    background-color: transparent;
    border: none;
    border-radius: ${props.theme.layout.borderRadiusMdPx};
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    font-family: ${props.theme.typography.fontFamilyPrimary};
    padding: 0.2em 0.4em;
    color: ${buttonProps?.color ?? props.theme.colors.bg};
    margin: 0;

    :hover {
      background-color: ${buttonProps?.hoverBg ?? props.theme.colors.primaryAccent1};
    }

    :disabled {
      ${buttonProps?.disabledBg ? `background-color: ${buttonProps?.disabledBg};` : ''}
      cursor: unset;
    }
  `}

  backgroundColor: ${backgroundColor};
  color: ${color};
`;
