
import { css } from 'styled-components';

export interface ButtonBaseProps {
  bg?: string;
  color?: string;
  hoverBg?: string;
  disabledBg?: string;
}

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
    background-color: ${buttonProps?.bg ?? props.theme.colors.primaryAccent};
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
`;
