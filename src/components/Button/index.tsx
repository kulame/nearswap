import { UnLoginIcon } from 'components/Icon/Farm';
import { wallet } from 'near/Account';
import { FARM_CONTRACT_ID } from 'near/near';
import { darken } from 'polished';
import { HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';
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

export const ButtonLight = styled(BaseButton)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt
      ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) =>
      !disabled && darken(0.03, theme.primary5)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) =>
      !disabled && darken(0.03, theme.primary5)};
  }
  &:active {
    box-shadow: 0 0 0 1pt
      ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
    background-color: ${({ theme, disabled }) =>
      !disabled && darken(0.05, theme.primary5)};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => theme.primary5};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`;

export const ButtonSecondary = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`;

export function ConnectToNearBtn() {
  return (
    <div
      className="flex items-center justify-center py-2 text-base rounded-full cursor-pointer"
      style={{
        background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
        color: '#fff',
      }}
      onClick={() => wallet.requestSignIn(FARM_CONTRACT_ID)}
    >
      <div className="mr-3.5">
        <UnLoginIcon />
      </div>
      <button>
        <FormattedMessage
          id="connect_to_near"
          defaultMessage="Connect to NEAR"
        />
      </button>
    </div>
  );
}

export function GradientButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
    padding?: string;
    className?: string;
    color?: string;
    btnClassName?: string;
  },
) {
  const { disabled, className, color, btnClassName, onClick } = props;
  return (
    <div
      className={`${className ? className : ''}`}
      style={{
        background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
        borderRadius: '5px',
        color: color || '',
      }}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full h-full ${btnClassName ? btnClassName : ''}`}
      >
        {props.children}
      </button>
    </div>
  );
}
