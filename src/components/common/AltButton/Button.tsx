import styled from 'styled-components'
import { ReactElement } from 'react'
import { ButtonBase } from './styles/ButtonBase'

type ButtonProps = {
  children: React.ReactNode;
  kind?: 'primary' | 'warning'
  disabled?: boolean;
  link?: string;
}

const DefaultButton = styled.button(ButtonBase)

export const Button = ({ children, ...context }: ButtonProps): ReactElement => {
  const { link } = context;
  const type = link ? 'a' : 'button'

  return (
    <DefaultButton as={type} {...context}></DefaultButton>
  )
}

