import { TokenList } from 'components/Balances/TokenList';
import { GradientButton } from 'components/Button';
import { Card } from 'components/Card';
import { useMenuItems } from 'components/Header/menu';
import { Logo } from 'components/Icon/Logo';
import {
  IconAirDropGreenTip,
  IconCreateNew,
  IconMyLiquidity,
  IconPools,
} from 'components/Icon/Nav';
import { Near } from 'components/Icon/Near';
import {
  useTokenBalances,
  useTokens,
  useUserRegisteredTokens,
} from 'hooks/useToken';
import { wallet } from 'near/Account';
import { FARM_CONTRACT_ID } from 'near/near';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FormattedMessage } from 'react-intl';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';

function Anchor({
  to,
  pattern,
  name,
  className,
}: {
  to: string;
  pattern: string;
  name: string;
  className?: string;
}) {
  const location = useLocation();
  const isSelected = matchPath(pattern, pattern);

  return (
    <Link to={to}>
      <h2
        className={`link hover:text-green-500 text-lg font-bold p-4 cursor-pointer ${className} ${
          isSelected ? 'text-green-500' : 'text-gray-400'
        }`}
      >
        <FormattedMessage id={name} defaultMessage={name} />
      </h2>
    </Link>
  );
}

function PoolsMenu() {
  const location = useLocation();
  const isSelected =
    location.pathname.startsWith('/pools') ||
    location.pathname.startsWith('/pool') ||
    location.pathname.startsWith('/more_pools');
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const links = [
    {
      label: <FormattedMessage id="view_pools" defaultMessage="View Pools" />,
      path: '/pools',
      logo: <IconPools />,
    },
    {
      label: (
        <FormattedMessage
          id="Create_New_Pool"
          defaultMessage="Create New Pool"
        />
      ),
      path: '/pools/add',
      logo: <IconCreateNew />,
    },
  ];

  if (wallet.isSignedIn()) {
    links.push({
      label: (
        <FormattedMessage id="Your_Liquidity" defaultMessage="Your Liquidity" />
      ),
      path: '/pools/yours',
      logo: <IconMyLiquidity />,
    });
  }

  return (
    <div
      className="relative z-20"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`flex items-center justify-center ${
          isSelected || hover ? 'text-green-500' : 'text-gray-400'
        }`}
      >
        <h2
          className={`link hover:text-green-500 text-lg font-bold p-4 cursor-pointer`}
        >
          <FormattedMessage id="pools" defaultMessage="Pools" />
        </h2>
        <FiChevronDown />
      </div>
      <div
        className={`${
          hover ? 'block' : 'hidden'
        } absolute top-12 -left-20 rounded-md`}
      >
        <Card
          width="w-64"
          padding="py-4"
          rounded="rounded-md"
          className="border border-primaryText shadow-4xl"
        >
          {links.map((link) => {
            let isSelected = link.path === location.pathname;
            if (
              location.pathname.startsWith('/pool/') ||
              location.pathname.startsWith('/more_pools/')
            ) {
              if (link.path === '/pools') {
                isSelected = true;
              }
            }

            return (
              <div
                key={link.path}
                className={`flex justify-start items-center hover:bg-navHighLightBg text-sm font-semibold  hover:text-white cursor-pointer py-4 pl-7 ${
                  isSelected
                    ? 'text-white bg-navHighLightBg'
                    : 'text-primaryText'
                }`}
                onClick={() => navigate(link.path)}
              >
                <span className="inline-block mr-3">{link.logo}</span>
                {link.label}
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function AccountEntry() {
  const userTokens = useUserRegisteredTokens();
  const balances = useTokenBalances();
  const [hover, setHover] = useState(false);
  const [account, network] = wallet.getAccountId().split('.');
  const niceAccountId = `${account.slice(0, 10)}...${network || ''}`;
  const navigate = useNavigate();

  const accountName =
    account.length > 10 ? niceAccountId : wallet.getAccountId();
  if (wallet.isSignedIn()) {
    if (!userTokens || !balances) return null;
  }

  return (
    <div className="z-30 justify-end h-full mx-5 ml-2 text-xs text-center user">
      <div
        className={`cursor-pointer font-bold items-center justify-end text-center overflow-visible relative h-16 pt-5`}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div
          className={`inline-flex p-1 mr-2 items-center justify-center rounded-full ${
            wallet.isSignedIn()
              ? 'bg-gray-700 text-white'
              : 'border border-gradientFrom text-gradientFrom'
          } pl-3 pr-3`}
        >
          <div className="pr-1">
            <Near color={wallet.isSignedIn() ? 'white' : '#00c6a2'} />
          </div>
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap account-name">
            {wallet.isSignedIn() ? (
              accountName
            ) : (
              <button
                onClick={() => wallet.requestSignIn(FARM_CONTRACT_ID)}
                type="button"
              >
                <span className="ml-2 text-xs">
                  <FormattedMessage
                    id="connect_to_near"
                    defaultMessage="Connect to NEAR"
                  />
                </span>
              </button>
            )}
          </div>
        </div>
        <div
          className={`absolute top-14 pt-2 right-0 w-80 ${
            wallet.isSignedIn() && hover ? 'block' : 'hidden'
          }`}
        >
          <Card
            className="border cursor-default menu-max-height shadow-4xl border-primaryText"
            width="w-80"
          >
            <div className="flex items-center justify-between mb-5 text-primaryText">
              <div className="text-white">
                <FormattedMessage id="balance" defaultMessage="Balance" />
              </div>
            </div>
            {wallet.isSignedIn() ? (
              <TokenList
                tokens={userTokens!}
                balances={balances}
                hideEmpty={true}
              />
            ) : null}
            <div className="flex items-center justify-center pt-5">
              <GradientButton
                className="h-8 py-2 mr-2 text-xs text-white cursor-pointer w-36"
                onClick={() => navigate('/account')}
              >
                <FormattedMessage
                  id="view_account"
                  defaultMessage="View account"
                />
              </GradientButton>
              <div
                className="w-20 h-8 py-2 text-xs font-semibold border rounded cursor-pointer border-gradientFrom text-gradientFrom"
                onClick={() => {
                  wallet.signOut();
                  window.location.assign('/');
                }}
              >
                <FormattedMessage id="sign_out" defaultMessage="Sign out" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MoreMenu() {
  const [hover, setHover] = useState(false);
  const [parentLabel, setParentLabel] = useState('');
  const { menuData } = useMenuItems();
  const [curMenuItems, setCurMenuItems] = useState(menuData);
  const currentLocal = localStorage.getItem('local');
  const location = useLocation();
  const navigate = useNavigate();
  const onClickMenuItem = (items: any[], label: string) => {
    setCurMenuItems(items);
    setParentLabel(label);
  };
  const handleMoreMenuClick = (
    url: string,
    isExternal: boolean,
    label: string,
    children?: any,
  ) => {
    if (url) {
      if (isExternal) {
        window.open(url);
      } else {
        navigate(url);
      }
    } else if (children) {
      onClickMenuItem?.(children, label);
    }
  };
  const hasSubMenu = curMenuItems.some(({ children }) => !!children?.length);
  return (
    <div
      className="relative z-30 h-8"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        onClickMenuItem?.(menuData, '');
      }}
    >
      <div className="flex border border-gray-400 rounded-full hover:border-green-500">
        <h2
          className={`link hover:text-green-500 block font-bold cursor-pointer text-gray-400 h-7 w-7`}
        >
          ...
        </h2>
      </div>
      <div
        className={`${
          hover ? 'block' : 'hidden'
        } absolute top-6 -right-4 pt-4 rounded-md`}
      >
        <Card
          width="w-64"
          padding="py-4"
          rounded="rounded-md"
          className="border shadow-4xl border-primaryText"
        >
          {!hasSubMenu && parentLabel && (
            <div
              className="flex items-center justify-start py-4 pl-4 text-sm font-semibold text-left cursor-pointer whitespace-nowrap hover:text-white text-primaryText"
              onClick={() => onClickMenuItem?.(menuData, '')}
            >
              <IoChevronBack className="text-xl " />
              <span className="ml-8 ">{parentLabel}</span>
            </div>
          )}
          {curMenuItems.map(
            ({
              id,
              url,
              children,
              label,
              icon,
              logo,
              isExternal,
              language,
            }) => {
              const isSelected =
                url &&
                !isExternal &&
                matchPath(location.pathname, location.pathname);

              return (
                <div
                  key={id}
                  className={`whitespace-nowrap text-left items-center flex justify-start hover:bg-navHighLightBg text-sm font-semibold hover:text-white
                 ${
                   (language && currentLocal === language) || isSelected
                     ? 'bg-navHighLightBg text-white'
                     : 'text-primaryText'
                 }
                 cursor-pointer py-4 pl-7`}
                  onClick={() =>
                    handleMoreMenuClick(url, isExternal, label, children)
                  }
                >
                  {logo && (
                    <span
                      className={`${
                        parentLabel ? 'ml-10' : ''
                      } text-xl w-9 text-left`}
                    >
                      {logo}
                    </span>
                  )}
                  {label}
                  {id === 1 && (
                    <span className="ml-1 -mt-2 ">
                      <IconAirDropGreenTip />{' '}
                    </span>
                  )}
                  <span className="ml-4 text-xl">{icon}</span>
                  {children && (
                    <span className="absolute text-xl right-4">
                      <FiChevronRight />
                    </span>
                  )}
                </div>
              );
            },
          )}
        </Card>
      </div>
    </div>
  );
}

export const NavigationBar = () => {
  const allTokens = useTokens();
  const [showWrapNear, setShowWrapNear] = useState(false);
  return (
    <>
      <div className="relative text-center nav-wrap md:hidden xs:hidden">
        <nav className="flex items-center justify-between col-span-8 pt-6 px-9">
          <div className="relative -top-0.5 flex-1">
            <Logo />
          </div>
          <div className="flex items-center">
            <Anchor to="/deposit" pattern="/deposit/:id?" name="Deposit" />
            <Anchor to="/" pattern="/" name="Swap" />
          </div>
          <div className="flex items-center justify-end flex-1">
            <AccountEntry />
          </div>
        </nav>
      </div>
    </>
  );
};
