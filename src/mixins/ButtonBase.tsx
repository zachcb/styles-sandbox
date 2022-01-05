import { css } from 'styled-components';
import { vars } from '../styles';

export interface ButtonBaseProps {
  bg?: string;
  color?: string;
  hoverBg?: string;
  disabledBg?: string;
}

export const ButtonBase = (props?: ButtonBaseProps) => css`
  background-color: transparent;
  border: none;
  border-radius: ${vars.layout.borderRadiusMdPx};
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  font-family: ${vars.typography.fontFamilyPrimary};
  padding: 0.2em 0.4em;
  background-color: ${props?.bg ?? vars.colors.primaryAccent};
  color: ${props?.color ?? vars.colors.bg};
  margin: 0;

  :hover {
    background-color: ${props?.hoverBg ?? vars.colors.primaryAccent1};
  }

  :disabled {
    ${props?.disabledBg ? `background-color: ${props?.disabledBg};` : ''}
    cursor: unset;
  }
`;
