import { ButtonBase } from './ButtonBase'
import styled from 'styled-components'

export const WarningButton = styled.button`
  ${props => ButtonBase({
  bg: props.theme.colors.warning,
  hoverBg: props.theme.colors.warningAccent,
  disabledBg: props.theme.colors.warningAccent1,
})}
`;
