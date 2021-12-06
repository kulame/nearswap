import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { StyledNavLink } from 'components/NavigationTabs';
import Row from 'components/Row';
import useTheme from 'hooks/useTheme';
import styled from 'styled-components';
const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
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
    grid-template-columns: 48px 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 36px 1fr;
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
    bottom: 0; right: 50%;
    transform: translate(50%,-50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.bg2};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `};
`;

export default function Header() {
  const { white } = useTheme();
  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <Title href=".">
        <UniIcon>
          <Logo fill={white} width="24px" height="100%" title="logo" />
        </UniIcon>
      </Title>
      <HeaderLinks>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          Swap
        </StyledNavLink>
        <StyledNavLink id={`pool-nav-link`} to={'/pool'}>
          Pool
        </StyledNavLink>
        <StyledNavLink id={`vote-nav-link`} to={'/vote'}>
          Vote
        </StyledNavLink>
      </HeaderLinks>
    </HeaderFrame>
  );
}
