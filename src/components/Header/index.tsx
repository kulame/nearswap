import { StyledNavLink } from 'components/NavigationTabs';
import Row from 'components/Row';
import {
  Text,
  Web3StatusConnected,
  Web3StatusDisconnected
} from 'components/Web3Status';
import useTheme from 'hooks/useTheme';
import * as nearAPI from 'near-api-js';
import { ConnectedWalletAccount } from 'near-api-js';
import { getWallet, NearWalletContext } from 'near/Account';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
const { utils } = nearAPI;

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) =>
    showBackground ? '0 -100%' : '0 0'};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px
    ${({ theme, showBackground }) =>
      showBackground ? theme.bg2 : 'transparent;'};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`;

const HeaderLinks = styled(Row)`
  justify-self: center;
  background-color: ${({ theme }) => theme.bg0};
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    justify-self: start;  
    `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 0; right:50%;
    transform: translate(50%,-50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.bg2};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `};
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg1)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

export default function Header() {
  const [balance, setBalance] = useState('0');
  const [wallet, setWallet] = useContext(NearWalletContext);
  const [account, setAccount] = useState<ConnectedWalletAccount | null>(null);

  console.log(wallet);

  const getAccountInfo = useCallback(async () => {
    console.log('get account info');
    if (!wallet) {
      const myWallet = await getWallet();
      setWallet(myWallet);
      const account = myWallet.account();
      setAccount(account);
      const balance = await account.getAccountBalance();
      setBalance(utils.format.formatNearAmount(balance.total, 4));
    }
  }, []);

  useEffect(() => {
    getAccountInfo();
  }, []);

  const toggleWalletModel = async () => {
    console.log('Toggle Wallet Model');
    if (!(wallet && wallet.isSignedIn())) {
      const myWallet = await getWallet();
      myWallet.requestSignIn();
    }
    console.log(account);
  };

  const disconnectWallet = async () => {
    wallet?.signOut();
    console.log('wallet disconnected');
  };

  const { white } = useTheme();
  return (
    <HeaderFrame id="header frame" showBackground={scrollY > 45}>
      <HeaderLinks id={'test hearder link'}>
        <StyledNavLink id={'swap-nav-link'} to={'/swap'}>
          Swap
        </StyledNavLink>
      </HeaderLinks>
      <HeaderControls>
        <HeaderElement>
          <AccountElement active={!!account}>
            {account ? (
              <BalanceText>
                {account.accountId} {balance} near
              </BalanceText>
            ) : (
              <Web3StatusConnected
                id="connect-wallet"
                onClick={toggleWalletModel}
              >
                <Text>连接钱包</Text>
              </Web3StatusConnected>
            )}
          </AccountElement>
        </HeaderElement>
        <HeaderElement>
          {account ? (
            <Web3StatusDisconnected
              id="disconnect-wallet"
              onClick={disconnectWallet}
            >
              <Text>关闭连接</Text>
            </Web3StatusDisconnected>
          ) : null}
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  );
}
