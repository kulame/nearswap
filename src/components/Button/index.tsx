import { darken } from 'polished';
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components';
import styled from 'styled-components';
export const BaseButton = styled(RebassButton)<
  {
    padding?: string;
    width?: string;
    $borderRadius?: string;
    altDisabledStyle?: boolean;
  } & ButtonProps
>`
  padding: ${({ padding }) => padding ?? '16px'};
  width: ${({ width }) => width ?? '100%'};
  font-weight: 500;
  text-align: center;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '20px'};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
    pointer-events: none;
  }

  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }
`;
export const ButtonGray = styled(BaseButton)`
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme, disabled }) =>
      !disabled && darken(0.05, theme.bg2)};
  }
  &:active {
    background-color: ${({ theme, disabled }) =>
      !disabled && darken(0.1, theme.bg2)};
  }
`;
