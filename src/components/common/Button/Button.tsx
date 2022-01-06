import styled from 'styled-components'
import { ReactElement } from 'react'
import { DefaultButton } from './styles/DefaultButton'
import { PrimaryButton } from './styles/PrimaryButton'
import { WarningButton } from './styles/WarningButton'

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  warning?: boolean;
  disabled?: boolean;
  link?: string;
}

export const Button = ({ children, ...context }: ButtonProps): ReactElement => {
  const { primary, warning, link } = context;
  const type = link ? 'a' : 'button'

  if (primary) {
    return <PrimaryButton as={type} {...context}>{children}</PrimaryButton>;
  }

  if (warning) {
    return <WarningButton as={type} {...context}>{children}</WarningButton>
  }


  return (
    <DefaultButton as={type} {...context}>{children}</DefaultButton>
  )
}

