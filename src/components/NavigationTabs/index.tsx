import { RowBetween } from 'components/Row';
import { darken } from 'polished';
import { ArrowLeft } from 'react-feather';
import { Link as HistoryLink, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`;

const activeclassname = 'ACTIVE';

export const StyledNavLink = styled(NavLink)`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};

  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`;

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`;
const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`;

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  return (
    <Tabs
      style={{
        marginBottom: '20px',
        display: 'none',
        padding: '1rem 1rem 0 1rem',
      }}
    >
      <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
        Swap
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'}>
        Pool
      </StyledNavLink>
    </Tabs>
  );
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
      </RowBetween>
    </Tabs>
  );
}
